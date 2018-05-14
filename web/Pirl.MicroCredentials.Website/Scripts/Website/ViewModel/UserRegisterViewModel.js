/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userRegisterViewModel = (function (userModel, commonApi, ko) {
    "use strict";

    //Varibles
    var registerFormModel = ko.observable(new userModel.User()),
        success = ko.observable(undefined),
        error = ko.observable(undefined),
        metaMaskInstalled = ko.observable(false);

    //Public Functions
    function metaMaskActive() {
        metaMaskInstalled(true);
    }

    function processRegistration() {
        var formVaild = commonApi.validateForm("#UserRegistrationForm");

        if (formVaild) {
            alert("Call Contract");
        }
    }

    return {
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        registerFormModel: registerFormModel,
        success: success,
        error: error,
        processRegistration: processRegistration
    };
}(MICROCREDENTIALS.userModel, MICROCREDENTIALS.commonApi, ko));