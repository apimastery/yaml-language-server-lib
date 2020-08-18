"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const testHelper_1 = require("./utils/testHelper");
const serviceSetup_1 = require("./utils/serviceSetup");
const verifyError_1 = require("./utils/verifyError");
const assert = require("assert");
const languageSettingsSetup = new serviceSetup_1.ServiceSetup().withValidate();
let languageService = testHelper_1.configureLanguageService(languageSettingsSetup.languageSettings);
// Defines a Mocha test suite to group tests of similar kind together
suite('Custom Tag tests Tests', () => {
    function parseSetup(content, customTags) {
        const testTextDocument = testHelper_1.setupTextDocument(content);
        languageSettingsSetup.languageSettings.customTags = customTags;
        languageService = testHelper_1.configureLanguageService(languageSettingsSetup.languageSettings);
        return languageService.doValidation(testTextDocument, false);
    }
    describe('Test that validation does not throw errors', function () {
        it('Custom Tags without type not specified', (done) => {
            const content = 'scalar_test: !Test test_example';
            const validator = parseSetup(content, ['!Test']);
            validator
                .then(function (result) {
                assert.equal(result.length, 0);
            })
                .then(done, done);
        });
        it('Custom Tags with one type', (done) => {
            const content = 'resolvers: !Ref\n  - test';
            const validator = parseSetup(content, ['!Ref sequence']);
            validator
                .then(function (result) {
                assert.equal(result.length, 0);
            })
                .then(done, done);
        });
        it('Custom Tags with multiple types', (done) => {
            const content = 'resolvers: !Ref\n  - test';
            const validator = parseSetup(content, ['!Ref sequence', '!Ref mapping', '!Ref scalar']);
            validator
                .then(function (result) {
                assert.equal(result.length, 0);
            })
                .then(done, done);
        });
        it('Allow multiple different custom tag types with different use', (done) => {
            const content = '!test\nhello: !test\n  world';
            const validator = parseSetup(content, ['!test scalar', '!test mapping']);
            validator
                .then(function (result) {
                assert.equal(result.length, 0);
            })
                .then(done, done);
        });
        it('Allow multiple different custom tag types with multiple different uses', (done) => {
            const content = '!test\nhello: !test\n  world\nsequence: !ref\n  - item1';
            const validator = parseSetup(content, ['!test scalar', '!test mapping', '!ref sequence', '!ref mapping']);
            validator
                .then(function (result) {
                assert.equal(result.length, 0);
            })
                .then(done, done);
        });
    });
    describe('Test that validation does throw errors', function () {
        it('Error when custom tag is not available', (done) => {
            const content = '!test';
            const validator = parseSetup(content, []);
            validator
                .then(function (result) {
                assert.equal(result.length, 1);
                assert.deepEqual(result[0], verifyError_1.createExpectedError('unknown tag <!test>', 0, 0, 0, 0));
            })
                .then(done, done);
        });
    });
});
//# sourceMappingURL=customTags.test.js.map