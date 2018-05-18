/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyModel = (function (ko) {
    "use strict";

    function agency(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.agencyName = ko.observable(data.agencyName);
        self.firstName = ko.observable(data.firstName);
        self.lastName = ko.observable(data.lastName);
        self.email = ko.observable(data.email);
        self.website = ko.observable(data.website);

        self.id.contactFullName = ko.computed(function () {
            return self.lastName() + ", " + self.firstName();
        });

        self.updateModel = function (updateData) {
            self.id(updateData.id);
            self.agencyName(data.agencyName);
            self.firstName(data.firstName);
            self.lastName(data.lastName);
            self.email(data.email);
            self.website(data.website);
        };

        self.toJson = function () {
            return ko.toJSON(self);
        };

        return self;
    }

    return {
        Agency: agency
    };
}(ko));