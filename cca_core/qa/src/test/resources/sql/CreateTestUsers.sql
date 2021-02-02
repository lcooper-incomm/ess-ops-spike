declare @ccaAdminId integer = (select id
                               from cca.dbo.cca_user
                               where username = 'cca_admin'),
    @myTimeStamp datetime2 = CURRENT_TIMESTAMP;
if not exists(select username
              from cca.dbo.cca_user
              where username = 'cca_admin')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('cca_admin', 'CCA_Admin', null, 'CCA_Admin@incomm.com', 1, 0, 'INCOMM', '2016-02-23 00:47:16.000000', 1,
            '2019-09-27 12:22:59.283000', 1, 4, null, null, null, 'Resource Account', 'CCA_Admin', null, null,
            'UNPINNED',  'LEFT', 'GENERAL', 1, '2019-09-27 12:22:59.1900000', 1, 5, null, null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_manager_1')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_manager_1', 'SLC ', 'ManagerOne', 'svc_slc_manager_1@incomm.com', 1, 0, 'INCOMM', @myTimeStamp,
            @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account', 'SLC ManagerOne', null,
            null, 'UNPINNED',  'LEFT', 'GENERAL', 0, null, 1, 5, null, null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_manager_2')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_manager_2', 'SLC', 'ManagerTwo', 'svc_slc_manager_2@incomm.com', 1, 0, 'INCOMM', @myTimeStamp,
            @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account', 'SLC ManagerTwo', null,
            null, 'UNPINNED', 'LEFT', 'GENERAL', null, null, 1, null, null, null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_manager_3')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_manager_3', 'SLC', 'ManagerThree', 'svc_slc_manager_3@incomm.com', 0, 0, 'INCOMM', @myTimeStamp,
            @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account', 'SLC ManagerThree',
            null, null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null, null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_supervisor_1')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_supervisor_1', 'SLC', 'SupervisorOne', 'svc_slc_supervisor_1@incomm.com', 0, 0, 'INCOMM',
            @myTimeStamp, @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account',
            'SLC SupervisorOne', null, null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null, null,
            'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_supervisor_2')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_supervisor_2', 'SLC', 'SupervisorTwo', 'svc_slc_supervisor_2@incomm.com', 0, 0, 'INCOMM',
            @myTimeStamp, @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account',
            'SLC SupervisorTwo', null, null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null, null,
            'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_supervisor_3')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_supervisor_3', 'SLC', 'SupervisorThree', 'svc_slc_supervisor_3@incomm.com', 0, 0, 'INCOMM',
            @myTimeStamp, @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account',
            'SLC SupervisorThree', null, null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null,
            null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_agent_1')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_agent_1', 'SLC', 'AgentOne', 'svc_slc_agent_1@incomm.com', 0, 0, 'INCOMM', @myTimeStamp,
            @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account', 'SLC AgentOne', null,
            null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null, null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_agent_2')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode,  pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_agent_2', 'SLC', 'AgentTwo', 'svc_slc_agent_2@incomm.com', 0, 0, 'INCOMM', @myTimeStamp,
            @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account', 'SLC AgentTwo', null,
            null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null, null, 'DASHBOARD');
if not exists(select username
              from cca.dbo.cca_user
              where username = 'svc_slc_agent_3')
    INSERT INTO cca.dbo.cca_user (username, first_name, last_name, email, active, pref_show_billable_only,
                                  pref_default_data_source, created_date, created_by, modified_date, modified_by,
                                  default_partner_id, company, department, employee_id, title, display_name, mobile,
                                  phone, pref_dock_mode, pref_summary_mode,
                                  pref_default_session_type, pref_dont_show_whats_new, last_login_date, is_migrated,
                                  pref_default_search_type_id, pref_default_ccl_partner_id, pref_default_bol_partner,
                                  pref_default_landing_page)
    VALUES ('svc_slc_agent_3', 'SLC', 'AgentThree', 'svc_slc_agent_3@incomm.com', 0, 0, 'INCOMM', @myTimeStamp,
            @ccaAdminId, @myTimeStamp, @ccaAdminId, null, null, null, null, 'Test User Account', 'SLC AgentThree', null,
            null, 'UNPINNED',  'LEFT', 'GENERAL', null, null, 1, null, null, null, 'DASHBOARD');










