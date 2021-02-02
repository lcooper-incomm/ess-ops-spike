EXECUTE add_permission 'SEARCH_BY_VMS_GIFT', 'VMS Gift Search', 'Ability to search VMS Gift Cards';

UPDATE permission
SET display_name = 'VMS GPR Search'
WHERE system_name = 'SEARCH_BY_GPR';