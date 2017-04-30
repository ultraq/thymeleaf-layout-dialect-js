(function () {
'use strict';

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
function getThymeleafAttributeValue(element, prefix, name) {

	return element.getAttribute(`${prefix}:${name}`) ||
	       element.getAttribute(`data-${prefix}-${name}`);
}

/**
 * Replaces one element with another.
 * 
 * @param {Element} target Element to replace.
 * @param {Element} source Element to replace `target` with.
 */
function replaceElement(target, source) {

	let parent = target.parentNode;
	parent.insertBefore(source, target);
	parent.removeChild(target);
}

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

const DIALECT_PREFIX$3 = 'layout';
const PROCESSOR_NAME$1 = 'fragment';

/**
 * The fragment processor, used to mark areas for replacement in templates.
 * 
 * @author Emanuel Rabina
 */
class FragmentProcessor {

	/**
	 * Replaces the contents of elements with fragments from surrounding
	 * directives such as the `decorate` or `insert`/`replace` processors.
	 * 
	 * @param {Object} context
	 * @param {Element} fragmentEl
	 */
	process(context, fragmentEl) {

		let {fragments} = context;
		if (fragments) {
			let fragmentName = getThymeleafAttributeValue(fragmentEl, DIALECT_PREFIX$3, PROCESSOR_NAME$1);
			let matchingFragment = fragments[fragmentName];
			if (matchingFragment) {
				replaceElement(fragmentEl, matchingFragment);
			}
		}
	}
}

FragmentProcessor.PROCESSOR_NAME = PROCESSOR_NAME$1;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var dumbQuerySelector = createCommonjsModule(function (module) {
/* 
 * Copyright 2017, Emanuel Rabina (http://www.ultraq.net.nz/)
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
(function(root, factory) {
	'use strict';

	// AMD
	if (typeof undefined === 'function' && undefined.amd) {
		undefined('dumb-query-selector', [], factory);
	}
	// CommonJS
	else if ('object' === 'object' && module.exports) {
		module.exports = factory();
	}
	// Global
	else {
		var dumbQuerySelector = factory();
		Object.keys(dumbQuerySelector).forEach(function(key) {
			root[key] = dumbQuerySelector[key];
		});
	}
})(commonjsGlobal, function() {
	'use strict';

	return {

		/**
		 * An element selector and shortcut for `(document/element).querySelector`.
		 * 
		 * @param {String} query
		 * @param {Node} [scope] The scope to limit the search to for non-ID queries.
		 *   Defaults to document scope.
		 * @return {Element} The matching element, or `null` if no match is found.
		 */
		$: function(query, scope) {
			return (scope || document).querySelector(query);
		},

		/**
		 * An element list selector, returning an array of elements because
		 * `NodeList`s are dumb.
		 * 
		 * @param {String} query
		 * @param {Node} [scope] The scope to limit the search to for non-ID queries.
		 *   Defaults to document scope.
		 * @return {Array} The list of matching elements.
		 */
		$$: function(query, scope) {
			return Array.prototype.slice.call((scope || document).querySelectorAll(query));
		}
	};
});
});

var dumbQuerySelector_2 = dumbQuerySelector.$$;

/* 
 * Copyright 2017, Emanuel Rabina (http://www.ultraq.net.nz/)
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

const DIALECT_PREFIX$2 = 'layout';

/**
 * Searches for and returns layout dialect fragements within a given element.
 * 
 * @author Emanuel Rabina
 */
class FragmentFinder {

	/**
	 * Find and return elements that are layout dialect fragments within the given
	 * element.
	 * 
	 * @param {Element} element
	 * @return {Object} A map of fragments, mapped by their name.
	 */
	findFragments(element) {

		let fragmentMap = {};
		let fragments = dumbQuerySelector_2('[layout\\:fragment], [data-layout-fragment]', element);
		fragments.map(fragment => {
			let fragmentName = getThymeleafAttributeValue(fragment, DIALECT_PREFIX$2,
				FragmentProcessor.PROCESSOR_NAME);
			fragmentMap[fragmentName] = fragment;
		});
		return fragmentMap;
	}
}

/**
 * Deep-merges all of the properties of the objects in `sources` with `target`,
 * modifying the target object and returning it.
 * 
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object} The modified target object.
 */
function merge(target = {}, ...sources) {

	sources.forEach(source => {
		Object.keys(source).forEach(key => {
			let targetValue = target[key];
			let sourceValue = source[key];
			target[key] = targetValue instanceof Object && sourceValue instanceof Object ?
				merge(targetValue, sourceValue) :
				sourceValue;
		});
	});
	return target;
}

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
 * Checks the status of the response for 200 - 300 which is OK.
 * 
 * @private
 * @param {Response} response
 * @return {Object} The response object or a new error object.
 */
function checkStatus(response) {

	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	else {
		let error = new Error(`${response.status} - ${response.statusText}`);
		error.response = response;
		throw error;
	}
}

/**
 * Fetches HTML (`text/html`) data from the given URL.
 * 
 * @param {String} url
 * @param {Object} [config={}]
 * @return {Promise} Promise of the fetched HTML data.
 */
function fetchHtml(url, config = {}) {

	return fetch(url, merge({
		headers: {
			'Accept': 'text/html'
		}
	}, config))
		.then(checkStatus)
		.then(response => response.text());
}

/**
 * Fetches HTML (`text/html`) data from the given URL, parsed and returned as a
 * separate DOM.
 * 
 * @param {String} url
 * @param {Object} [config={}]
 * @return {Promise} Promise of the fetched HTML data as a DOM.
 */
function fetchHtmlAsDom(url, config = {}) {

	return fetchHtml(url, config)
		.then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));
}

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

const DIALECT_PREFIX$1 = 'layout';
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
			let layoutTemplateExpression = getThymeleafAttributeValue(htmlEl, DIALECT_PREFIX$1, PROCESSOR_NAME);
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

const DIALECT_PREFIX = 'layout';

/**
 * Main script for kicking-off the layout dialect.
 * 
 * @author Emanuel Rabina
 */
document.addEventListener('DOMContentLoaded', function() {
	let context = {};

	new DecorateProcessor().process(context, document.documentElement)

		// Forced processing of layout:fragment elements
		.then(function() {
			let selector = `[${DIALECT_PREFIX}\\:${FragmentProcessor.PROCESSOR_NAME}], ` +
			               `[data-${DIALECT_PREFIX}-${FragmentProcessor.PROCESSOR_NAME}]`;
			let fragmentsToProcess = dumbQuerySelector_2(selector);
			fragmentsToProcess.forEach(fragmentToProcess => {
				new FragmentProcessor().process(context, fragmentToProcess);
			});
		});
});

}());
