/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userSubmissionApi = (function (commonApi, ko) {
    "use strict";

    //Private Routes
    function getBaseUrl() {
        return "/Api/UserSubmissionApi";
    }

    function getUserSubmissionUrl(id) {
        return getBaseUrl() + "/" + id;
    }

    //Api Methods
    function retrieveUserSubmission(id) {
        return commonApi.ajaxRequest("get", getUserSubmissionUrl(id));
    }

    //Expose Api Methods
    return {
        retrieveUserSubmission: retrieveUserSubmission
    };
}(MICROCREDENTIALS.commonApi, ko));