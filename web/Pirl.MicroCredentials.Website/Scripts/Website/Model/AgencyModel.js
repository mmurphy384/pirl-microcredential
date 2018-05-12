/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.agencyModel = (function (ko) {
    "use strict";

    function agency(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.name = ko.observable(data.name);
        self.contactFirstName = ko.observable(data.firstName);
        self.contactlastName = ko.observable(data.lastName);

        self.id.contactFullName = ko.computed(function () {
            return self.contactlastName() + ", " + self.contactFirstName();
        });

        self.updateModel = function (updateData) {
            self.id(updateData.id);
            self.name(data.name);
            self.contactFirstName(data.contactFirstName);
            self.contactlastName(data.contactlastName);
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