/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.registrationViewModel = (function (agencyModel, userModel, commonApi, ko) {
    "use strict";

    //Varibles
    var registerFormModel = ko.observable(),
        success = ko.observable(undefined),
        error = ko.observable(undefined);

    //Public Functions
    function processAgencyRegistration() {
        var formVaild = commonApi.validateForm("#AgencyRegistrationForm");

        if (formVaild) {

        }
    }

    function processUserRegistration() {
        var formVaild = commonApi.validateForm("#UserRegistrationForm");

        if (formVaild) {

        }
    }

    return {
        registerFormModel: registerFormModel,
        success: success,
        error: error,
        processRegistration: processRegistration
    };
}(MICROCREDENTIALS.agencyModel, MICROCREDENTIALS.userModel, MICROCREDENTIALS.commonApi, ko));