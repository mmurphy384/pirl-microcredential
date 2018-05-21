/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userDashboardViewModel = (function (userModel, userApi, userContract, commonApi, ko) {
    "use strict";

    //Varibles
    var userFormModel = ko.observable(new userModel.User()),
        success = ko.observable(undefined),
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

    return {
        metaMaskAddress: metaMaskAddress,
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        userFormModel: userFormModel,
        success: success,
        error: error,
        errorTitle: errorTitle,
        retrieveUser: retrieveUser
    };
}(MICROCREDENTIALS.userModel, MICROCREDENTIALS.userApi, MICROCREDENTIALS.userContract, MICROCREDENTIALS.commonApi, ko));