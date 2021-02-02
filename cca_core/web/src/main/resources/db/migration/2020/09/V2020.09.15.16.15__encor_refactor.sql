
EXECUTE add_permission 'ENCOR_IMPERSONATE_USER', 'Encor Impersonate User',
                       'Ability to impersonate an Encor user.';

UPDATE session_type set [name]='REWARDS' where [name]='ENCOR';
UPDATE session_type set [name]='REWARDS_TRAINING' where [name]='ENCOR_TRAINING';

UPDATE session_queue_session_type set [session_type]='REWARDS' where [session_type]='ENCOR';
UPDATE session_queue_session_type set [session_type]='REWARDS_TRAINING' where [session_type]='ENCOR_TRAINING';

 UPDATE permission set system_name='RAISE_SESSION_TYPE_REWARDS', display_name='Raise Session Type - Rewards', description='Ability to create a Rewards Session'
    where system_name='RAISE_SESSION_TYPE_ENCOR';

 UPDATE permission set system_name='RAISE_SESSION_TYPE_REWARDS_TRAINING', display_name='Raise Session Type - Rewards Training', description='Ability to create a Rewards Training Session'
    where system_name='RAISE_SESSION_TYPE_ENCOR_TRAINING';

 UPDATE permission set system_name='SESSION_TYPE_REWARDS', display_name='Work Session Type - Rewards', description='Ability to create a Rewards Session'
    where system_name='SESSION_TYPE_ENCOR';

 UPDATE permission set system_name='SESSION_TYPE_REWARDS_TRAINING', display_name='Work Session Type - Rewards Training', description='Ability to create a Rewards Training Session'
    where system_name='SESSION_TYPE_ENCOR_TRAINING';

UPDATE cca_session set session_type='REWARDS' where session_type='ENCOR';
UPDATE cca_session set session_type='REWARDS_TRAINING' where session_type='ENCOR_TRAINING';
