var stickies = (function () {
    var initStickies = function initStickies() {
        $("<div />", {
            text: "+",
            "class": "add-sticky",
            click: function () { createSticky(); }
        })
        .prependTo(document.body)
        initStickies = null;
    },
    initStickiesgreen = function initStickiesgreen() {
        $("<div />", {
            text: "+",
            "class": "add-sticky1",
            click: function () { createSticky1(); }
        })
        .prependTo(document.body)
        initStickies = null;
    },
        openStickies = function openStickies() {
            initStickies && initStickies();
            initStickiesgreen && initStickiesgreen();
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.indexOf("yellow") >= 0) {
                    createSticky1(JSON.parse(localStorage.getItem(key)));
                }
                else
                {
                    createSticky(JSON.parse(localStorage.getItem(key)));
                }
            }
        },
        createSticky1 = function createSticky1(data) {
            data = data || { id: +new Date(), top: "40px", left: "40px", text: "Note Here" }

            return $("<div />", {
                "class": "sticky1",
                'id': data.id
            })
                .prepend($("<div />", { "class": "sticky-header" })
                    .append($("<span />", {
                        "class": "status-sticky",
                        click: saveSticky
                    }))
                    .append($("<span />", {
                        "class": "close-sticky",
                        text: "trash",
                        click: function () { deleteSticky($(this).parents(".sticky1").attr("id")); }
                    }))
                )
                .append($("<div />", {
                    html: data.text,
                    contentEditable: true,
                    "class": "sticky-content",
                    keypress: markUnsaved
                }))
            .draggable({
                handle: "div.sticky-header",
                stack: ".sticky",
                start: markUnsaved,
                stop: saveSticky
            })
            .css({
                position: "absolute",
                "top": data.top,
                "left": data.left
            })
            .focusout(saveSticky)
            .appendTo(document.body);
        },
        createSticky = function createSticky(data) {
            data = data || { id: +new Date(), top: "40px", left: "40px", text: "Note Here" }

            return $("<div />", {
                "class": "sticky",
                'id': data.id
            })
                .prepend($("<div />", { "class": "sticky-header" })
                    .append($("<span />", {
                        "class": "status-sticky",
                        click: saveSticky
                    }))
                    .append($("<span />", {
                        "class": "close-sticky",
                        text: "trash",
                        click: function () { deleteSticky($(this).parents(".sticky").attr("id")); }
                    }))
                )
                .append($("<div />", {
                    html: data.text,
                    contentEditable: true,
                    "class": "sticky-content",
                    keypress: markUnsaved
                }))
            .draggable({
                handle: "div.sticky-header",
                stack: ".sticky",
                start: markUnsaved,
                stop: saveSticky
            })
            .css({
                position: "absolute",
                "top": data.top,
                "left": data.left
            })
            .focusout(saveSticky)
            .appendTo(document.body);
        },
        deleteSticky = function deleteSticky(id) {
            localStorage.removeItem("sticky-" + id);
            $("#" + id).fadeOut(200, function () { $(this).remove(); });
        },
        saveSticky = function saveSticky() {
            var that = $(this), sticky = (that.hasClass("sticky-status") || that.hasClass("sticky-content")) ? that.parents('div.sticky') : that,
            obj = {
                id: sticky.attr("id"),
                top: sticky.css("top"),
                left: sticky.css("left"),
                text: sticky.children(".sticky-content").html()
            }
            localStorage.setItem("sticky-yellow-" + obj.id, JSON.stringify(obj));
            sticky.find(".sticky-status").text("saved");
        },
        saveSticky1 = function saveSticky1() {
            var that = $(this), sticky = (that.hasClass("sticky-status") || that.hasClass("sticky-content")) ? that.parents('div.sticky1') : that,
            obj = {
                id: sticky.attr("id"),
                top: sticky.css("top"),
                left: sticky.css("left"),
                text: sticky.children(".sticky-content").html()
            }
            localStorage.setItem("sticky-green-" + obj.id, JSON.stringify(obj));
            sticky.find(".sticky-status").text("saved");
        },
        markUnsaved = function markUnsaved() {
            var that = $(this), sticky = that.hasClass("sticky-content") ? that.parents("div.sticky") : that;
            sticky.find(".sticky-status").text("unsaved");
        }

    return {
        open: openStickies,
        init: initStickies
    };
}());