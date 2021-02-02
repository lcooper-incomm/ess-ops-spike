package com.incomm.cca.service.order;

import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.constant.CcaQueryParam;
import com.incomm.cca.model.converter.OrderRelatedJobConverter;
import com.incomm.cca.model.domain.order.OrderRelatedJob;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.order.OrderRelatedJobView;
import com.incomm.cca.repository.order.OrderRelatedJobRepository;
import com.incomm.cca.service.CcaAbstractCrudService;
import com.incomm.cca.service.MinionService;
import com.incomm.minion.model.scheduler.enums.JobStatusType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderRelatedJobService extends CcaAbstractCrudService<OrderRelatedJob, Long> {

    @Autowired
    private OrderRelatedJobConverter jobConverter;
    @Autowired
    private OrderRelatedJobRepository jobRepository;
    @Autowired
    private MinionService minionService;
    @Autowired
    private HttpServletRequest httpServletRequest;

    @Override
    public void deleteOne(final Long id) {
        throw new UnsupportedOperationException();
    }

    public List<OrderRelatedJobView> findAllByOrderId(Long orderId) {
        String partner = httpServletRequest.getParameter(CcaQueryParam.PARTNER);
        String platform = httpServletRequest.getParameter(CcaQueryParam.PLATFORM);
        List<OrderRelatedJob> orderRelatedJobs = jobRepository.findAllByOrderIdAndPartnerAndPlatform(orderId, partner, platform);
        List<OrderRelatedJobView> taskViews = orderRelatedJobs.stream()
                                                              .map(t -> jobConverter.convert(t))
                                                              .collect(Collectors.toList());
        if (!ObjectUtils.isEmpty(taskViews)) {
            Map<Long, JobStatusType> jobIdStatusMap = new HashMap<>();
            taskViews.forEach(taskView -> jobIdStatusMap.putIfAbsent(taskView.getJobId(), null));
            addJobStatusToCancellationTaskView(jobIdStatusMap, taskViews);
        }

        return taskViews;
    }

    @Override
    public OrderRelatedJob findOne(final Long id) {
        throw new UnsupportedOperationException();
    }

    @Override
    public OrderRelatedJob updateOne(final OrderRelatedJob request) {
        throw new UnsupportedOperationException();
    }

    @Override
    protected void validateAddPermission() throws SecurityViolationException {
        securityService.validateHasAnyPermission(ManagedPermission.CANCEL_ORDER, ManagedPermission.CANCEL_ORDER_WITH_REFUND, ManagedPermission.BULK_CHANGE_CARD_STATUS);
    }

    @Override
    protected void validateDeletePermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void validateFindPermission() throws SecurityViolationException {
        securityService.validateHasAnyPermission(ManagedPermission.SEARCH_BY_ECOMM_ORDER, ManagedPermission.SEARCH_BY_VANILLA_BOL, ManagedPermission.SEARCH_BY_WALMART_BOL);
    }

    @Override
    protected void validateUpdatePermission() throws SecurityViolationException {
        securityService.validateIsSystemAdministrator();
    }

    @Override
    protected void controlledUpdateOne(final OrderRelatedJob orderRelatedJob, final OrderRelatedJob t1) {

    }

    @Override
    protected void validateUnique(final OrderRelatedJob orderRelatedJob) throws IllegalArgumentException {

    }

    @Override
    protected String getModelName() {
        return OrderRelatedJob.class.getSimpleName();
    }

    private void addJobStatusToCancellationTaskView(Map<Long, JobStatusType> jobStatusTypeMap, List<OrderRelatedJobView> taskViews) {
        if (!ObjectUtils.isEmpty(jobStatusTypeMap) && !ObjectUtils.isEmpty(taskViews)) {
            jobStatusTypeMap.keySet()
                            .forEach(statusKey -> jobStatusTypeMap.put(statusKey, minionService.findCurrentJobStatusByJobId(statusKey)));
            taskViews.forEach(taskView -> {
                taskView.setCurrentJobStatus(jobStatusTypeMap.get(taskView.getJobId()));
                taskView.setIsJobComplete(COMPLETED_MINION_JOB_STATUS_TYPES.contains(taskView.getCurrentJobStatus()));
            });
        }
    }

    protected List<JobStatusType> COMPLETED_MINION_JOB_STATUS_TYPES = new ArrayList<>(
            (Arrays.asList(JobStatusType.CANCELLED, JobStatusType.COMPLETED, JobStatusType.FAILED))
    );
}
