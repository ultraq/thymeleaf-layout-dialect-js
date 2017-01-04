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

import {getThymeleafAttributeValue} from '../../Source/utilities/Dom.js';

import {$}      from 'dumb-query-selector';
import {assert} from 'chai';

/**
 * Tests for the DOM utilities package.
 * 
 * @author Emanuel Rabina
 */
/* global describe, afterEach, it */
describe('Dom utilities', function() {

	describe('#getThymeleafAttributeValue', function() {
		const testSandbox = $('#test-sandbox');
		afterEach(function() {
			testSandbox.innerHTML = '';
		});

		it('Get value of a "prefix:processor" attribute', function() {
			let testFragmentName = 'test-xmlns';
			testSandbox.innerHTML = `<div id="test-fragment" layout:fragment="${testFragmentName}"></div>`;
			let testFragment = $('#test-fragment');

			let fragmentValue = getThymeleafAttributeValue(testFragment, 'layout', 'fragment');
			assert.strictEqual(fragmentValue, testFragmentName);
		});

		it('Get value of a "data-prefix-processor" attribute', function() {
			let testFragmentName = 'test-data';
			testSandbox.innerHTML = `<div id="test-fragment" data-layout-fragment="${testFragmentName}"></div>`;
			let testFragment = $('#test-fragment');

			let fragmentValue = getThymeleafAttributeValue(testFragment, 'layout', 'fragment');
			assert.strictEqual(fragmentValue, testFragmentName);
		});
	});
});
