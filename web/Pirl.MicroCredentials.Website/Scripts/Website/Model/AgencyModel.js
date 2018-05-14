/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyModel = (function (ko) {
    "use strict";

    function agency(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.name = ko.observable(data.name);
        self.contactFirstName = ko.observable(data.contactFirstName);
        self.contactLastName = ko.observable(data.contactLastName);

        self.id.contactFullName = ko.computed(function () {
            return self.contactLastName() + ", " + self.contactFirstName();
        });

        self.updateModel = function (updateData) {
            self.id(updateData.id);
            self.name(data.name);
            self.contactFirstName(data.contactFirstName);
            self.contactLastName(data.contactLastName);
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