/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyApi = (function (commonApi, ko) {
    "use strict";

    //Private Routes
    function getBaseUrl() {
        return "/Api/AgencyApi";
    }

    function getAgencyUrl(id) {
        return getBaseUrl() + "/" + id;
    }

    //Api Methods
    function retrieveAgencies() {
        return commonApi.ajaxRequest("get", getBaseUrl());
    }

    function retrieveAgency(id) {
        return commonApi.ajaxRequest("get", getAgencyUrl(id));
    }

    //Expose Api Methods
    return {
        retrieveAgencies: retrieveAgencies,
        retrieveAgency: retrieveAgency
    };
}(MICROCREDENTIALS.commonApi, ko));