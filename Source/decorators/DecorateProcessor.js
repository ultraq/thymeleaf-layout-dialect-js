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
import {getThymeleafAttributeValue} from '../utilities/Dom.js';
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
	 * @return {Promise} A promise that is fulfilled once the layout template has
	 *   been applied.
	 */
	process(context, htmlEl) {

		return new Promise(function(resolve, reject) {

			// Find the layout template
			let layoutTemplateExpression = getThymeleafAttributeValue(htmlEl,
				DIALECT_PREFIX, PROCESSOR_NAME);
			if (!layoutTemplateExpression) {
				console.warn('No layout:decorate or data-layout-decorate attribute found on the <html> element');
				resolve();
			}
			let layoutTemplateMatch = layoutTemplateExpression.match(FRAGMENT_EXPRESSION);
			let layoutTemplateName = layoutTemplateMatch[1];

			// Retrieve the layout template, decorating it with the current template
			fetchHtmlAsDom(layoutTemplateName)
				.then(function(layoutTemplate) {

					// Get all the fragments of the current template
					context.fragments = new FragmentFinder().findFragments(htmlEl);

					// Replace the current template with the layout template.  Uses
					// document.write since that lets scripts in the new <head> section
					// get executed.
					// TODO: Using document.write seems to mess with the history on
					//       Firefox, such that reloading doesn't get this script re-run
					document.open('text/html', 'replace');
					document.write(layoutTemplate.firstElementChild.outerHTML);
					document.close();

					document.addEventListener('DOMContentLoaded', resolve);
				})
				.catch(function(error) {
					console.warn(`Unable to retrieve layout at ${error.response.url}`);
					resolve();
				});
		});
	}
}

DecorateProcessor.PROCESSOR_NAME = PROCESSOR_NAME;

export default DecorateProcessor;
