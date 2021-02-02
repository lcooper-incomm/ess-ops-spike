UPDATE wizard_message
SET message = '<div>Review the information below before proceeding.</div>'
WHERE wizard_key = 'CANCEL_ORDER'
      AND page_name = 'CONFIRM_REFUND'
      AND message_type = 'INSTRUCTIONS';