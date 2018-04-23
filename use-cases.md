# Use Cases for Micro-Credentail Smart Contract



## Top-Level Organization Instantiates a Contract
Background:  The contract will be instantiated by the agency/organization that would like to receive and approve micro-credentail requests from end users. That will be the 'owner'.  For the purpose of this and all use cases, we will pretend that this organization it something like the ETS (Educational Testing Service).  This is the organization (in the US) that administers the SAT, ACT and Praxis tests.  They have an army of graders that score written text and other data against a rubric.

  * ETS representative visit web page at http://www.micro-credentails-r-us.com
  * ETS representative sees an informative screen explaining the product.
  * ETS representative purchases some PIRL (oy)
  * ETS representative clicks a button to start the contract.  They must deposit some amount of Pirl to get started (500?)
  * ETS representative is prompted to input the following struct info:
    * Organization name, address, phone, email, contact person, website
    ``` javascript
      Struct Organization {
        string name,
        string address,
        string phone,
        string email,
        string contactPerson,
        string website,
        uint mircoCredentialFee         // This is the fee they will collect from the educator
      }
    ```
  * The Pirl Smart contract is instantiated and then we call S
      SetOrgInfo(name, address, phone, email, contactPerson, website, microCredentialFee) public ownerOnly()
  * ETS representative is redirected to a new page that is dedicated to their contract.  This is the page that they will link or embed in their own website.  This will support the following info:
    * Update Contract Info
    * Send More Pirl to the Contract
    * Add/Update MicroCredential List
    * Event Logs for LowBalance, NewEducator, NumMicroCredentialsSubmitted, NumInReview, NumApproved, NumDenied
      * Also, show a grid for MicroCredentialsSubmitted with TeacherName, date submitted - Grouped by Micro Credential Name

## Top-Level Organization Adds Micro-Credentials
  * ETS representative visits a web page that allows them to interact with the contract.
  * Because they are the owner, they will see the functions to:
    * Add a micro-credential
    * View a list of micro-credentials
    * Archive a micro-credential
  * ETS representative clicks 'ADD A MICROCREDENTIAL' and they are prompted to input:
    * A title  ("Classroom Managment for High School")
    * A code ("CLM-09-12")
    * Clicking submit will call the addMicroCredential() ownerOnly() public function
  * The EST representative may archive any micro-credential by clicking the title and then clicking 'archive' which will call the OnlyOwner() archiveMicroCredential

## ETS Administrator Approves a Micro-Credentaisl
  * Details to come

## ETS Administrator Denies a Micro-Credentaisl
  * Details to come

## ETS Administrator Updates the Contract Info (address, name, fee,)
  * Details to come

## Teacher/End User Registers an Account
  * Teacher visits ETS website and follows link to the Micro-Credentail-Review center.
  * Teacher clicks 'Register' and is prompted for their:
    * Name, school district affiliation (optional), home address, phone, email, jobtitle, grade.  This will call UpsertEducator().  We probably need 
      some security on this.
    * The teacher is then directed to the "Educator Dashboard" (See next use case)

## Teacher Browses Their "Educator Dashboard"

  * Teacher visits ETS website and follows link to the Micro-Credentail-Review center.
    * We almost have to assume they are using MetaMask.  I have no other way of knowing how we identify the user unless the wallet is part of the browser.  Might need to study this a little more.  I really don't want to build a User Management system for this app (where they log in).  Perhaps this is a phone app?
  * The Teacher is smart enough to be using MetaMask, so the page already knows who is logged in and shows the teacher the following info:
    * Add new Credential button
    * Some kind of panel/grid shows:
      * Their current list of 'in-progress' micro-credentails which has a 'delete' button.
      * Their current list of 'under-review' micro-credentails (no delete option).
      * Their current list of 'approved' micro-credentials with a link to a badge/certficate.
    * Note: We'll have to loop through an enormous array.  That, or we will have to have a mapping that will retain a list of each teachers individual micro-credentialID, that will be used to retrieve a credential from a mapping() object)
    * Note:  I wouldn't expect a teacher to have more than 100 micro-credentials.  Most will probably have 10-20

## Teacher Submits Micro-Credential
  * See "Teacher Browses Their Account" use case
  * After the teacher clicks the "Add New Micro-Credential" button, the are prompted for:
    * Pick a micro-credential (call getMicroCredentaisl())
    * Upload the micro-credentail file 
      * This is a standardized XML-formatted file.  The teacher won't need to know XML.  Their in-district micro-credentail application system will likely provide them with this 'micro-credentail' file.
    * After clicking Submit, the addMicroCredentail() function will be called which will set the MicroCredentails stats = 'In Progress' and will upload the XML 
    file to the content/file repo.
    * Somewhere in here, we have to collect the fee (in Pirl)

## Teacher Deletes an 'in-progress' Request
  * See "Teacher Browses Their Account" use case
  * Teacher clicks the delete button.
  * Teacher is prompted with an "Are You Sure" 
  * Upon clicking 'delete', the page will call the deleteMicroCredential which will set the status to 'deleted' and will refund the teacher's Pirl.

## Teacher Updates Account Info
  * Details to come




