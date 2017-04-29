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

import extend from 'extend';

/**
 * A collection of object utilities.
 * 
 * @author Emanuel Rabina
 */

/**
 * Wraps the `extend` module with the deep cloning on as default.
 * 
 * @param {Object} target
 * @param {Object} source
 * @return {Object} The modified `target` object.
 */
export function merge(target, ...source) {

	return extend.apply(null, [true, target].concat(source));
}
