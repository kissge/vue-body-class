# vue-html-class

Forked (or more precisely, "modified just a tiny bit") from [nikolaynesov/vue-body-class](https://github.com/nikolaynesov/vue-body-class).
Apparently licensed under the ISC License.

Control your page html classes with vue-router easily:

+ add classes to parent and children routes
+ add classes for homepage (v.2)
+ overwrite classes defined in parent routes
+ dynamic routes support
+ written on top of ES6, yet is ES5 safe

## Dependencies
+ vue.js 2.x
+ vue-router 2.x

## Installation

`npm install vue-html-class --save`

## Get started

After the `router` instance was created with all the routes, use it with `Vue.use` global method to explicitly install the plugin. 

```js
import vbclass from 'vue-html-class'
Vue.use( vbclass, router )
```

##### If you are using `v.1`:
```js
import vbclass from 'vue-html-class'
Vue.use( vbclass, { router } )
```

### Set Up classes

Just add `htmlClass` to meta property of a route object in your `vue-router` routes.

```js
name: 'dashboard',
path: '/dashboard',
meta: { htmlClass: 'dashboard' },
...
```

##### For `v.1` use `htmlClass` right inside the route object:

```js
name: 'dashboard',
path: '/dashboard',
htmlClass: 'dashboard',
...
```

For child routes, all parent classes will be applied too.

```js
name: 'dashboard',
path: '/dashboard',
meta: { htmlClass: 'dashboard' },
component: dashboard,
children: [

    {
        name: 'dashboard.profile',
        path: 'profile',
        meta: { htmlClass: 'profile' },
        component: profile
    },
    
    ...

]
```

will result in 

```
class = 'dashboard profile'
```

You can overwrite parent classes by adding `!` at the beginning of the class:
```js
name: 'dashboard',
path: '/dashboard',
meta: { htmlClass: 'dashboard' },
component: dashboard,
children: [

    {
        name: 'dashboard.profile',
        path: 'profile',
        meta: { htmlClass: '!profile' },
        component: profile,
        children: [
        
            {
                name: 'dashboard.profile.personal',
                path: 'personal',
                meta: { htmlClass: 'personal' },
                component: personal
            },
            
            ...
        
        ]
    },
    
    ...

]
```
will result in 

```
class = 'profile personal'
```

as `!profile` overwrites `dashboard` class.

The plugin will save your original html classes and new classes will be appended.
