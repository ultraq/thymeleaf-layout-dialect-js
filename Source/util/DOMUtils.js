/*
 * Copyright 2016, Emanuel Rabina (http://www.ultraq.net.nz/)
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
 * A collection of DOM functions that make life a little bit easier.
 * 
 * @author Emanuel Rabina
 */

//const XML_ATTRIBUTE_TEMPLATE = '${prefix}:${name}';
//const DATA_ATTRIBUTE_TEMPLATE = 'data-${prefix}-${name}';

/**
 * Takes a template string and returns a format string function to fill out the
 * template string.
 * 
 * @param {String} template
 * @param {Array} keys
 * @return {Function} A format string function.
 */
function format(template, ...keys) {
	return function(...values) {
		var result = template[0];
		keys.forEach((key, index) => {
			result.push(values[key], template[index + 1]);
		});
		return result.join('');
	};
}

/**
 * Returns the value of a Thymeleaf attribute processor.  Checks for both the
 * XML and data attribute variants.
 * 
 * @param {HTMLElement} element
 * @param {String} prefix
 * @param {String} name
 * @return {String} Value of a matching Thymeleaf attribute, or `null` if no
 *   attribute with that prefix and name exists.
 */
export function getThymeleafAttributeValue(element, prefix, name) {

	return element.getAttribute(format`${0}:${1}`(prefix, name)) ||
	       element.getAttribute(format`data-${0}-${1}`(prefix, name));
}
