
INSERT INTO togglz ([feature_name], [feature_enabled])
    values ('DEACTIVATEIDLEUSERSJOB', 1);

INSERT INTO cca_property ([system_name], [display_name], [description], [value])
    values ('INCOMM_USER_DEACTIVATION_RECIPIENT', 'InComm User Deactivation Recipient', 'Email to send user deactivation summary to.', 'essops@incomm.com')
