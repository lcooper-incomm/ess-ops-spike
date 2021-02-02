EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'HOLD_CARDS', 'Hold Cards';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'HOLD_CARDS', 'Hold Cards';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'HOLD_CARDS',
                                        '<div>The Order has activated cards, and requires a higher tier of support to cancel. By continuing, you will begin a process to set all cards'' status to Fraud Hold, and will then continue to create an E-Comm Fraud Case.<div>';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'ALERT', 'HOLD_CARDS',
                                        'You are about to change the status of all cards in this Order. This action cannot be undone.';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'FOOTER', 'HOLD_CARDS',
                                        'Are you sure you want to Hold this Order''s cards?';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'RAISE_CASE', 'Raise Case';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'RAISE_CASE', 'Raise Case';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'RAISE_CASE',
                                        '<div>The process of placing all of this Order''s cards on Fraud Hold has begun. Continue to create an E-Comm Fraud Case.<div>';