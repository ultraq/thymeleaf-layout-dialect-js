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

/**
 * Returns the value of a Thymeleaf attribute processor.  Checks for both the
 * XML and data attribute variants.
 * 
 * @param {Element} element
 * @param {String} prefix
 * @param {String} name
 * @return {String} Value of a matching Thymeleaf attribute, or `null` if no
 *   attribute with that prefix and name exists.
 */
export function getThymeleafAttributeValue(element, prefix, name) {

	return element.getAttribute(`${prefix}:${name}`) ||
	       element.getAttribute(`data-${prefix}-${name}`);
}

/**
 * Replaces one element with another.
 * 
 * @param {Element} target Element to replace.
 * @param {Element} source Element to replace `target` with.
 */
export function replaceElement(target, source) {

	let parent = target.parentNode;
	parent.insertBefore(source, target);
	parent.removeChild(target);
}
