/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.credentialModel = (function (ko) {
    "use strict";

    function credential(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.name = ko.observable(data.name);
        self.url = ko.observable(data.url);
        self.isActive = ko.observable(data.isActive);
        self.fee = ko.observable(data.fee);
        self.agencyId = ko.observable(data.agencyId);

        self.updateModel = function (updateData) {
            self.id(updateData.id);
            self.name(updateData.name);
            self.url(updateData.url);
            self.isActive(updateData.isActive);
            self.fee(updateData.fee);
            self.agencyId(updateData.agencyId);
        };

        self.toJson = function () {
            return ko.toJSON(self);
        };

        return self;
    }

    return {
        Credential: credential
    };
}(ko));