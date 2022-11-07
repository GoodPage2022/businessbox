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

const Editor:React.FC<FieldProps> = ({
    field,
    form
}): JSX.Element => {
    const theme = {}

    function editorOnChange(editorState: EditorState, editor: LexicalEditor) {
        editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);

            form.setFieldValue(field.name, htmlString);

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
        </div>
        </LexicalComposer>
    );
}

export default Editor