/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userDashboardViewModel = (function (userModel, userApi, userContract, commonApi, ko) {
    "use strict";

    //Varibles
    var userFormModel = ko.observable(new userModel.User()),
        userModalFormModel = ko.observable(new userModel.User()),
        success = ko.observable(undefined),
        successTitle = ko.observable(undefined),
        error = ko.observable(undefined),
        errorTitle = ko.observable(undefined),
        popupError = ko.observable(undefined),
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
        retrieveUser()
            .done(function (returnData) {
                userModalFormModel().updateModel(returnData);

                commonApi.showModal("#userModal");
            });
    }

    function saveUser() {
        var formVaild = commonApi.validateForm("#userDialogForm");

        if (formVaild) {
            var user = userModalFormModel();
            var endUserContract = web3.eth.contract(userContract.userContractAbi).at(userContract.userContractAddress);

            endUserContract.updateUser.estimateGas(user.firstName(), user.lastName(), user.email(),
                function (errorMessage, result) {
                    if (!errorMessage) {
                        endUserContract.updateUser(user.firstName(), user.lastName(), user.email(),
                            function (errorMessage, result) {
                                if (!errorMessage) {
                                    retrieveUser()
                                        .done(function() {
                                            commonApi.hideModal("#userModal");

                                            successTitle("Update User");
                                            success("User successfully updated.");
                                        })
                                } else {
                                    popupError("There was an error updating your user, please confirm that your accepted the MetaMask transaction and had enough PIRL to cover the transaction fees.");
                                }
                            });
                    } else {
                        popupError("There was an error updating your user, please confirm your logged into MetaMask with your account.");
                    }
                });
        }
    }

    return {
        metaMaskAddress: metaMaskAddress,
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        userFormModel: userFormModel,
        userModalFormModel: userModalFormModel,
        success: success,
        successTitle: successTitle,
        error: error,
        errorTitle: errorTitle,
        popupError: popupError,
        retrieveUser: retrieveUser,
        editUser: editUser,
        saveUser: saveUser
    };
}(MICROCREDENTIALS.userModel, MICROCREDENTIALS.userApi, MICROCREDENTIALS.userContract, MICROCREDENTIALS.commonApi, ko));