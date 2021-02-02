DECLARE @searchTypeId BIGINT = (SELECT id
                                FROM search_type
                                WHERE type = 'VMS_GIFT');

DECLARE @cardInformationGroupId BIGINT = (SELECT id
                                          FROM search_type_parameter_group
                                          WHERE search_type_id = @searchTypeId
                                            AND name = 'Card Information');
DECLARE @transactionInformationGroupId BIGINT = (SELECT id
                                                 FROM search_type_parameter_group
                                                 WHERE search_type_id = @searchTypeId
                                                   AND name = 'Transaction Information');

DECLARE @cardNumberParameterId BIGINT = (SELECT id
                                         FROM search_parameter
                                         WHERE type = 'PAN_VMS');
DECLARE @accountNumberParameterId BIGINT = (SELECT id
                                            FROM search_parameter
                                            WHERE type = 'ACCOUNT_NUMBER');
DECLARE @serialNumberParameterId BIGINT = (SELECT id
                                           FROM search_parameter
                                           WHERE type = 'SERIAL_NUMBER');
DECLARE @proxyNumberParameterId BIGINT = (SELECT id
                                          FROM search_parameter
                                          WHERE type = 'PROXY_NUMBER');
DECLARE @cardIdParameterId BIGINT = (SELECT id
                                     FROM search_parameter
                                     WHERE type = 'CARD_ID');
DECLARE @transactionIdParameterId BIGINT = (SELECT id
                                            FROM search_parameter
                                            WHERE type = 'TRANSACTION_ID');
DECLARE @startDateParameterId BIGINT = (SELECT id
                                        FROM search_parameter
                                        WHERE type = 'START_DATE');
DECLARE @endDateParameterId BIGINT = (SELECT id
                                      FROM search_parameter
                                      WHERE type = 'END_DATE');

UPDATE search_type_parameter_group_parameter
SET is_advanced = 0
WHERE group_id = @cardInformationGroupId;

UPDATE search_type_parameter_group_parameter
SET is_advanced = 1
WHERE group_id = @cardInformationGroupId
  AND search_parameter_id IN (@proxyNumberParameterId, @cardIdParameterId);

UPDATE search_type_parameter_group_parameter
SET is_advanced = 1
WHERE group_id = @transactionInformationGroupId
  AND search_parameter_id IN (@transactionIdParameterId, @startDateParameterId, @endDateParameterId);