UPDATE wizard_message
SET
    message = '<div>Due to there having been cards already issued for this order, a Refund is necessary. Review the information below, and determine whether shipping and/or purchase fees should be refunded before proceeding.</div>'
WHERE page_name = 'REFUND_ORDER'
      AND message_type = 'INSTRUCTIONS';