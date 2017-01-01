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

import DecorateProcessor from './decorators/DecorateProcessor.js';
import FragmentProcessor from './fragments/FragmentProcessor.js';

import {$$} from 'dumb-query-selector';

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
			let selector = `[${DIALECT_PREFIX}\\:${FragmentProcessor.PROCESSOR_NAME}],
	                [data-${DIALECT_PREFIX}-${FragmentProcessor.PROCESSOR_NAME}]`;
			let fragmentsToProcess = $$(selector);
			fragmentsToProcess.forEach(fragmentToProcess => {
				new FragmentProcessor().process(context, fragmentToProcess);
			})
		});
});
