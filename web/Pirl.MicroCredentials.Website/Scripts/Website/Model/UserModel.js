﻿/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userModel = (function (ko) {
    "use strict";

    function user(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.firstName = ko.observable(data.firstName);
        self.lastName = ko.observable(data.lastName);

        self.id.fullName = ko.computed(function () {
            return self.lastName() + ", " + self.firstName();
        });

        self.updateModel = function(updateData) {
            self.id(updateData.id);
            self.firstName(data.firstName);
            self.lastName(data.lastName);
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