UPDATE wizard_message
SET message = '<div>1. Complete the form below.</div>'
WHERE wizard_key = 'MERGE_SELECTION'
      AND message_type = 'INSTRUCTIONS'
      AND page = 2;