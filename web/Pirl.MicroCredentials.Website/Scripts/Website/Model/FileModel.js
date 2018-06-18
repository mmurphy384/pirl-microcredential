/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.fileModel = (function (ko) {
    "use strict";

    function file(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.name = ko.observable(data.name);
        self.url = ko.observable(data.url);
        self.pirlFileHash = ko.observable(data.pirlFileHash);
        self.isActive = ko.observable(data.isActive);
        self.userId = ko.observable(data.userId);
        self.userSubmissionId = ko.observable(data.userSubmissionId);
        self.agencyId = ko.observable(data.agencyId);

        self.updateModel = function (updateData) {
            self.id(updateData.id);
            self.name(updateData.name);
            self.url(updateData.url);
            self.pirlFileHash(updateData.pirlFileHash);
            self.isActive(updateData.isActive);
            self.userId(updateData.userId);
            self.userSubmissionId(updateData.userSubmissionId);
            self.agencyId(updateData.agencyId);
        };

        self.toJson = function () {
            return ko.toJSON(self);
        };

        return self;
    }

    return {
        File: file
    };
}(ko));