/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userApi = (function (commonApi, ko) {
    "use strict";

    //Private Routes
    function getBaseUrl() {
        return "/Api/UserApi";
    }

    function getUserUrl(id) {
        return getBaseUrl() + "/" + id;
    }

    //Api Methods
    function retrieveUsers() {
        return commonApi.ajaxRequest("get", getBaseUrl());
    }

    function retrieveUser(id) {
        return commonApi.ajaxRequest("get", getUserUrl(id));
    }

    //Expose Api Methods
    return {
        retrieveUsers: retrieveUsers,
        retrieveUser: retrieveUser
    };
}(MICROCREDENTIALS.commonApi, ko));