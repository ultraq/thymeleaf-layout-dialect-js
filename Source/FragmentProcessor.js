/* 
 * Copyright 2014, Emanuel Rabina (http://www.ultraq.net.nz/)
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
 * The fragment processor, used to mark areas for replacement or for passing
 * along, in templates.
 * 
 * @author Emanuel Rabina
 */
define(['thymol'], function(thymol) {
	'use strict';

	var FragmentProcessor = {
		name: 'fragment',

		/**
		 * Includes or replaces the content of fragments into the corresponding
		 * fragment placeholder.
		 *
		 * @param element
		 * @param attribute
		 * @param thymolAttribute
		 * @returns {boolean} `true` if a matching fragment was found and inserted
		 *                    in its place.
		 */
		process: function(element, attribute, thymolAttribute) {
		}
	};
	return FragmentProcessor;
});
