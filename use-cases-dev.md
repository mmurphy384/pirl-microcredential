# User-Cases for Developers


# Pre-Requisites
  * A user has installed and configured Metamask and has pointed it to the Pirl network.



# 1. Create an Agency Account
  * Agency Admin visits our web page.
  * Agency Admin is presented with a choice to CREATE AGENCY or CREATE USER ACCOUNT or LOGIN
  * Agency Admin click CREATE AGENCY.
  * Agency Admin inputs Agency Name, Agency WebSite, FirstName, LastName, Email and clicks SUBMIT
  * This calls _instance.registerAgency(agencyname, website, firstName, lastName, email, {from:MetaMaskAddress});
  * If successful, it redirects the user to the Agency Dashboard page.
  * It then calls _instance.getAgencyIdByAddress(MetaMaskAddress)'
  * It sets a session cookie with AgencyId = AgencyId
  * If successful, the Agency Admin is sent to the Agency Dashboard page (Step 2).

# 2. Agency Dashboard Page Load
  * The Agency Admin has either "logged in" or has just created an agency.
  * As this page loads, it always calls:
    * _instance.getAgencyInfoByAddress(MetaMaskAddress)
    * _instance.getAgencyIdByAddress(MetaMaskAddress)
    * Note:  I can't see a reason to store these as session variables.  We'll juse reload them eachtime on every "internal" page load.
  * This page shows the Agency Admin features to add credentails, review new credentials, review creentials under-review.

# 3. Agency User returns to use the site
  * Agency Admin visits our web page.
  * Agency Admin is presented with a choice to CREATE AGENCY or CREATE USER ACCOUNT or LOGIN
  * Agency Admin clicks LOGIN
  * This calls _instance.getAgencyIdByAddress(MetaMaskAddress)
  * If successful, the Agency Admin is redirected to the Agency Dashboard Page (Step 2)

# 4. End User Creates an Account
  * End User visits our web page.
  * End User is presented with a choice to CREATE AGENCY or CREATE USER ACCOUNT or LOGIN
  * End User click CREATE USER ACCOUNT.
  * End User inputs FirstName, LastName, Email and clicks SUBMIT
  * This calls _instance.addUser(firstName, lastName, email, {from:MetaMaskAddress});
  * If successful, it redirects the user to the User Dashboard page (Step 5)

# 5. End User Dashboard Page Load
  * The End User has either "logged in" or has just created an account.
  * As this page loads, it always calls:
    * _instance.getUserByAddress(MetaMaskAddress)
    * _instance.getIdByAddress(MetaMaskAddress)
    * Note:  I can't see a reason to store these as session variables.  We'll juse reload them eachtime on every "internal" page load.
  * The page loads and shows feature to pick an agency, browse credential requirements, upload files, submit a micro-credential.