'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VueHtmlClassController = function () {
    function VueHtmlClassController() {
        _classCallCheck(this, VueHtmlClassController);
    }

    _createClass(VueHtmlClassController, [{
        key: 'init',
        value: function init(router) {
            this.htmlClass = document.documentElement.className;
            this.router = router;
        }
    }, {
        key: 'parseMatched',
        value: function parseMatched(matchedArray) {

            var matched = [];

            for (var index in matchedArray) {

                var prev = matched.join('/');

                matched.push(matchedArray[index].path.replace(/^\/|\/$/g, '').replace(prev, '').replace(/^\/|\/$/g, ''));
            }

            return matched;
        }
    }, {
        key: 'findMatchInRoutesByPath',
        value: function findMatchInRoutesByPath(routes, matchedItem) {

            return routes.find(function (o) {

                return o.path.replace(/^\/|\/$/g, '') == matchedItem;
            });
        }
    }, {
        key: 'getClassForRoute',
        value: function getClassForRoute(route) {

            return route.meta ? route.meta.htmlClass : null;
        }
    }, {
        key: 'updateClassFromRoute',
        value: function updateClassFromRoute(className, route) {

            var routeClass = this.getClassForRoute(route);

            if (routeClass) {

                var routeHtmlClass = routeClass.replace(/^!/, '');

                if (routeClass.indexOf('!') === 0) {

                    className = " " + routeHtmlClass;
                } else {

                    className += " " + routeHtmlClass;
                }
            }

            return className;
        }
    }, {
        key: 'router',
        set: function set(router) {
            var _this = this;

            router.beforeEach(function (to, from, next) {

                var parent = router.options.routes;
                var matched = _this.parseMatched(to.matched);
                var additionalClassName = "";

                //is a home page?
                if (to.path == '/') {

                    additionalClassName = _this.updateClassFromRoute(additionalClassName, to);
                }
                //not homepage
                else if (matched.length > 0) {

                        for (var index in matched) {

                            var routes = parent.children ? parent.children : parent;
                            var found = _this.findMatchInRoutesByPath(routes, matched[index]);

                            if (found) {

                                parent = found;
                                additionalClassName = _this.updateClassFromRoute(additionalClassName, found);
                            }
                        }
                    }

                document.documentElement.className = (_this.htmlClass + additionalClassName).trim();

                next();
            });
        }
    }]);

    return VueHtmlClassController;
}();

var VueHtmlClass = new VueHtmlClassController();

VueHtmlClass.install = function (Vue, router) {

    VueHtmlClass.init(router);
};

exports.default = VueHtmlClass;