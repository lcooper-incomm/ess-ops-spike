UPDATE platform_status_value
SET name = 'ON_HOLD_NEGATIVE_BALANCE'
WHERE name = 'NEGATIVE_BALANCE_ON_HOLD' AND platform = 'GREENCARD';

UPDATE platform_status_value
SET name = 'RETURNED'
WHERE name = 'RETURNED_CARD' AND platform = 'GREENCARD';