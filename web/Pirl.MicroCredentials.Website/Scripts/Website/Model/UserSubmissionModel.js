/*global ko*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.userSubmissionModel = (function (ko) {
    "use strict";

    function userSubmission(data) {
        var self = this;
        data = data || {};

        self.id = ko.observable(data.id);
        self.userId = ko.observable(data.userId);
        self.agencyId = ko.observable(data.agencyId);
        self.credentialId = ko.observable(data.credentialId);
        self.fileIds = ko.observable(data.fileIds);
        self.status = ko.observable(data.status);

        self.updateModel = function(updateData) {
            self.id(updateData.id);
            self.userId(updateData.userId);
            self.agencyId(updateData.agencyId);
            self.credentialId(updateData.credentialId);
            self.fileIds(updateData.fileIds);
            self.status(updateData.status);
        };

        self.toJson = function () {
            return ko.toJSON(self);
        };

        return self;
    }

    return {
        UserSubmission: userSubmission
    };
}(ko));