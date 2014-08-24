/**
 * Ternific Copyright (c) 2014 Miguel Castillo.
 *
 * Licensed under MIT
 */


define(function (require, exports, module) {
    "use strict";

    var AppInit         = brackets.getModule("utils/AppInit"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        CodeHintManager = brackets.getModule("editor/CodeHintManager");

    var Menu = require('Menu'),
        HintProvider = require('HintProvider'),
        TernManager  = require('TernManager'),
        TernificManager = require("views/controllers/ternific");

    // Load up string utils...
    require("string");

    ExtensionUtils.loadStyleSheet(module, "style/main.css");
    ExtensionUtils.loadStyleSheet(module, "views/styles/ternific.css");
    ExtensionUtils.loadStyleSheet(module, "libs/font-awesome/css/font-awesome.css");

    var _ternManager = new TernManager();
    _ternManager.onReady(function () {
        /*
         * Handle the activeEditorChange event fired by EditorManager.
         * Uninstalls the change listener on the previous editor
         * and installs a change listener on the new editor.
         *
         * @param {Event} event - editor change event (ignored)
         * @param {Editor} current - the new current editor context
         * @param {Editor} previous - the previous editor context
         */
        function handleActiveEditorChange(event, current, previous) {
            if (current) {
                _ternManager.registerDocument(current._codeMirror, current.document.file);
            }
        }

        $(EditorManager).on("activeEditorChange.ternific", handleActiveEditorChange);
        handleActiveEditorChange(null, EditorManager.getActiveEditor(), null);
        CodeHintManager.registerHintProvider(new HintProvider(_ternManager), ["javascript"], 1);
    });

    AppInit.appReady(function() {
        Menu.init();
    });

    AppInit.htmlReady(function () {
        TernificManager.init();
    });
});
