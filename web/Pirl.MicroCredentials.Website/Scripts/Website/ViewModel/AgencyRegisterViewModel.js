/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyRegisterViewModel = (function (agencyModel, commonApi, ko) {
    "use strict";

    //Varibles
    var registerFormModel = ko.observable(new agencyModel.Agency()),
        success = ko.observable(undefined),
        error = ko.observable(undefined),
        metaMaskInstalled = ko.observable(false);

    //Public Functions
    function metaMaskActive() {
        metaMaskInstalled(true);
    }

    function processRegistration() {
        var formVaild = commonApi.validateForm("#AgencyRegistrationForm");
        
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
}(MICROCREDENTIALS.agencyModel, MICROCREDENTIALS.commonApi, ko));