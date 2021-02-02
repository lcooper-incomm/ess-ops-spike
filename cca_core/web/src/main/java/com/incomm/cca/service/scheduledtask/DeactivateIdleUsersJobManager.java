package com.incomm.cca.service.scheduledtask;

import com.incomm.cca.model.constant.JobType;
import com.incomm.cca.model.constant.PropertySystemName;
import com.incomm.cca.model.domain.MinionTaskDetailsEmailBuilder;
import com.incomm.cca.model.domain.Property;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.repository.UserRepository;
import com.incomm.cca.service.MinionService;
import com.incomm.cca.service.PropertyService;
import com.incomm.cca.togglz.TogglzFeature;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.minion.model.scheduler.tasks.TaskDetailsEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A cron job to deactivate idle users after a set number of days.  Also warn users with an email who are about
 * to be deactivated.
 */
@Service
public class DeactivateIdleUsersJobManager extends ClusterAwareJobManager {

    private final Long IDLE_DAYS_DEACTIVATION = 30l;
    // Warning emails sent at IDLE_DAYS_DEACTIVATION minus these values.
    private final List<Long> DAYS_PRIOR_WARNING = Arrays.asList(3l, 7l);
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private MinionService minionService;
    private Property noReplySender;
    private final String warningEmailBody =
            "<name>,<br />" +
                    "<br />" +
                    "Our records indicate that you have not signed in to the Customer Care Application (CCA) in some time, and your account is set to be suspended in <days> days.<br />" +
                    "<br />" +
                    "If you need continued access to the Customer Care Application (CCA), all you need to do is sign in to <a href=\"https://cca.incomm.com\">https://cca.incomm.com</a> to extend your access.<br />" +
                    "<br />" +
                    "Thank you,<br />" +
                    "CCA Support";
    private final String deactivatedEmailBody = "The following users were deactivated due to having no activity in CCA in over <days> days:" +
            "<br /><br />" +
            "<table border=\"1\" cellspacing=\"0\"  cellpadding=\"5\"style=\"width: 600px;\">" +
            "<tr style=\"background-color: #eeeeee;\"><td>Name</td><td>Username</td><td>Last Login Date</td><td>Deactivated</td></tr>" +
            "<deactivatedUsers>" +
            "</table>" +
            "<br /><br />" +
            "Thank you,<br />" +
            "CCA Support";

    /**
     * Run this task every day at 1am.
     */
    @Override
    @Scheduled(cron = "0 0 1 * * ?")
    public void checkJobLockStatus() {
        waitExtraTimeIfNecessary();
        if (TogglzFeature.DEACTIVATEIDLEUSERSJOB.isActive() && jobLockManager.isJobLockedByHost(JobType.DEACTIVATE_IDLE_USERS_JOB)) {
            this.noReplySender = propertyService.findOneBySystemName(PropertySystemName.INCOMM_NO_REPLY_SENDER);
            this.notifySoonToBeDeactivatedUsers();
            this.deactivateIdleUsers();
        }
    }

    /**
     * Find all users that are about to be deactivated and send them a warning email.
     */
    protected void notifySoonToBeDeactivatedUsers() {
        MinionTaskDetailsEmailBuilder taskDetailsEmailBuilder = new MinionTaskDetailsEmailBuilder();

        // Iterate over multiple "days until deactivation"
        for (Long numberOfWarningDays : DAYS_PRIOR_WARNING) {
            List<User> nearIdleUsers = this.userRepository.findAllSoonToBeIdleUsers(IDLE_DAYS_DEACTIVATION, numberOfWarningDays);
            CsCoreLogger.info("# Users to notify = " + nearIdleUsers.size() + "; # remaining days until inactive = " + numberOfWarningDays)
                        .build();

            Set<String> userNames = new HashSet<>();

            for (User user : nearIdleUsers) {
                if (user.getEmail() != null && user.getEmail()
                                                   .matches(".+@.+[.].+")) {
                    String body = warningEmailBody
                            .replaceAll("<name>", user.getDisplayName())
                            .replaceAll("<days>", numberOfWarningDays.toString());

                    TaskDetailsEmail emailTask = taskDetailsEmailBuilder.setRecipient(user.getEmail())
                                                                        .setSender(noReplySender.getValue())
                                                                        .setSubject("Customer Care Application (CCA) Inactivity Warning")
                                                                        .setBody(body)
                                                                        .build();
                    minionService.sendEmail(emailTask);
                    userNames.add(user.getUsername());
                } else {
                    CsCoreLogger.warn("User: " + user.getUsername() + " does not have a valid email address.");
                }
            }

            CsCoreLogger.info("Emails sent to the following").keyValue("userNames", userNames).build();
        }
    }

    /**
     * Deactivate all users after allowed idle period.  Notify admin account by email of those users deactivated.
     */
    @Transactional
    protected void deactivateIdleUsers() {
        List<User> idleUsers = this.userRepository.findAllIdleUsers(IDLE_DAYS_DEACTIVATION);

        if (idleUsers.isEmpty()) {
            CsCoreLogger.info("No idle users found.")
                        .build();
            return;
        }

        Set<String> userNames = new HashSet<>();
        String deactivatedUsers = "";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");

        // Create a new row for each deactivating user.
        for (User user : idleUsers) {
            Boolean failed = false;

            try {
                user.setActive(false);
                userRepository.saveAndFlush(user);
            } catch (Exception e) {
                // Don't rollback already deactivated users, but notify in report that a deactivation failed.
                failed = true;
                CsCoreLogger.error("Deactivate user " + user.getUsername() + " failed.")
                            .exception(e)
                            .build();
            }

            deactivatedUsers += "<tr>";
            deactivatedUsers += "<td>" + user.getFirstName() + " " + user.getLastName() + "</td>";
            deactivatedUsers += "<td>" + user.getUsername() + "</td>";
            deactivatedUsers += "<td>" + simpleDateFormat.format(user.getLastLoginDate()) + "</td>";
            deactivatedUsers += "<td>" + (failed ? "FAILED" : "SUCCESS") + "</td>";
            deactivatedUsers += "</tr>";
            userNames.add(user.getUsername());
        }

        Property recipient = propertyService.findOneBySystemName(PropertySystemName.INCOMM_USER_DEACTIVATION_RECIPIENT);

        String body = deactivatedEmailBody
                .replaceAll("<days>", IDLE_DAYS_DEACTIVATION.toString())
                .replaceAll("<deactivatedUsers>", deactivatedUsers);

        MinionTaskDetailsEmailBuilder taskDetailsEmailBuilder = new MinionTaskDetailsEmailBuilder();
        TaskDetailsEmail emailTask = taskDetailsEmailBuilder.setRecipient(recipient.getValue())
                                                            .setSender(noReplySender.getValue())
                                                            .setSubject("CCA Users Deactivated")
                                                            .setBody(body)
                                                            .build();
        minionService.sendEmail(emailTask);
        CsCoreLogger.info("Deactivation email sent:").keyValue("emailAddress", recipient.getValue()).build();
        CsCoreLogger.info("Deactivated users:").keyValue("userNames", userNames).build();
    }

}
