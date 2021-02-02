EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'EXPIRED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'ON_HOLD', 'DEACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'REPLACEMENT_REQUESTED', 'ACTIVE';
EXECUTE add_default_change_status_rule 'GC', 'GREENCARD_CHANGE_STATUS', 'REPLACEMENT_REQUESTED', 'FRAUD_WATCH';