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
define(function() {
	'use strict';

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

	var DecoratorProcessor = {
		name: 'decorator',
		precedence: 0,

		/**
		 * Locates the decorator page specified by the layout attribute and applies
		 * it to the current page being processed.
		 * 
		 * @param element
		 * @param attribute
		 * @param thymolAttribute
		 * @returns {boolean} `true` since this modifies the document structure.
		 */
		process: function(element, attribute, thymolAttribute) {

			// Locate the decorator page
			var decoratorName = element.getAttribute(attribute.name);

			// Load the document from the filesystem
			$.get(decoratorName)
				.done(function(data) {
					console.log('Layout found');
				})
				.fail(function(data) {
					console.log('Unable to load ' + decoratorName + ' from the file system');
				});
		}
	};
	return DecoratorProcessor;
});
