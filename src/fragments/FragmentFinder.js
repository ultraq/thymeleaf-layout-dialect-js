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

import FragmentProcessor            from './FragmentProcessor.js';
import {getThymeleafAttributeValue} from '../utilities/Dom.js';

import {$$} from 'dumb-query-selector';

const DIALECT_PREFIX = 'layout';

/**
 * Searches for and returns layout dialect fragements within a given element.
 * 
 * @author Emanuel Rabina
 */
export default class FragmentFinder {

	/**
	 * Find and return elements that are layout dialect fragments within the given
	 * element.
	 * 
	 * @param {Element} element
	 * @return {Object} A map of fragments, mapped by their name.
	 */
	findFragments(element) {

		let fragmentMap = {};
		let fragments = $$('[layout\\:fragment], [data-layout-fragment]', element);
		fragments.map(fragment => {
			let fragmentName = getThymeleafAttributeValue(fragment, DIALECT_PREFIX,
				FragmentProcessor.PROCESSOR_NAME);
			fragmentMap[fragmentName] = fragment;
		});
		return fragmentMap;
	}
}
