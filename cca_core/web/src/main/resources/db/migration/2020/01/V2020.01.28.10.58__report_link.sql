if not exists(select *
              from INFORMATION_SCHEMA.COLUMNS
              where TABLE_NAME = 'report'
                and COLUMN_NAME = 'link')
  begin
    ALTER TABLE report
      ADD link VARCHAR(512);
  end;

ALTER TABLE [report]
  ALTER COLUMN [permission_id] BIGINT NOT NULL;
ALTER TABLE [report]
  ADD CONSTRAINT fk_report_permission FOREIGN KEY ([permission_id]) references [permission] ([id]);

GO

UPDATE report
SET name = 'Wrap-up: Code ''NS'' by Username',
    link = 'https://tableau.incomm.com/views/CCAWrap-upCodesUsed/NoWrap-upSelectedReport'
WHERE name = 'Wrap-up: Code ''NS'' by Username';

UPDATE report
SET name = 'Wrap-up: Custom Report',
    link = 'https://tableau.incomm.com/views/GeneralReports/CustomWUP'
WHERE name = 'Wrap-up: Custom Report';

UPDATE report
SET name = 'Actions Performed',
    link = 'https://tableau.incomm.com/views/CCAActionReports/UsersActionCount'
WHERE name = 'Actions Performed';

UPDATE report
SET name = 'Wrap-up: Target''s Monthly Report',
    link = 'https://tableau.incomm.com/views/Wrap-upReport-TARGETENSP/TARGETWrap-upsbyMonth'
WHERE name = 'Wrap-up: Target''s Monthly Report';

UPDATE report
SET name = 'Wrap-up: RBC Monthly',
    link = 'https://tableau.incomm.com/views/RBCReports/RBCMonthlyWrap-upReports'
WHERE name = 'Wrap-up: RBC Monthly';

UPDATE report
SET name = 'Session: Report',
    link = 'https://tableau.incomm.com/views/SessionDetails/Sessions'
WHERE name = 'Session: Report';

UPDATE report
SET name = 'Calls: Daily PBX Report',
    link = 'https://tableau.incomm.com/views/PBX_Daily_4_0_Migration_EXTRACT/PBXDailyReport'
WHERE name = 'Calls: Daily PBX Report';

UPDATE report
SET name = 'Calls: Hour by Hour',
    link = 'https://tableau.incomm.com/views/GO_LIVE_HBH_24_Hour_Coverage/HourbyHourDash3'
WHERE name = 'Calls: Hour by Hour';

UPDATE report
SET name = 'Session: Details',
    link = 'https://tableau.incomm.com/views/SessionDetails/SessionInformation'
WHERE name = 'Session: Details';

UPDATE report
SET name = 'CCA Roles',
    link = 'https://tableau.incomm.com/views/CCARolesCustomerService/Roles'
WHERE name = 'CCA Roles';

UPDATE report
SET name = 'Wrap-up: AMEX Gift',
    link = 'https://tableau.incomm.com/views/Wrap-upReport-AMEXGift/AmexGiftbyMonth'
WHERE name = 'Wrap-up: AMEX Gift';

UPDATE report
SET name = 'Wrap-up: TARGET AMEX',
    link = '	https://tableau.incomm.com/views/Wrap-upReport-TargetAMEX/Amex-TargetbyMonth'
WHERE name = 'Wrap-up: TARGET AMEX';

UPDATE report
SET name = 'Wrap-up: AMEX BOL',
    link = 'https://tableau.incomm.com/views/Wrap-upReport-AMEXBOL/AmexBOLbyMonth'
WHERE name = 'Wrap-up: AMEX BOL';

UPDATE report
SET name = 'C2C Request Report',
    link = 'https://tableau.incomm.com/views/C2CReqeustsReport/C2CRequestReport'
WHERE name = 'C2C Request Report';