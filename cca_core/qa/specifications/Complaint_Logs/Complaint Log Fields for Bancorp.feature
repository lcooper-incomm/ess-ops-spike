# Created by gscholes at 10/26/2020
Feature: Complaint Log Fields for Bancorp
  Complaints for Bancorp must capture specific data.
  The Confirmation page for Bancorp must reflect specific data.
  The Case Session Summary wizard for Bancorp Complaints must reflect specific data.
  The Session Panel Complaint component must reflect specific information for Bancorp Complaint Cases.

#Scenario: Bancorp Complaint
#    Given I've opened the Log a Complaint wizard for a session in a Queue associated to the Bancorp bank
#    When I view the form page
#    Then the following fields are available (* indicates required):
#    * First Name* (input)
#    * Last Name* (input)
#    * Postal Code (input)
#    * Category* (dropdown), with these options:
#         ** Account/Card Access
#         ** CIP
#         ** Call Wait Times
#         ** Card Blocked
#         ** Closure Related
#         ** Disclosure Related
#         ** Disputed Transaction
#         ** Don’t recall applying – Account not Requested
#         ** Fee Related
#         ** Funds Availability
#         ** Identity Theft
#         ** Other
#         ** Regulatory
#         ** Service Related
#         ** Tax Refund Related
#    * Source* (dropdown, default to "Phone")
#         ** Email
#         ** Fax
#         ** Letter
#         ** Online
#         ** Phone
#         ** Social Media
#    * Cause* (dropdown), with these options:
#         ** Customer Misunderstanding
#         ** Disclosure Related
#         ** None
#         ** Rep Error
#         ** Systemic Error
#         ** Verification Needed
#    * Complaint* (textarea)
#    * Enhancements Needed (textarea)
#    * Department (dropdown, default to "Call Center")
#         ** Business Banking
#         ** Call Center
#         ** Cash Management (Formerly PPB)
#         ** Deposit Operations
#         ** General Affinity
#         ** Healthcare/HSA
#         ** HigherOne
#         ** ISO/Merchant
#         ** Loans
#         ** Other
#         ** Prepaid / PSG
#         ** Wealth Management
#    * Type* (dropdown, default to "Call Center")
#         ** Attorney
#         ** Attorney General
#         ** Bank Commissioner
#         ** BBB
#         ** Call Center
#         ** Client Relationship Manager
#         ** Executive Staff
#         ** FDIC
#         ** Other
#         ** Program Manager
#         ** Social media
#    * Regulatory? (checkbox)
#    * Resolution (textarea)
