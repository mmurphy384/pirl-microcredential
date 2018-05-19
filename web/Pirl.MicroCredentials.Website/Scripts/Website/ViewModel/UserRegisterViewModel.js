/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userRegisterViewModel = (function (userModel, userContract, commonApi, ko) {
    "use strict";

    //Varibles
    var registerFormModel = ko.observable(new userModel.User()),
        success = ko.observable(undefined),
        error = ko.observable(undefined),
        errorTitle = ko.observable(undefined),
        metaMaskAddress = ko.observable(undefined),
        metaMaskInstalled = ko.observable(false),
        isRegistering = ko.observable(false),
        registrationSuccessful = ko.observable(false);

    //Public Functions
    function metaMaskActive(address) {
        metaMaskAddress(address);
        metaMaskInstalled(true);
    }

    function processRegistration() {
        var formVaild = commonApi.validateForm("#UserRegistrationForm");

        if (formVaild) {
            isRegistering(true);

            var user = registerFormModel();
            var endUserContract = web3.eth.contract(userContract.userContractAbi).at(userContract.userContractAddress);

            endUserContract.addUser.estimateGas(user.firstName(), user.lastName(), user.email(),
                function (errorMessage, result) {
                    if (!errorMessage) {
                        endUserContract.addUser(user.firstName(), user.lastName(), user.email(),
                            function (errorMessage, result) {
                                if (!errorMessage) {
                                    registrationSuccessful(true);
                                } else {
                                    errorTitle("Error Registering User");
                                    error("There was an error registering, please confirm that your accepted the MetaMask transaction and had enough PIRL to cover the transaction fees.");

                                    isRegistering(false);
                                }
                            });
                    } else {
                        errorTitle("Error Registering User");
                        error("There was an error registering, please confirm your logged into MetaMask with your account.");

                        isRegistering(false);
                    }
                });
        }
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
        registrationSuccessful: registrationSuccessful
    };
}(MICROCREDENTIALS.userModel, MICROCREDENTIALS.userContract, MICROCREDENTIALS.commonApi, ko));