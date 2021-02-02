# Created by gscholes at 10/26/2020
Feature: Complaint Log Fields for American Express
  Complaints for American Express must capture specific data.
  The Confirmation page for American Express must reflect specific data.
  The Case Session Summary wizard for American Express Complaints must reflect specific data.
  The Session Panel Complaint component must reflect specific information for American Express Complaint Cases.

#Scenario: American Express Complaint
#    Given I've opened the Log a Complaint wizard for a session in a Queue associated to the American Express bank
#    When I view the form page
#    Then the following fields are available (* indicates required):
#    * First Name* (input)
#    * Last Name* (input)
#    * Postal Code (input)
#    * Category* (dropdown), with these options:
#         ** ATM Related
#         ** Account/Card Access
#         ** CIP
#         ** Call Wait Times
#         ** Card Blocked
#         ** Closure Related
#         ** Disclosure Related
#         ** Disputed Transaction
#         ** Don’t recall applying – Account not Requested
#         ** Fee Related
#         ** Fraud Disputes
#         ** Funds Availability
#         ** Funds Transfer
#         ** Identity Theft
#         ** Marketing, Adertising, and Promotional Offers
#         ** Not Delivered/Replacement Timeframes
#         ** Other
#         ** Pre-authorized Holds
#         ** Prepaid Refunds
#         ** Privacy
#         ** Problems with Policy
#         ** Processing of Application/Order
#         ** Product Feature/Benefit Usage
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
#         ** BBB
#         ** Bank Commissioner
#         ** CFPB
#         ** Call Center
#         ** Client Relationship Manager
#         ** Executive Staff
#         ** FDIC
#         ** Other
#         ** Program Manager
#         ** Social media
#    * Discrimination Type (dropdown):
#         ** Age
#         ** Color
#         ** Familial Status
#         ** Gender
#         ** Handicap
#         ** Location/Age of Dwelling
#         ** Marital Status
#         ** National Origin
#         ** Other
#         ** Race
#         ** Receipt of public assistance
#         ** Religion
#         ** Sexual Orientation
#    * Regulatory? (checkbox)
#    * Resolution (textarea)
