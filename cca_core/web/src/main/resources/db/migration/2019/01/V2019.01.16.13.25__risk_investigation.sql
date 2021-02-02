EXECUTE add_permission 'GC_CHANGE_STATUS_FROM_RISK_INVESTIGATION', 'GC Change Status from Risk Investigation',
        'Ability to change Greencard status from Risk Investigation';
EXECUTE add_permission 'GC_CHANGE_STATUS_TO_RISK_INVESTIGATION', 'GC Change Status to Risk Investigation',
        'Ability to change Greencard status to Risk Investigation';
EXECUTE add_permission 'VMS_CHANGE_STATUS_FROM_RISK_INVESTIGATION', 'VMS Change Status from Risk Investigation',
        'Ability to change VMS status from Risk Investigation';
EXECUTE add_permission 'VMS_CHANGE_STATUS_TO_RISK_INVESTIGATION', 'VMS Change Status to Risk Investigation',
        'Ability to change VMS status to Risk Investigation';

INSERT INTO platform_status_value (platform, name, value)
VALUES ('VMS', 'RISK_INVESTIGATION', 'RISK_INVESTIGATION');