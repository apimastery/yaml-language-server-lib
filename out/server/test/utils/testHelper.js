"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSchemaIDTextDocument = exports.setupTextDocument = exports.SCHEMA_ID = exports.TEST_URI = exports.createJSONLanguageService = exports.configureLanguageService = exports.toFsPath = exports.schemaRequestService = exports.workspaceContext = void 0;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
const vscode_languageserver_1 = require("vscode-languageserver");
const request_light_1 = require("request-light");
const yamlLanguageService_1 = require("../../src/languageservice/yamlLanguageService");
const Strings = require("../../src/languageservice/utils/strings");
const vscode_uri_1 = require("vscode-uri");
const vscode_json_languageservice_1 = require("vscode-json-languageservice");
const URL = require("url");
const fs = require("fs");
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-namespace
var VSCodeContentRequest;
(function (VSCodeContentRequest) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    VSCodeContentRequest.type = new vscode_languageserver_1.RequestType('vscode/content');
})(VSCodeContentRequest || (VSCodeContentRequest = {}));
// Create a connection for the server.
let connection = null;
if (process.argv.indexOf('--stdio') === -1) {
    connection = vscode_languageserver_1.createConnection(new vscode_languageserver_1.IPCMessageReader(process), new vscode_languageserver_1.IPCMessageWriter(process));
}
else {
    connection = vscode_languageserver_1.createConnection();
}
connection.onInitialize(() => {
    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: vscode_languageserver_1.TextDocumentSyncKind.Full,
            // Tell the client that the server support code complete
            completionProvider: {
                resolveProvider: false,
            },
        },
    };
});
exports.workspaceContext = {
    resolveRelativePath: (relativePath, resource) => {
        return URL.resolve(resource, relativePath);
    },
};
exports.schemaRequestService = (uri) => {
    if (Strings.startsWith(uri, 'file://')) {
        const fsPath = vscode_uri_1.URI.parse(uri).fsPath;
        return new Promise((c, e) => {
            fs.readFile(fsPath, 'UTF-8', (err, result) => {
                return err ? e('') : c(result.toString());
            });
        });
    }
    else if (Strings.startsWith(uri, 'vscode://')) {
        return connection.sendRequest(VSCodeContentRequest.type, uri).then((responseText) => {
            return responseText;
        }, (error) => {
            return error.message;
        });
    }
    return request_light_1.xhr({ url: uri, followRedirects: 5 }).then((response) => {
        return response.responseText;
    }, (error) => {
        return Promise.reject(error.responseText || request_light_1.getErrorStatusDescription(error.status) || error.toString());
    });
};
function toFsPath(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`Expected a string, got ${typeof str}`);
    }
    let pathName;
    pathName = path.resolve(str);
    pathName = pathName.replace(/\\/g, '/');
    // Windows drive letter must be prefixed with a slash
    if (pathName[0] !== '/') {
        pathName = `/${pathName}`;
    }
    return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
}
exports.toFsPath = toFsPath;
function configureLanguageService(languageSettings) {
    const languageService = yamlLanguageService_1.getLanguageService(exports.schemaRequestService, exports.workspaceContext, [], null);
    languageService.configure(languageSettings);
    return languageService;
}
exports.configureLanguageService = configureLanguageService;
function createJSONLanguageService() {
    return vscode_json_languageservice_1.getLanguageService({
        schemaRequestService: exports.schemaRequestService,
        workspaceContext: exports.workspaceContext,
    });
}
exports.createJSONLanguageService = createJSONLanguageService;
exports.TEST_URI = 'file://~/Desktop/vscode-k8s/test.yaml';
exports.SCHEMA_ID = 'default_schema_id.yaml';
function setupTextDocument(content) {
    return vscode_languageserver_1.TextDocument.create(exports.TEST_URI, 'yaml', 0, content);
}
exports.setupTextDocument = setupTextDocument;
function setupSchemaIDTextDocument(content) {
    return vscode_languageserver_1.TextDocument.create(exports.SCHEMA_ID, 'yaml', 0, content);
}
exports.setupSchemaIDTextDocument = setupSchemaIDTextDocument;
//# sourceMappingURL=testHelper.js.map