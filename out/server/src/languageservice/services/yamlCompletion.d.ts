import { YAMLSchemaService } from './yamlSchemaService';
import { PromiseConstructor, Thenable, JSONWorkerContribution } from 'vscode-json-languageservice';
import { CompletionItem, CompletionList, TextDocument, Position } from 'vscode-languageserver-types';
import { LanguageSettings } from '../yamlLanguageService';
import { JSONCompletion } from 'vscode-json-languageservice/lib/umd/services/jsonCompletion';
import { ClientCapabilities } from 'vscode-languageserver-protocol';
export declare class YAMLCompletion extends JSONCompletion {
    private clientCapabilities;
    private schemaService;
    private contributions;
    private promise;
    private customTags;
    private completion;
    private supportsMarkdown;
    constructor(schemaService: YAMLSchemaService, contributions?: JSONWorkerContribution[], promiseConstructor?: PromiseConstructor, clientCapabilities?: ClientCapabilities);
    configure(languageSettings: LanguageSettings, customTags: Array<string>): void;
    doResolve(item: CompletionItem): Thenable<CompletionItem>;
    doComplete(document: TextDocument, position: Position, isKubernetes?: boolean): Thenable<CompletionList>;
    private getPropertyCompletions;
    private getValueCompletions;
    private getCustomTagValueCompletions;
    private addSchemaValueCompletions;
    private addDefaultValueCompletions;
    private collectDefaultSnippets;
    private getInsertTextForSnippetValue;
    private getLabelForSnippetValue;
    private addCustomTagValueCompletion;
    private addBooleanValueCompletion;
    private getSuggestionKind;
    private addNullValueCompletion;
    private getInsertTextForValue;
    private getInsertTemplateForValue;
    private getInsertTextForPlainText;
    private getInsertTextForObject;
    private getInsertTextForArray;
    private getInsertTextForProperty;
    private getInsertTextForGuessedValue;
    private getLabelForValue;
    /**
     * Corrects simple syntax mistakes to load possible nodes even if a semicolon is missing
     */
    private completionHelper;
    private is_EOL;
    private setKubernetesParserOption;
}
