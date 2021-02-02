package com.incomm.cca.qa.functional.session;

import com.incomm.cca.qa.functional.BaseFT;
import org.testng.annotations.Test;

/**
 * User: mgalloway
 * Date: 3/20/13
 * Time: 12:43 PM
 */
public class CallDetailsFT extends BaseFT {

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void cancelSessionWithCallDetails() {

        //        nav.signin(constants.APP_CC_JAX_AGENT_USERNAME, constants.APP_CC_JAX_AGENT_PASSWORD, true);
        //        assertThat("Session Drawer Tab", session.getSessionTabInactiveText(), containsString("Start New Session"));
        //        session.openSessionDrawer();
        //        callDetails.addCallDetails();
        //        callDetails.setCallerName("Test Caller");
        //        callDetails.setDnis("800-123-4567");
        //        assertThat("Cancel is not available", session.isSessionCancelAvailable(), is(false));

    }

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void callDetailsSessionTabInfo() {

        //        nav.signin(constants.APP_CC_JAX_AGENT_USERNAME, constants.APP_CC_JAX_AGENT_PASSWORD, true);
        //        assertThat("Session Drawer Tab", session.getSessionTabInactiveText(), containsString("Start New Session"));
        //        nav.navigateToSearch();
        //        search.submit("PIN", "117821408569869");
        //        search.autoSelectWait();
        //        callDetails.addCallDetails();
        //        callDetails.setCallerName("Test Caller");
        //        callDetails.setCallback("800-878-4544");
        //        callDetails.setDnis("800-123-4567");
        //        callDetails.selectQueue("PayPal English");
        //
        //        assertThat("Session Tab Queue", session.getSessionTabQueue(), is(equalTo("PayPal English")));
        //        assertThat("Session Tab Caller Name", session.getSessionTabCallerName(), is(equalTo("Test Caller")));
        //        assertThat("Session Tab CallBack Number", session.getSessionTabCallbackNumber(), is(equalTo("800-878-4544")));
        //        assertThat("Session Tab Product Count", session.getSessionTabProductCountShort(), is(equalTo("1")));

    }

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void callDetailsSaveOnTab() {

        //        nav.signin(constants.APP_CC_JAX_AGENT_USERNAME, constants.APP_CC_JAX_AGENT_PASSWORD, true);
        //        assertThat("Session Drawer Tab", session.getSessionTabInactiveText(), containsString("Start New Session"));
        //        session.openSessionDrawer();
        //        String sessionId = session.getSessionId();
        //        session.setSessionNotes("test notes");
        //        Map<String, Object> dbSession1 = databaseUtil.getSession(sessionId);
        //        Map<String, Object> dbNote = databaseUtil.getNote(dbSession1.get("note_id").toString());
        //        assertThat("Session Notes Saved on TAB", dbNote.size(),is(notNullValue()));
        //        callDetails.addCallDetails();
        //        callDetails.setCallerName("Test Caller");
        //        Map<String, Object> dbSession2 = databaseUtil.getSession(sessionId);
        //        Map<String, Object> dbCallDetails1 = databaseUtil.getCallDetailsById(dbSession2.get("call_detail_id").toString());
        //        assertThat("Caller Name Saved on TAB", dbCallDetails1.get("encrypted_caller_name"), is(notNullValue()));
        //
        //        callDetails.setDnis("702-239-4867");
        //        Map<String, Object> dbSession4 = databaseUtil.getSession(sessionId);
        //        Map<String, Object> dbCallDetails4 = databaseUtil.getCallDetailsById(dbSession4.get("call_detail_id").toString());
        //        assertThat("DNIS Saved on TAB", dbCallDetails4.get("dnis").toString(), is(equalTo("702-239-4867")));
        //
        //        callDetails.selectQueue("General");
        //        Map<String, Object> dbSession5 = databaseUtil.getSession(sessionId);
        //        Map<String, Object> dbCallDetails5 = databaseUtil.getCallDetailsById(dbSession5.get("call_detail_id").toString());
        //        Map<String, Object> dbQueue = databaseUtil.getQueueById(dbSession5.get("queue_id").toString());
        //        assertThat("Queue Saved on TAB", dbQueue.get("i3_name").toString(), is(equalTo("General")));

    }

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void wrapupCodesJax() {

    }

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void wrapupCodesNor() {

        //        nav.signin(constants.APP_CC_NOR_AGENT_USERNAME, constants.APP_CC_NOR_AGENT_PASSWORD, true);
        //        assertThat("Session Drawer Tab", session.getSessionTabInactiveText(), containsString("Start New Session"));
        //        session.openSessionDrawer();
        //
        //        // Get all queues
        //        List<WebElement> queuesOptions = callDetails.getQueueOptions();
        //        // Loop through each queue and select in drop down
        //            // Get all categories
        //            // Assert all expected categories from DB are in drop down
        //                // Loop through each category selecting it in UI
        //                // Assert all expected codes for that category in DB are in drop down
        //
        //        Assert.fail();

    }

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void queueSelectionNor() {

        //        nav.signin(constants.APP_CC_NOR_AGENT_USERNAME, constants.APP_CC_NOR_AGENT_PASSWORD, true);
        //        assertThat("Session Drawer Tab", session.getSessionTabInactiveText(), containsString("Start New Session"));
        //        session.openSessionDrawer();
        //
        //        List<String> expectedQueues = databaseUtil.getDatabaseNorQueues();
        //        List<WebElement> queuesOptions = callDetails.getQueueOptions();
        //        List<String> actualQueues = new ArrayList<>();
        //
        //        for(WebElement queue: queuesOptions) {
        //            actualQueues.add(queue.getText());
        //        }
        //
        //        assertThat("Actual Queue Count", actualQueues.size(), is(equalTo(expectedQueues.size())));
        //        for(String expectedQueue : expectedQueues) {
        //            assertThat("Expected Queue: " + expectedQueue, actualQueues, hasItem(expectedQueue));
        //        }

    }

    @Test(groups = {"version-3.0.0", "call_details"}, enabled = false)
    public void queueSelectionJax() {

        //        nav.signin(constants.APP_CC_JAX_AGENT_USERNAME, constants.APP_CC_JAX_AGENT_PASSWORD, false);
        //        assertThat("Session Drawer Tab", session.getSessionTabInactiveText(), containsString("Start New Session"));
        //        session.openSessionDrawer();
        //
        //        List<String> expectedQueues = databaseUtil.getDatabaseJaxQueues();
        //        List<WebElement> queues = callDetails.getQueueOptions();
        //        List<String> actualQueues = new ArrayList<>();
        //
        //        for(WebElement queue: queues) {
        //            actualQueues.add(queue.getText());
        //        }
        //
        //        assertThat("Actual Queue Count", actualQueues.size(), is(equalTo(expectedQueues.size())));
        //        for(String expectedQueue : expectedQueues) {
        //            assertThat("Expected Queue: " + expectedQueue, actualQueues, hasItem(expectedQueue));
        //        }

    }

}
