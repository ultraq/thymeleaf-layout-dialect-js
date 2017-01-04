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

import {getThymeleafAttributeValue,
        replaceElement}             from '../../Source/utilities/Dom.js';

import {$,$$}   from 'dumb-query-selector';
import {assert} from 'chai';
import h        from 'hyperscript';
import hh       from 'hyperscript-helpers';

const {div, section} = hh(h);

/**
 * Tests for the DOM utilities package.
 * 
 * @author Emanuel Rabina
 */
/* global describe, afterEach, it */
describe('Dom utilities', function() {

	const testSandbox = $('#test-sandbox');
	afterEach(function() {
		while (testSandbox.firstChild) {
			testSandbox.removeChild(testSandbox.firstChild);
		}
	});


	describe('#getThymeleafAttributeValue', function() {

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


	describe('#replaceElement', function() {

		it('Replace the element type', function() {
			let testFragmentTarget = div();
			testSandbox.appendChild(testFragmentTarget);
			let testFragmentSource = section();

			replaceElement(testFragmentTarget, testFragmentSource);

			assert.strictEqual(testSandbox.firstElementChild.tagName, testFragmentSource.tagName);
		});

		it('Replace the element attributes', function() {
			let testFragmentTarget = div('#div-element');
			testSandbox.appendChild(testFragmentTarget);
			let testFragmentSource = div('#section-element');

			replaceElement(testFragmentTarget, testFragmentSource);

			assert.strictEqual(testSandbox.firstElementChild.getAttribute('id'), testFragmentSource.getAttribute('id'));
		});

		it('Replace only the specified element', function() {
			testSandbox.appendChild(div('#child1'));
			testSandbox.appendChild(div('#child2'));
			let testFragmentSource = div('#child3');

			replaceElement($('#child1'), testFragmentSource);

			let children = $$('#test-sandbox > div');
			assert.strictEqual(children.length, 2);
		});
	});
});
