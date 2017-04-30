
Thymeleaf Layout Dialect JS
===========================

[![Build Status](https://travis-ci.org/ultraq/thymeleaf-layout-dialect-js.svg?branch=master)](https://travis-ci.org/ultraq/thymeleaf-layout-dialect-js)
[![Coverage Status](https://coveralls.io/repos/github/ultraq/thymeleaf-layout-dialect-js/badge.svg?branch=master)](https://coveralls.io/github/ultraq/thymeleaf-layout-dialect-js?branch=master)
[![Bower](https://img.shields.io/bower/v/thymeleaf-layout-dialect.svg?maxAge=3600)](http://bower.io/search/?q=thymeleaf-layout-dialect)
[![GitHub Release](https://img.shields.io/github/release/ultraq/thymeleaf-layout-dialect-js.svg?maxAge=3600)](https://github.com/ultraq/thymeleaf-layout-dialect-js/releases/latest)
[![License](https://img.shields.io/github/license/ultraq/thymeleaf-layout-dialect-js.svg?maxAge=2592000)](https://github.com/ultraq/thymeleaf-layout-dialect-js/blob/master/LICENSE.txt)

In-browser version of the [Thymeleaf Layout Dialect](https://github.com/ultraq/thymeleaf-layout-dialect),
used for static prototyping.


Installation
------------

A browser that supports the [fetch API](http://caniuse.com/#feat=fetch) and a
large chunk of [the ES6 spec](https://kangax.github.io/compat-table/es6/) is
currently required.

Many front-end development projects these days use a mock server for rapid
development of static assets, eg: webpack dev server, or Express.js.  This
project currently works using those mock servers as you can't retrieve other
resources (ie: your layout templates) using the `file://` protocol.

### Bower

This project is available via Bower and can be installed with the following
command from a directory within your own project:

```
bower install thymeleaf-layout-dialect --save-dev
```

### Usage

With those in place, add the following script line somewhere in your template,
preferably the `<head>` section:

```html
<script src="(path-to-thymeleaf-layout-dialect-js)/thymeleaf-layout-dialect.js" th:remove="all"></script>
```

The `th:remove` directive is there so that when your template is processed for
real by your app server, Thymeleaf will remove this line.
