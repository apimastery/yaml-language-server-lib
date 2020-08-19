"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const path = require("path");
const testHelper_1 = require("./utils/testHelper");
const assert = require("assert");
const serviceSetup_1 = require("./utils/serviceSetup");
/**
 * Setup the schema we are going to use with the language settings
 */
const uri = testHelper_1.toFsPath(path.join(__dirname, './fixtures/customMultipleSchemaSequences.json'));
const fileMatch = ['*.yml', '*.yaml'];
const languageSettingsSetup = new serviceSetup_1.ServiceSetup()
    .withHover()
    .withValidate()
    .withSchemaFileMatch({ uri, fileMatch: fileMatch })
    .withCustomTags(['!Test', '!Ref sequence']);
// Defines a Mocha test suite to group tests of similar kind together
suite('Multiple Documents Validation Tests', () => {
    // Tests for validator
    describe('Multiple Documents Validation', function () {
        function validatorSetup(content) {
            const testTextDocument = testHelper_1.setupTextDocument(content);
            const languageService = testHelper_1.configureLanguageService(languageSettingsSetup.languageSettings);
            return languageService.doValidation(testTextDocument, false);
        }
        function hoverSetup(content, position) {
            const testTextDocument = testHelper_1.setupTextDocument(content);
            const languageService = testHelper_1.configureLanguageService(languageSettingsSetup.languageSettings);
            return languageService.doHover(testTextDocument, testTextDocument.positionAt(position));
        }
        it('Should validate multiple documents', (done) => {
            const content = `
name: jack
age: 22
---
cwd: test
            `;
            const validator = validatorSetup(content);
            validator
                .then((result) => {
                assert.equal(result.length, 0);
            })
                .then(done, done);
        });
        it('Should find errors in both documents', (done) => {
            const content = `name1: jack
age: asd
---
cwd: False`;
            const validator = validatorSetup(content);
            validator
                .then(function (result) {
                assert.equal(result.length, 3);
            })
                .then(done, done);
        });
        it('Should find errors in first document', (done) => {
            const content = `name: jack
age: age
---
cwd: test`;
            const validator = validatorSetup(content);
            validator
                .then(function (result) {
                assert.equal(result.length, 1);
            })
                .then(done, done);
        });
        it('Should find errors in second document', (done) => {
            const content = `name: jack
age: 22
---
cwd: False
`;
            const validator = validatorSetup(content);
            validator
                .then(function (result) {
                assert.equal(result.length, 1);
            })
                .then(done, done);
        });
        it('Should hover in first document', (done) => {
            const content = 'name: jack\nage: 22\n---\ncwd: False';
            const hover = hoverSetup(content, 1 + content.indexOf('age'));
            hover
                .then(function (result) {
                assert.notEqual(result.contents.length, 0);
                assert.equal(result.contents[0], 'The age of this person');
            })
                .then(done, done);
        });
    });
});
//# sourceMappingURL=mulipleDocuments.test.js.map