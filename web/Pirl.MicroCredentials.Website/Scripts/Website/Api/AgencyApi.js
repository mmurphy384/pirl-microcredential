/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyApi = (function (commonApi, ko) {
    "use strict";

    //Private Routes
    function getBaseUrl() {
        return "/Api/AgencyApi";
    }

    function getAgencyUrl(address) {
        return getBaseUrl() + "/" + address;
    }

    //Api Methods
    function retrieveAgencies() {
        return commonApi.ajaxRequest("get", getBaseUrl());
    }

    function retrieveAgency(address) {
        return commonApi.ajaxRequest("get", getAgencyUrl(address));
    }

    //Expose Api Methods
    return {
        retrieveAgencies: retrieveAgencies,
        retrieveAgency: retrieveAgency
    };
}(MICROCREDENTIALS.commonApi, ko));