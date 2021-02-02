EXECUTE add_permission 'CANCEL_ORDER', 'Cancel Order', 'Ability to perform the Cancel action against an Order';
EXECUTE add_permission 'HOLD_ORDER', 'Hold Order', 'Ability to perform the Fraud Hold action against an Order';
EXECUTE add_permission 'REQUEST_HOLD_ORDER', 'Request Hold on Order',
                       'Ability to perform the Request Hold action against an Order';
EXECUTE add_permission 'UNHOLD_ORDER', 'Resume Order', 'Ability to perform the Resume action against an Order';
