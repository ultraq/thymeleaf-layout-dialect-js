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

import FragmentFinder               from '../fragments/FragmentFinder.js';
import {getThymeleafAttributeValue,
        replaceElement}             from '../utilities/Dom.js';
import {fetchHtmlAsDom}             from '../utilities/Fetch.js';

const DIALECT_PREFIX = 'layout';
const PROCESSOR_NAME = 'decorate';

const FRAGMENT_EXPRESSION = /~\{(.+)\}/;

/**
 * Emulates what `DecorateProcessor.groovy` does, but for a prototyping
 * environment.
 * 
 * @author Emanuel Rabina
 */
class DecorateProcessor {

	/**
	 * Locates the template to decorate and replaces the current document with it.
	 * 
	 * @param {Object} context
	 * @param {Element} htmlEl
	 * @return {Promise} A promise that is fulfilled once a 
	 */
	process(context, htmlEl) {

		// Find the layout template
		let layoutTemplateExpression = getThymeleafAttributeValue(htmlEl,
			DIALECT_PREFIX, PROCESSOR_NAME);
		if (!layoutTemplateExpression) {
			console.warn('No layout:decorate or data-layout-decorate attribute found on the <html> element');
			return;
		}
		let layoutTemplateMatch = layoutTemplateExpression.match(FRAGMENT_EXPRESSION);
		let layoutTemplateName = layoutTemplateMatch[1];
		console.log(`Layout template: ${layoutTemplateName}`);

		// Retrieve the layout template, decorating it with the current template
		return fetchHtmlAsDom(layoutTemplateName)
			.then(function(layoutTemplate) {

				// Get all the fragments of the current template
				context.fragments = new FragmentFinder().findFragments(htmlEl);

				// Replace the current template with the layout template
				replaceElement(htmlEl, layoutTemplate.firstElementChild);
			});
	}
}

DecorateProcessor.PROCESSOR_NAME = PROCESSOR_NAME;

export default DecorateProcessor;
