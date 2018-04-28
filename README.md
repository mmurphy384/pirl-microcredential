# pirl-microcredential

## Background Information
In short, a Micro Crenential is a small "certificate" (or badge) that is awarded to an employee, class participant, project participant after they have demonstrated mastery of a specific skill. Those recipients can then showcase their badges on their resume, social media profiles, etc.  This concept is a useful smart-contract application because it facilitates the process by which a person can submit an application to a qualified agent (perhaps a "best practice" authority) and receive approval.  The blockchain provides publicly accessible and transparant access to the microcredential and underlying support files.  Once approved, it can't be removed. The application is often comprised of PDF files, images and other data that makes it very well suited for Pirl's content and file storage capabilities.

To understand the concept, consider the following example.  If we examine how teachers are rated in the typical student education system (primary and secondary education), we might create tool that facilitate the following use case:

A school district might create a micro-credential specification for "Classroom Management" that would require the teacher to:
* Attend 2 particular professional development classes.
* Submit a picture diagram to document any changes they made to their classroom environment.
* Obtain a peer review/classroom observation from a fellow teacher.
* Write a summary of how the changes impacted behavior in the classroom.

The teacher would complete these items and submit them for approval, within the district.  The district would review/award the teacher the micro-credential for use and display within the district.

The glaring problem in all of this is that every district creates their own standards for what it means to obtain the "Classroom Management" micro credential.  The "Classroom Management" micro credential is of very little value to the teacher, outside of their home district.  It would be great if they could receive an endorsement/approval from a qualified agency that would give their micro credential more merit.

Fortunately, there are certain agencies within the student education market that espouse themselves as the best-practice authority on certain subjects.  For example, a Teacher's Union might release their own best-practice standards for "Classroom Management".  A teacher may wish to submit their district-approved Micro Credential to one of these agencies for a more pertinent review/endorsement.  If approved, the teacher will have a link to a publically accessible badge or a certificate that will acknowledge the completion of the micro-credential.

Fortunately, there is a specification that outlines how these micro-credentials are organized.  A simple XML file is used to define the requirements for the micro-credential.  In a simplified manner, this might look like:

```xml
<root>
  <title>Classroom Management</title>
  <requirements>
    <blah>Blah</blah>
  </requirements>
  <evidence>
    <blah>Some file</blah>
  </evidence>
  <educator>
    <firstname>Joe</firstname>
    <blah>Blah</blah>
  </educator>
</root>
```

This smart contract will be instantiated and owned by the authorizing agent (The "Teachers Union" in our example).  Teachers will register their account with the contract and submit one or more micro-credential requests.  The authorizing agency will then review the work to see how well it aligns to their best-practice specifications.  Once approved, the user will have a link to a badge that they can share with anyone in the world.


## Proposed Contract Files
TO BE COMPLETED


## Milestones / Timeline
* Re-Learn Solidity Development
* Create/understand development environment
* Create skeleton structure of contract and library files
* Build Contract Instantiation
* Build Test Suite for the core owner features (update name, address, contact info, deposit Pirl, withdraw Pirl)
* Build Test Suite for the other owner configuration features (add credential, edit credential)
* Build Test Sutie for end-user features (add account, edit account)
* Build Test Suite for Micro Credential Submission process (submit credential, upload file, delete file)
* More to come

## Team
  * @CableGod - Developer
  * @kurret - Developer
  * @mmurphy384 - Developer / Product Manager
    * I'm a well-aged developer that has gotten through the cynical phase.  I'm a better product manager than a developer, so I'll probably stick to that role as we navigate through this project.  I spent most of my career in legacy technologies, but have dabbled in enough of the new stuff to talk a good game.  I live in the US in Severna Park, Maryland.  It's about a 30 minute drive to Washington DC.  I'm GMT - 4.
