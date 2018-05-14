/*global jQuery, ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.homeViewModel = (function (commonApi, ko) {
    "use strict";

    //Varibles
    var metaMaskInstalled = ko.observable(false);

    //Public Functions
    function metaMaskActive() {
        metaMaskInstalled (true);
    }

    function routeToAgencyRegister() {
        commonApi.redirect("/Home/AgencyRegister");
    }

    function routeToUserRegister() {
        commonApi.redirect("/Home/UserRegister");
    }

    return {
        metaMaskInstalled: metaMaskInstalled,
        metaMaskActive: metaMaskActive,
        routeToAgencyRegister: routeToAgencyRegister,
        routeToUserRegister: routeToUserRegister
    };
}(MICROCREDENTIALS.commonApi, ko));