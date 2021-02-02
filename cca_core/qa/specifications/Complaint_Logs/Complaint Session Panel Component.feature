# Created by gscholes at 10/26/2020
Feature: Complaint Session Panel Component
 As a CSR Manager or Complaint CSR, I need to be able to properly resolve complaints recorded by a CSR.

  Scenario: Complaints Are Not Resolved By CSR
    Given I have opened the Complaint Entry Wizard from the Session Panel
    When I select a bank from the drop-down
    Then the appropriate form is displayed
    And the Resolution Field is NOT available for edit

  Scenario: Submit Complaint
    Given I have completed the Complaint form
    When I confirm submission of the complaint
    Then a new case is created of type "Complaint"
    And the new case has the "[bankName] Complaint" queue assigned
    And the new case has the "Complaint" wrap-up category assigned
    And the new case has the "Complaint" wrap-up code assigned
    And the new case has the complaint record associated to it
    And the new case is in ACTIVE status

  Scenario: Submit Complaint Resolved
    Given I am working a Complaint case in the Session Panel
    And I did fill in the Resolution field
    And I did fill in the Resolution Date field
    When I click on the check mark (close session) button
    Then the case is closed
    And the case is in CLOSED status
    And the case has a closed_date
