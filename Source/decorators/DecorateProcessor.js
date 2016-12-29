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

import {getThymeleafAttributeValue} from '../models/Utilities.js';

/**
 * Emulates what `DecorateProcessor.groovy` does, but for a prototyping
 * environment.
 * 
 * @author Emanuel Rabina
 */
export default class DecorateProcessor {

	/**
	 * Locates the template to decorate and replaces the current document with it.
	 * 
	 * @param {Element} element
	 */
	process(element) {

		const FRAGMENT_EXPRESSION = /~\{(.+)\}/;

		// Find the layout template
		let layoutTemplateExpression = getThymeleafAttributeValue(element, 'layout', 'decorate');
		let layoutTemplateMatch = layoutTemplateExpression.match(FRAGMENT_EXPRESSION);
		let layoutTemplateName = layoutTemplateMatch[1];

		console.log(`Layout template: ${layoutTemplateName}`); // eslint-disable-line no-console

		// Retrieve the 

	}
}
