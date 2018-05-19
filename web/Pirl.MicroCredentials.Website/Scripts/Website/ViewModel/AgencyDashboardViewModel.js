/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyDashboardViewModel = (function (agencyModel, agencyApi, microCredentialContract, commonApi, ko) {
    "use strict";

    //Varibles
    var agencyFormModel = ko.observable(new agencyModel.Agency()),
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

    function retrieveAgency() {
        return agencyApi.retrieveAgency(metaMaskAddress())
            .done(function (returnData) {
                agencyFormModel().updateModel(returnData);
            });
    }

    return {
        metaMaskAddress: metaMaskAddress,
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        agencyFormModel: agencyFormModel,
        success: success,
        error: error,
        errorTitle: errorTitle,
        retrieveAgency: retrieveAgency
    };
}(MICROCREDENTIALS.agencyModel, MICROCREDENTIALS.agencyApi, MICROCREDENTIALS.microCredentialContract, MICROCREDENTIALS.commonApi, ko));