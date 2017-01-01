
Thymeleaf Layout Dialect JS
===========================

[![Build Status](https://travis-ci.org/ultraq/thymeleaf-layout-dialect-js.svg?branch=master)](https://travis-ci.org/ultraq/thymeleaf-layout-dialect-js)
[![GitHub Release](https://img.shields.io/github/release/ultraq/thymeleaf-layout-dialect-js.svg?maxAge=3600)](https://github.com/ultraq/thymeleaf-layout-dialect-js/releases/latest)
[![License](https://img.shields.io/github/license/ultraq/thymeleaf-layout-dialect-js.svg?maxAge=2592000)](https://github.com/ultraq/thymeleaf-layout-dialect-js/blob/master/LICENSE.txt)

In-browser version of the [Thymeleaf Layout Dialect](https://github.com/ultraq/thymeleaf-layout-dialect),
used for static prototyping.

**STILL UNDER DEVELOPMENT**


Installation
------------

A browser that supports the [fetch API](http://caniuse.com/#feat=fetch) is
currently required.  Future versions may be bundled with the necessary polyfills
for those browsers that don't support it.

Many front-end development projects these days use a mock server for rapid
development of static assets, eg: webpack dev server, or Express.js.  This
project currently works using those mock servers as it gets around many of the
security restrictions on local file access, which this script needs to be able
to fetch your layout templates.  This may change in future.

(download from Bower instructions here)

With those in place, add the following script line somewhere in your template,
preferably the `<head>` section:

```html
<script src="thymeleaf-layout-dialect/thymeleaf-layout-dialect.js" th:remove="all"></script>
```

The `th:remove` directive is there so that when your template is processed for
real by your app server, Thymeleaf will remove this line.
