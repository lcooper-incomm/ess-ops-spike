# Created by gscholes at 10/23/2020
Feature: User Must Have Permissions
  Permissions are required to create and work complaint log entries.

  Background:
    Given I am an authenticated user
    And I am in a Call Session

  Scenario: User without Create Complaint Permission should not be able to create a complaint log.
    Given I do not have the Create Complaint Permission
    When I open a Session with a Call Component
    Then I cannot see the Create Complaint Log button

  Scenario: User with Create Complaint Permission should be able to create a complaint log.
    Given I have the Create Complaint Permission
    And I have at least one Create Complaint BankType permission
    When I open a Session with a Call Component
    Then I can see the Create Complaint Log button

  Scenario: User with Create Complaint Permission should be able to create a complaint log unless they don't have bank.
    Given I have the Create Complaint Permission
    And I do not have at least one Create Complaint BankType permission
    When I open a Session with a Call Component
    Then I cannot see the Create Complaint Log button

