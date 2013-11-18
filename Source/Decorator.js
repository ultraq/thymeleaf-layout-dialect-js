/*!
 * Thymeleaf Layout Dialect JS v0.1.0
 * https://github.com/ultraq/thymeleaf-layout-dialect
 * 
 * Copyright 2013, Emanuel Rabina (http://www.ultraq.net.nz/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Emulates what DecoratorProcessor in the Layout Dialect does in Thymeleaf, for
 * a prototyping environment, ie: in-browser only.
 *
 * @author Emanuel Rabina
 */
define(['domready', 'jquery'], function(domready, jquery) {
	'use strict';

	var decorator = {

		/**
		 * Performs decoration of the current document.
		 */
		decorate: function() {

			alert('Hello!');
		}
	};

	/**
	 * Run the decorator.
	 */
	domready(function() {
		decorator.decorate();
	});

	return decorator;
});
