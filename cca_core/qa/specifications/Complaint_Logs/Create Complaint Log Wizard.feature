# Created by gscholes at 10/23/2020
Feature: Create Complaint Log Wizard
  In order for the user to raise the Create Complaint Log wizard, they must have the Create Complaint Log permission.
  In order to select a Bank to log the complaint, they must have a Create Complaint: <BankName> permission.
  The wizard should have the standard "Form > Confirmation > Results" flow.

  Background:
    Given I am an authenticated user
    And I have Create Complaint Log permission
    And the Log a Complaint button is enabled in the Call Component

  Scenario: Default Wizard Behavior
    When I click the Log a Complaint button
    Then a dialog opens with the standard "Form > Confirmation > Results" flow
    And the navigation title for the first page is "Complaint"
    And the navigation title for the second page is "Confirm"
    And the navigation title for the third page is "Results"

  Scenario: Default Wizard Behavior
    When I click the Log a Complaint button
    Then a dialog opens with the standard "Form > Confirmation > Results" flow
    And the dropdown for BANK lists only those banks for which I have permission to create a complaint.