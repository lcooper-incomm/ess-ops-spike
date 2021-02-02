# Created by gscholes at 10/23/2020
Feature: Complaint Log Workflow
  InComm Payments needs to track complaints from customers and forward them to banking institutions.
  Customers who call InComm Customer Care Centers with a complaint need to have their complaints accurately noted and 
  sent to the appropriate financial institution.
  CSR personnel need to be able to log the customer's complaint.
  The Complaint should have the information required by the banking institution.
  The Customer Care Application supports the following banking institutions:
    - American Express
    - Bancorp
    - MasterCard
    - MetaBank

  System:
    - The System must have permissions set up for the Complaint Log feature 
  Session Panel - Call Session - Create Complaint Button:
    - The user must be authorized to create a complaint.
    - The user must be authorized to create a complaint for at least one banking institution.
    - The user can see the complaint log button in a CALL session.
    - When the user clicks on the complaint log button, the complaint log wizard appears.
    - When the user has an account open in the session, the wizard opens with the account information prepopulated with the default account number.
  Wizard:
    - The wizard must use a normal 3 step process: (Input) Form, Confirm, Results
  Wizard - Input Form:
    - The wizard requires the user to specify for which bank the complaint will be recorded.
    - Only the bank(s) for which the user has permission will appear in the bank drop-down.
    - After the user specifies a bank, the corresponding form will be displayed.
    - The user will have specific fields that must be entered.
    - Drop-down fields will have lists specific to the bank.
    - Instead of requiring a Comment about the Complaint, text input of the Complaint will be required.
    - Only after all of the required fields of the form have been answered will the "Next" button become active.
    - The "Cancel" button is active at all times.
    - Given the "Next" button is active, When the "Next" button is clicked, Then the Confirm panel of the wizard appears.
  Wizard - Confirm:
    - When the confirmation panel appears, the fields that pertain to the bank appear with the answers supplied by the user.
    - None of the fields will be editable on the Confirm panel.
    - The confirmation panel will have the question, "Are you sure you want to perform this action?"
    - There will be 3 active buttons, "Yes", "No", "Cancel"
    - When the "Yes" button is clicked, the Complaint will be logged and the Results panel will appear.
    - When the "No" button is clicked, the user will be returned to the Input Form panel, with all the stored answers preserved.
    - When the "Cancel" button is clicked, the wizard will be dismissed, and the complaint will not be logged.
  Wizard - Results:
    - When the Results panel appears, the CASE NUMBER as a link and the WORK CASE icon as a link will appear in the body of the panel.
    - When the Results panel appears, only the "Close" button will be available.
    - When the "Close" button is clicked, the wizard is dismissed.
    - When the CASE NUMBER link is clicked, the Case Summary wizard appears.
    - When the WORK CASE icon is clicked, the Session Panel is opened to the Case that was created.
  Case Summary Wizard:

  Session Panel - Complaint Case:

