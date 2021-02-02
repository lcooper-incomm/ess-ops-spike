UPDATE search_type
SET
    name = 'SERVE Card',
    type = 'SERVE',
    category_id = (SELECT id FROM search_type_category WHERE name = 'Financial'),
    platform = 'SERVE'
WHERE type = 'AMEX_GIFT';

UPDATE permission
SET
    system_name = 'SEARCH_SERVE',
    display_name = 'SERVE Search',
    description = 'Ability to search SERVE cards'
WHERE system_name = 'SEARCH_AMEX_GIFT_CARD'