/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userApi = (function (commonApi, ko) {
    "use strict";

    //Private Routes
    function getBaseUrl() {
        return "/Api/UserApi";
    }

    function getUserUrl(address) {
        return getBaseUrl() + "/" + address;
    }

    //Api Methods
    function retrieveUsers() {
        return commonApi.ajaxRequest("get", getBaseUrl());
    }

    function retrieveUser(address) {
        return commonApi.ajaxRequest("get", getUserUrl(address));
    }

    //Expose Api Methods
    return {
        retrieveUsers: retrieveUsers,
        retrieveUser: retrieveUser
    };
}(MICROCREDENTIALS.commonApi, ko));