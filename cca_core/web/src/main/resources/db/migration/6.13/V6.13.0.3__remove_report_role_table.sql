DROP TABLE report_role;
EXECUTE drop_default_constraint 'report', 'override';
ALTER TABLE report
    DROP COLUMN override;