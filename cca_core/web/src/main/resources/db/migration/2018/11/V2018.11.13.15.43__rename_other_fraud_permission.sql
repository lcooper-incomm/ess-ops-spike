UPDATE permission
SET display_name = 'Work Session Type - Other',
    description  = 'Ability to work an Other Session'
WHERE system_name = 'SESSION_TYPE_OTHER_FRAUD';

UPDATE permission
SET display_name = 'Raise Session Type - Other',
    description  = 'Ability to create an Other Session'
WHERE system_name = 'RAISE_SESSION_TYPE_OTHER_FRAUD';