class VueHtmlClassController {

    init(router) {
        this.htmlClass = document.documentElement.className;
        this.router    = router;
    }

    set router(router)  {

        router.beforeEach((to, from, next) => {

            var parent              = router.options.routes;
            var matched             = this.parseMatched(to.matched);
            var additionalClassName = "";

            //is a home page?
            if(to.path == '/') {

                additionalClassName = this.updateClassFromRoute(additionalClassName, to);

            }
            //not homepage
            else if (matched.length > 0) {

                for (let index in matched) {

                    let routes = parent.children ? parent.children : parent;
                    let found = this.findMatchInRoutesByPath(routes, matched[index]);

                    if (found) {

                        parent = found;
                        additionalClassName = this.updateClassFromRoute(additionalClassName, found);

                    }

                }

            }

            document.documentElement.className = (this.htmlClass + additionalClassName).trim();

            next();

        })

    }

    parseMatched(matchedArray) {

        var matched = [];

        for (let index in matchedArray) {

            let prev = matched.join('/');

            matched.push(

                matchedArray[index].path
                    .replace(/^\/|\/$/g, '')
                    .replace(prev, '')
                    .replace(/^\/|\/$/g, '')

            );

        }

        return matched;

    }

    findMatchInRoutesByPath(routes, matchedItem) {

        return routes.find((o)=> {

            return o.path.replace(/^\/|\/$/g, '') == matchedItem;

        });

    }

    getClassForRoute(route) {

        return route.meta ? route.meta.htmlClass : null;

    }

    updateClassFromRoute(className, route) {

        var routeClass = this.getClassForRoute(route);

        if (routeClass) {

            let routeHtmlClass = routeClass.replace(/^!/, '');

            if (routeClass.indexOf('!') === 0) {

                className = " " + routeHtmlClass;

            }
            else {

                className += " " + routeHtmlClass;

            }

        }

        return className;

    }

}

let VueHtmlClass = new VueHtmlClassController()

VueHtmlClass.install = (Vue, router) => {

    VueHtmlClass.init(router);

}

export default VueHtmlClass;
