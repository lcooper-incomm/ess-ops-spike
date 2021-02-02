EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'CANCEL_ORDER';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'CANCEL_CARDS';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'CANCEL_IN_PROGRESS';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'REFUND_ORDER';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'CONFIRM_REFUND';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'HOLD_CARDS';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'RAISE_CASE';
EXECUTE default_wizard_messages_by_page_name 'CANCEL_ORDER', 'RESULTS';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'CANCEL_ORDER', 'Cancel Order';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'CANCEL_ORDER', 'Cancel Order';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'ALERT', 'CANCEL_ORDER',
                                        'You are about to cancel this Order. This action cannot be undone.';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'FOOTER', 'CANCEL_ORDER',
                                        'Are you sure you want to cancel this Order?';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'CANCEL_CARDS', 'Cancel Cards';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'CANCEL_CARDS', 'Cancel Cards';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'CANCEL_CARDS',
                                        '<div>The Order has cards that must be Closed before proceeding with the refund. By continuing, you will begin a process to:</div>
<div>1. Set the card status to Closed; and</div>
<div>2. Set the card balance to $0.00<div>';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'ALERT', 'CANCEL_CARDS',
                                        'You are about to change the status and balance of all cards in this Order. This action cannot be undone.';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'FOOTER', 'CANCEL_CARDS',
                                        'Are you sure you want to Close this Order''s cards?';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'CANCEL_IN_PROGRESS', 'Cancel in Progress';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'CANCEL_IN_PROGRESS', 'Cancel in Progress';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'CANCEL_IN_PROGRESS',
                                        '<div>The process to Close this Order''s cards has begun. You can view the progress below. Continue to the next step to begin the Order refund.</div>',
                                        '<div>An error occurred attempting to begin the process to Close this Order''s cards. Contact an administrator before continuing.';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'ALERT', 'CANCEL_IN_PROGRESS',
                                        'You are NOT finished with the refund. Continue to the next step.';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'REFUND_ORDER', 'Refund Order';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'REFUND_ORDER', 'Refund Order';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'REFUND_ORDER',
                                        '<div>Review the information below, and determine whether shipping and/or purchase fees should be refunded before proceeding.</div>';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'ALERT', 'REFUND_ORDER',
                                        'You are NOT finished with the refund. Continue to the next step.';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'CONFIRM_REFUND', 'Confirm Refund';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'CONFIRM_REFUND', 'Confirm Refund';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'CONFIRM_REFUND',
                                        '<div>Review the information below, and determine whether shipping and/or purchase fees should be refunded before proceeding.</div>';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'ALERT', 'CONFIRM_REFUND',
                                        'You are NOT finished with the refund. Continue to the next step.';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'FOOTER', 'CONFIRM_REFUND',
                                        'Are you sure you want to refund this Order?';

EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'TITLE', 'RESULTS', 'Refund Results';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'SHORT_TITLE', 'RESULTS', 'Results';
EXECUTE set_wizard_message_by_page_name 'CANCEL_ORDER', 'INSTRUCTIONS', 'RESULTS',
                                        '<div>The Order has been successfully cancelled.</div>',
                                        '<div>An error occurred attempting to cancel or refund the Order. Contact an administrator for assistance.</div>';



