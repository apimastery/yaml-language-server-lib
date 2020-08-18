"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * List of error messages
 */
/**
 * Type Errors
 */
exports.StringTypeError = 'Incorrect type. Expected "string".';
exports.NumberTypeError = 'Incorrect type. Expected "number".';
exports.BooleanTypeError = 'Incorrect type. Expected "boolean".';
exports.ArrayTypeError = 'Incorrect type. Expected "array".';
exports.ObjectTypeError = 'Incorrect type. Expected "object".';
/**
 * Parse errors
 */
exports.BlockMappingEntryError = 'can not read a block mapping entry; a multiline key may not be an implicit key';
exports.ColonMissingError = 'can not read an implicit mapping pair; a colon is missed';
/**
 * Value Errors
 */
exports.IncludeWithoutValueError = '!include without value';
/**
 * Duplicate Key error
 */
exports.DuplicateKeyError = 'duplicate key';
//# sourceMappingURL=errorMessages.js.map