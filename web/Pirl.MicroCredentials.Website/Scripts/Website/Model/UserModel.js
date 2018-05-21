/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userModel = (function (ko) {
    "use strict";

    function user(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.firstName = ko.observable(data.firstName);
        self.lastName = ko.observable(data.lastName);
        self.email = ko.observable(data.email);

        self.id.fullName = ko.computed(function () {
            return self.lastName() + ", " + self.firstName();
        });

        self.updateModel = function(updateData) {
            self.id(updateData.id);
            self.firstName(updateData.firstName);
            self.lastName(updateData.lastName);
            self.email(updateData.email);
        };

        self.toJson = function () {
            return ko.toJSON(self);
        };

        return self;
    }

    return {
        User: user
    };
}(ko));