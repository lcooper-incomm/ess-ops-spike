Feature: Check Required Permissions
  As an admin user,
  I can see the necessary Permissions for Complaint Logs in the database.

  Background:
    Given I signed in as "System Administrator"
    And I have navigated to the Permissions Page

  Scenario Outline: System Administrator can see all the expected Permissions
    When I search for <permission> in the Permission Control Panel
    Then <permission> is present in the search results
    Examples:
      | permission                             |
      | "Case Search Session Type - COMPLAINT" |
      | "Create American Express Complaint"    |
      | "Create Bancorp Complaint"             |
      | "Create MasterCard Complaint"          |
      | "Create MetaBank Complaint"            |
      | "Queue - Complaint: American Express"  |
      | "Queue - Complaint: Bancorp"           |
      | "Queue - Complaint: MasterCard"        |
      | "Queue - Complaint: MetaBank"          |
      | "Raise Session Type - Complaint"       |
      | "Work Session Type - Complaint"        |
