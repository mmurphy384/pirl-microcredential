/*global document, jQuery, window*/

var MICROCREDENTIALS = this.MICROCREDENTIALS || {};

MICROCREDENTIALS.document = document;
MICROCREDENTIALS.window = window;

MICROCREDENTIALS.commonApi = (function ($) {
    "use strict";
    var api = {};

    //Public Members
    function ajaxRequest(type, url, data) {
        var options = {
            dataType: "json",
            contentType: "application/json",
            cache: true,
            type: type,
            data: data
        };

        return $.ajax(url, options);
    }

    function uploadAjaxRequest(url, data) {
        return $.upload(url, data);
    }

    function redirect(url) {
        MICROCREDENTIALS.document.location.href = url;
    }

    function reload() {
        MICROCREDENTIALS.document.location.reload(true);
    }

    function open(url, target, title) {
        MICROCREDENTIALS.window.open(url, target, title);
    }

    function showModal(element, focus) {
        $(element).modal('show');

        if (focus !== undefined) {
            $(element).on('shown.bs.modal', function () {
                $(focus).focus();
            });
        }
    }

    function hideModal(element) {
        $(element).modal('hide');
    }

    function formHasValidator(element) {
        var validator = $(element).data("validator");

        return validator !== undefined;
    }

    function formValidatorIsActive(element) {
        var validator = $(element).data("validator");

        return validator !== undefined && $(element).validate().settings.ignore !== "*";
    }

    function suspendFormValidation(element) {
        if (api.formHasValidator(element)) {
            $(element).validate().settings.ignore = "*";
        }
    }

    function validateForm(element) {
        $.validator.unobtrusive.parse($(element));
        $(element).validateBootstrap();

        if (api.formHasValidator(element)) {
            $(element).validate().settings.ignore = null;
        }

        return $(element).valid();
    }

    function attachDatePicker(element, multiDateEnabled) {
        var multiDateSelection = multiDateEnabled || false;

        $(element).datepicker({
            multidate: multiDateSelection,
            format: "yyyy-mm-dd"
        });
    }

    function getValue(element) {
        return $(element).val();
    }

    function setValue(element, value) {
        return $(element).val(value);
    }

    //Expose Api Methods
    api = {
        ajaxRequest: ajaxRequest,
        uploadAjaxRequest: uploadAjaxRequest,
        redirect: redirect,
        reload: reload,
        open: open,
        showModal: showModal,
        hideModal: hideModal,
        formHasValidator: formHasValidator,
        formValidatorIsActive: formValidatorIsActive,
        suspendFormValidation: suspendFormValidation,
        validateForm: validateForm,
        attachDatePicker: attachDatePicker,
        getValue: getValue,
        setValue: setValue
    };

    return api;
}(jQuery));