"use strict";
var observable = require("data/observable");
var utils = require("utils/utils");
var navigator = require("../../common/navigator");
var page;
function rootGridLoaded(args) {
    var grid = args.object;
    if (grid.android) {
        var compat = android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}
exports.rootGridLoaded = rootGridLoaded;
// TODO: This should be in "pageNavigatingTo" but that method is defined in the Page base class
function pageNavigatingTo(args) {
    page = args.object;
    page.bindingContext = new observable.Observable({
        selectedIndex: 0
    });
    selectedIndexChanged(null);
}
exports.pageNavigatingTo = pageNavigatingTo;
function goBack(args) {
    navigator.navigateBackFromExample();
}
exports.goBack = goBack;
function selectedIndexChanged(args) {
    if (page !== undefined) {
        var tabView = page.getViewById("tabView");
        var index = tabView.selectedIndex;
        var names = ["btn-red", "btn-yellow", "btn-blue", "btn-lightblue", "btn-lightgreen"];
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            var view = page.getViewById("" + index + name_1);
            if (view !== undefined) {
                view.className = name_1;
                view.className = name_1 + "-animated";
            }
        }
    }
}
exports.selectedIndexChanged = selectedIndexChanged;
function buttonTap(args) {
    var button = args.object;
    var className = button.className.replace("-animated", "").replace("2", "");
    button.className = className;
    button.className = className + "-animated2";
}
exports.buttonTap = buttonTap;
