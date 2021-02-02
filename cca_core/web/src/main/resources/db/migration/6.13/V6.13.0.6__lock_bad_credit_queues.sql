UPDATE session_queue
SET is_locked = 1
WHERE system_name IN (
    'FRD_BAD_CREDIT_1',
    'FRD_BAD_CREDIT_2',
    'FRD_BAD_CREDIT_3',
    'FRD_BAD_CREDIT_4'
);