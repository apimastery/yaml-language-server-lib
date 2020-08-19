import { TextDocument, TextEdit, FormattingOptions } from 'vscode-languageserver-types';
import { CustomFormatterOptions, LanguageSettings } from '../yamlLanguageService';
export declare class YAMLFormatter {
    private formatterEnabled;
    configure(shouldFormat: LanguageSettings): void;
    format(document: TextDocument, options: FormattingOptions & CustomFormatterOptions): TextEdit[];
}
