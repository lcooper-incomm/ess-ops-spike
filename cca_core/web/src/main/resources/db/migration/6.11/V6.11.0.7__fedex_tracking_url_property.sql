INSERT INTO cca_property (system_name, display_name, description, value) VALUES
    ( 'FEDEX_TRACKING_URL', 'FedEx Tracking URL', 'The URL CCA uses to build links for Tracking Numbers',
      'https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber={{VALUE}}' );