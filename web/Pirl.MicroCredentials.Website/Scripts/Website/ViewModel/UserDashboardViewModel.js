/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userDashboardViewModel = (function (userModel, userApi, userContract, commonApi, ko) {
    "use strict";

    //Varibles
    var userFormModel = ko.observable(new userModel.User()),
        success = ko.observable(undefined),
        successTitle = ko.observable(undefined),
        error = ko.observable(undefined),
        errorTitle = ko.observable(undefined),
        metaMaskAddress = ko.observable(undefined),
        metaMaskInstalled = ko.observable(false);

    //Public Functions
    function metaMaskActive(address) {
        metaMaskAddress(address);
        metaMaskInstalled(true);
    }

    function retrieveUser() {
        return userApi.retrieveUser(metaMaskAddress())
            .done(function (returnData) {
                userFormModel().updateModel(returnData);
            });
    }

    function editUser() {
        return userApi.retrieveUser(metaMaskAddress())
            .done(function (returnData) {
                userFormModel().updateModel(returnData);

                commonApi.showModal("#userModal");
            });
    }

    function saveUser() {
        var formVaild = commonApi.validateForm("#userDialogForm");

        if (formVaild) {
            isRegistering(true);

            var user = userFormModel();
            var endUserContract = web3.eth.contract(userContract.userContractAbi).at(userContract.userContractAddress);

            endUserContract.updateUser.estimateGas(user.firstName(), user.lastName(), user.email(),
                function (errorMessage, result) {
                    if (!errorMessage) {
                        endUserContract.updateUser(user.firstName(), user.lastName(), user.email(),
                            function (errorMessage, result) {
                                if (!errorMessage) {
                                    successTitle("Update User");
                                    success("User successfully updated.");
                                } else {
                                    errorTitle("Error Updating User");
                                    error("There was an error updating your user, please confirm that your accepted the MetaMask transaction and had enough PIRL to cover the transaction fees.");
                                }
                            });
                    } else {
                        errorTitle("Error Updating User");
                        error("There was an error updating your user, please confirm your logged into MetaMask with your account.");
                    }
                });
        }
    }

    return {
        metaMaskAddress: metaMaskAddress,
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        userFormModel: userFormModel,
        success: success,
        error: error,
        errorTitle: errorTitle,
        retrieveUser: retrieveUser,
        editUser: editUser,
        saveUser: saveUser
    };
}(MICROCREDENTIALS.userModel, MICROCREDENTIALS.userApi, MICROCREDENTIALS.userContract, MICROCREDENTIALS.commonApi, ko));