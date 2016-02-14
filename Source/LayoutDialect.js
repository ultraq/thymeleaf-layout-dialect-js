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

import * as DOMUtils from './util/DOMUtils';

/**
 * Main script for kicking-off the layout dialect.
 * 
 * @author Emanuel Rabina
 */

// Start by running the decorator processor
var rootEl = document.firstElementChild;
var decorator = DOMUtils.getThymeleafAttributeValue(rootEl, 'layout', 'decorator');
