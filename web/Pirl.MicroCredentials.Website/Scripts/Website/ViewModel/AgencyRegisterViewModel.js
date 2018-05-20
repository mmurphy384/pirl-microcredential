/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyRegisterViewModel = (function (agencyModel, microCredentialContract, commonApi, ko) {
    "use strict";

    //Varibles
    var registerFormModel = ko.observable(new agencyModel.Agency()),
        success = ko.observable(undefined),
        error = ko.observable(undefined),
        errorTitle = ko.observable(undefined),
        metaMaskInstalled = ko.observable(false),
        metaMaskAddress = ko.observable(undefined),
        isRegistering = ko.observable(false),
        registrationSuccessful = ko.observable(false);

    //Public Functions
    function metaMaskActive(address) {
        metaMaskAddress(address);
        metaMaskInstalled(true);
    }

    function processRegistration() {
        var formVaild = commonApi.validateForm("#AgencyRegistrationForm");
        
        if (formVaild) {
            isRegistering(true);

            var agency = registerFormModel();
            var agencyContract = web3.eth.contract(microCredentialContract.microCredentialContractAbi).at(microCredentialContract.microCredentialContractAddress);

            agencyContract.registerAgency.estimateGas(agency.agencyName(), agency.website(), agency.firstName(), agency.lastName(), agency.email(),
                function (errorMessage, result) {
                    if (!errorMessage) {
                        agencyContract.registerAgency(agency.agencyName(), agency.website(), agency.firstName(),agency.lastName(), agency.email(),
                            function (errorMessage, result) {
                                if (!errorMessage) {
                                    registrationSuccessful(true);
                                } else {
                                    errorTitle("Error Registering Agency");
                                    error("There was an error registering your agency. Please confirm that your accepted the MetaMask transaction and had enough PIRL to cover the transaction fees.");

                                    isRegistering(false);
                                }
                            });
                    } else {
                        errorTitle("Error Registering Agency");
                        error("There was an error registering your agency. Please confirm your logged into MetaMask with your account.");

                        isRegistering(false);
                    }
                });
        }
    }

    function routeToDashboard() {
        commonApi.redirect("/Home/AgencyDashboard");
    }

    return {
        metaMaskAddress: metaMaskAddress,
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        registerFormModel: registerFormModel,
        success: success,
        error: error,
        errorTitle: errorTitle,
        processRegistration: processRegistration,
        isRegistering: isRegistering,
        registrationSuccessful: registrationSuccessful,
        routeToDashboard: routeToDashboard
    };
}(MICROCREDENTIALS.agencyModel, MICROCREDENTIALS.microCredentialContract, MICROCREDENTIALS.commonApi, ko));