/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.fileApi = (function (commonApi, ko) {
    "use strict";

    //Private Routes
    function getBaseUrl() {
        return "/Api/FileApi";
    }

    function getFileUrl(id) {
        return getBaseUrl() + "/" + id;
    }

    //Api Methods
    function retrieveFile(id) {
        return commonApi.ajaxRequest("get", getFileUrl(id));
    }

    //Expose Api Methods
    return {
        retrieveFile: retrieveFile
    };
}(MICROCREDENTIALS.commonApi, ko));