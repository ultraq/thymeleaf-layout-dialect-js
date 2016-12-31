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

import {getThymeleafAttributeValue} from '../utilities/Dom.js';
import {fetchHtmlAsDom}             from '../utilities/Fetch.js';

import {$$} from 'dumb-query-selector';

const FRAGMENT_EXPRESSION = /~\{(.+)\}/;

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
	 * @param {Object} context
	 * @param {Document} document
	 */
	process(context, document) {

		// Find the layout template
		let htmlEl = document.firstElementChild;
		let layoutTemplateExpression = getThymeleafAttributeValue(htmlEl, 'layout', 'decorate');
		if (!layoutTemplateExpression) {
			console.warn('No layout:decorate or data-layout-decorate attribute found on the <html> element');
			return;
		}
		let layoutTemplateMatch = layoutTemplateExpression.match(FRAGMENT_EXPRESSION);
		let layoutTemplateName = layoutTemplateMatch[1];
		console.log(`Layout template: ${layoutTemplateName}`);

		// Retrieve the layout template
		fetchHtmlAsDom(layoutTemplateName)

			// Decorate the template
			.then(function(layoutTemplate) {

				// Get all the fragments of the current template
				let fragments = $$('[layout\\:fragment], [data-layout-fragment]', document);
				context.fragments = fragments;

				// Replace the current template with the layout template
				while (document.firstChild) {
					document.removeChild(document.firstChild);
				}
				document.appendChild(layoutTemplate.firstElementChild);
			})

			// Report error
			.catch(function(error) {
				console.warn(`Unable to fetch layout template at ${error.response.url}`);
			});
	}
}
