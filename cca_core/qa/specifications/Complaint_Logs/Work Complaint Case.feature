# Created by gscholes at 10/23/2020
Feature: Work Complaint Case
  As a Supervisor or Manager
  I need to work Complaint Cases to closed status
  so they are resolved prior to sending the Complaint Report to a bank.

  Background:
    Given I am a Supervisor or Manager
    And I am working a Complaint Case

  Scenario: Complaint Component can be found in Session Panel
    When I view the session panel
    Then I see a Complaint component tab in the Session Panel

  Scenario: Resolution Field must be filled in order to close a Complaint Case
    When I see the Complaint component tab in the Session Panel
    Then the Resolution field is required

  Scenario: Missing Data in Required Fields causes Red Badge to show on Complaint Component Tab
    When the Complaint component is missing data in required fields
    Then I see a red badge icon over the Complaint Component tab
    And I cannot close the case

  Scenario: Resolve or Close Case
    And I have completed all required fields
    When I close the case
    Then I am not required to enter a comment as with other session types
    And the case is closed just as other session types

