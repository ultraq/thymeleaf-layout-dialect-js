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

import {getThymeleafAttributeValue,
        replaceElement}             from '../utilities/Dom.js';

const DIALECT_PREFIX = 'layout';
const PROCESSOR_NAME = 'fragment';

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
		let fragmentName = getThymeleafAttributeValue(fragmentEl, DIALECT_PREFIX, PROCESSOR_NAME);

		let matchingFragment = fragments[fragmentName];
		if (matchingFragment) {
			replaceElement(fragmentEl, matchingFragment);
		}
	}
}

FragmentProcessor.PROCESSOR_NAME = PROCESSOR_NAME;

export default FragmentProcessor;
