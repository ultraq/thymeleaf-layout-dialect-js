/* 
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

	var ATTRIBUTE_LAYOUT_DECORATOR = 'layout:decorator';
	var TEMPLATE_PREFIX = '';
	var TEMPLATE_SUFFIX = '.html';

	/**
	 * Recursive search for an element, returning when the test in the given
	 * function passes.
	 *
	 * @param element
	 * @param test
	 */
	function findElement(element, test) {

		if (test(element)) {
			return element;
		}
		for (var i = 0; i < element.children().length; i++) {
			var result = findElement(element.children[i], test);
			if (result) {
				return;
			}
		}
		return null;
	}

	var decorator = {

		/**
		 * Performs decoration of the document.
		 * 
		 * @param document
		 */
		decorate: function(document) {

			// Look for the layout:decorator attribute
			var decoratorElement = findElement(document.documentElement, function(element) {
				return element.hasAttribute(ATTRIBUTE_LAYOUT_DECORATOR);
			});
			if (decoratorElement) {
				var decoratorName = decoratorElement.getAttribute(ATTRIBUTE_LAYOUT_DECORATOR);

				// Load the document from the filesystem
				jquery.ajax(decoratorName, { dataType: 'html' })
					.done(function(data) {
						console.log('Layout found');
					})
					.fail(function(data) {
						console.log('Unable to load ' + decoratorElement + ' from the file system');
					});
			}
		}
	};

	/**
	 * Run the decorator when the document has been loaded.
	 */
	domready(function() {
		decorator.decorate(document);
	});

	return decorator;
});
