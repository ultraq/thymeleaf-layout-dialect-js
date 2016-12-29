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

import {merge} from './Objects.js';

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
export function fetchHtml(url, config = {}) {

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
export function fetchHtmlAsDom(url, config = {}) {

	return fetchHtml(url, config)
		.then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));
}
