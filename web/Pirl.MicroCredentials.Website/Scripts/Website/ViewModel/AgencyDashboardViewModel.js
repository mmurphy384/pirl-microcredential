/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyDashboardViewModel = (function (agencyModel, agencyApi, microCredentialContract, commonApi, ko) {
    "use strict";

    //Varibles
    var agencyFormModel = ko.observable(new agencyModel.Agency()),
        agencyModalFormModel = ko.observable(new agencyModel.Agency()),
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

    function retrieveAgency() {
        return agencyApi.retrieveAgency(metaMaskAddress())
            .done(function (returnData) {
                agencyFormModel().updateModel(returnData);
            });
    }

    function editAgency() {
        retrieveAgency()
            .done(function (returnData) {
                agencyModalFormModel().updateModel(returnData);

                commonApi.showModal("#agencyModal");
            });
    }

    function saveAgency() {
        var formVaild = commonApi.validateForm("#agencyDialogForm");

        if (formVaild) {
            var agency = agencyModalFormModel();
            var agencyContract = web3.eth.contract(microCredentialContract.microCredentialContractAbi).at(microCredentialContract.microCredentialContractAddress);

            agencyContract.updateAgencyInfo.estimateGas(agency.agencyName(), agency.website(), agency.firstName(), agency.lastName(), agency.email(),
                function (errorMessage, result) {
                    if (!errorMessage) {
                        agencyContract.updateAgencyInfo(agency.agencyName(), agency.website(), agency.firstName(), agency.lastName(), agency.email(),
                            function (errorMessage, result) {
                                if (!errorMessage) {
                                    retrieveAgency()
                                        .done(function() {
                                            commonApi.hideModal("#agencyModal");

                                            successTitle("Update Agency");
                                            success("Agency successfully updated.");
                                        })
                                } else {
                                    popupError("There was an error updating your agency, please confirm that your accepted the MetaMask transaction and had enough PIRL to cover the transaction fees.");
                                }
                            });
                    } else {
                        popupError("There was an error updating your agency, please confirm your logged into MetaMask with your account.");
                    }
                });
        }
    }

    return {
        metaMaskAddress: metaMaskAddress,
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        agencyFormModel: agencyFormModel,
        agencyModalFormModel: agencyModalFormModel,
        success: success,
        successTitle: successTitle,
        error: error,
        errorTitle: errorTitle,
        popupError: popupError,
        retrieveAgency: retrieveAgency,
        editAgency: editAgency,
        saveAgency: saveAgency
    };
}(MICROCREDENTIALS.agencyModel, MICROCREDENTIALS.agencyApi, MICROCREDENTIALS.microCredentialContract, MICROCREDENTIALS.commonApi, ko));