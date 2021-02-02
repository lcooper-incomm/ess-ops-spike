package com.incomm.cca.qa.dataProvider.common;

/**
 * Created by gscholes on 10/1/2019
 */
public class UserData {

    // USER ACCOUNTS
    public static final Credential CCA_ADMIN = new Credential("cca_admin", "Eu6B45Voh9");
    public static final Credential MANAGER1 = new Credential("svc_slc_manager_1", "Hell0Darkn3ssMy0ldFr!end");
    public static final Credential MANAGER2 = new Credential("svc_slc_manager_2", "Iv3C0meToTalkWithY0u@gain");
    public static final Credential MANAGER3 = new Credential("svc_slc_manager_3", "BecauseAV!s!0nS0ftlyCreep!ing");
    public static final Credential SUPERVISOR1 = new Credential("svc_slc_supervisor_1", "LeftItsS33dsWh!leIWasSleep!ing");
    public static final Credential SUPERVISOR2 = new Credential("svc_slc_supervisor_2", "AndTheV!si0nTh@t");
    public static final Credential SUPERVISOR3 = new Credential("svc_slc_supervisor_3", "WasPl@nt3dInMyBr@!n");
    public static final Credential AGENT1 = new Credential("svc_slc_agent_1", "St!llR3m@insW!thin");
    public static final Credential AGENT2 = new Credential("svc_slc_agent_2", "Th3S0undOfS!lencE");
    public static final Credential AGENT3 = new Credential("svc_slc_agent_3", "!nR3stlessDre@msIWalkAl0ne");

    /**
     * Created by gscholes on 10/1/2019
     */
    public static class Credential {

        private String username;
        private String password;

        Credential(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }
}
