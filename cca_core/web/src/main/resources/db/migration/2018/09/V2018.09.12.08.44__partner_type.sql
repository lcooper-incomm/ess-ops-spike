ALTER TABLE partner
    ADD type VARCHAR(64);

GO

--Some partners may not exist in the lower lanes, and we ought to fix that now...
IF NOT EXISTS(SELECT id
              FROM partner
              WHERE name = 'dollargeneral')
    BEGIN
        EXECUTE add_permission 'PARTNER_PERMISSION_DOLLARGENERAL', 'Partner dollargeneral permission', '';
        INSERT INTO partner (name, ivr_dnis, permission_id, platform)
        VALUES ('dollargeneral',
                '8446018030',
                (SELECT id FROM permission WHERE system_name = 'PARTNER_PERMISSION_DOLLARGENERAL'),
                'VMS');
    END

IF NOT EXISTS(SELECT id
              FROM partner
              WHERE name = 'GLOBAL')
    BEGIN
        EXECUTE add_permission 'PARTNER_PERMISSION_GLOBAL', 'Partner GLOBAL permission', '';
        INSERT INTO partner (name, ivr_dnis, permission_id, platform)
        VALUES ('GLOBAL', '', (SELECT id FROM permission WHERE system_name = 'PARTNER_PERMISSION_GLOBAL'), 'VMS');
    END

UPDATE partner
SET name = 'jacksonhewitt'
WHERE name = 'Jackson Hewitt';

GO

--Set type column values
UPDATE partner
SET type = 'COINBASE'
WHERE name = 'Coinbase';

UPDATE partner
SET type = 'DFC'
WHERE name = 'DFC';

UPDATE partner
SET type = 'EPP'
WHERE name = 'EPP';

UPDATE partner
SET type = 'INCOMM'
WHERE name = 'InComm';

UPDATE partner
SET type = 'JACKSONHEWITT'
WHERE name = 'jacksonhewitt';

UPDATE partner
SET type = 'LYFE'
WHERE name = 'Lyfe';

UPDATE partner
SET type = 'NEXTCALA'
WHERE name = 'NextCALA';

UPDATE partner
SET type = 'PAYPAL'
WHERE name = 'PayPal';

UPDATE partner
SET type = 'DOLLARGENERAL'
WHERE name = 'dollargeneral';

UPDATE partner
SET type = 'GLOBAL'
WHERE name = 'GLOBAL';
