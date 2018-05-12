ko.extenders.numeric = function (target, precision) {
    var result = ko.dependentObservable({
        read: function () {
            if (target() != undefined && target() != null && target() != '') {
                var numericNumber = parseFloat(target()).toFixed(precision);
                var decimalIndex = numericNumber.indexOf(".");
                for (var i = numericNumber.length - 1; i > 2 + decimalIndex; i--) {
                    if (numericNumber.charAt(i) === "0") {
                        numericNumber = numericNumber.substr(0, i);
                    } else {
                        break;
                    }
                }

                return numericNumber;
            } else if (target() === 0) {
                return "0.00";
            } else {
                return null;
            }
        },
        write: target
    });

    result.raw = target;
    return result;
};