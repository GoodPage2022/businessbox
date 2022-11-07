import { FieldProps } from "formik";

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {$getRoot, $getSelection, EditorState, LexicalEditor} from 'lexical';
import {$generateHtmlFromNodes} from '@lexical/html';
import { useState } from "react";

const Editor:React.FC<FieldProps> = ({
    field,
    form
}): JSX.Element => {
    const theme = {}
    const [htmlStringHidden, setHtmlStringHidden] = useState("")

    function editorOnChange(editorState: EditorState, editor: LexicalEditor) {
        editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);

            form.setFieldValue(field.name, htmlString);
            setHtmlStringHidden($getRoot().getTextContent())

            console.log(htmlString);
        });
    }

    function editorOnError(error: any) {
        console.error("Editor error: ", error);
    }

    const initialConfig = {
        namespace: 'Editor',
        theme,
        onError: editorOnError,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
        <div className="editor__container">
            <PlainTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={<div className="editor__placeholder">Писати тут...</div>}
            ErrorBoundary={LexicalErrorBoundary}
            />
            <OnChangePlugin onChange={editorOnChange} />
            <HistoryPlugin />

            <input
                className="editor--hidden"
                type="text"
                name="description-hidden"
                id="description-hidden"
                minLength={1}
                maxLength={2000}
                required
                value={htmlStringHidden}
                onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Заповнити поле')}
                onInput={e => (e.target as HTMLInputElement).setCustomValidity('')}
            />
        </div>
        </LexicalComposer>
    );
}

export default Editor