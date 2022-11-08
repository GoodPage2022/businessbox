import { FieldProps } from "formik";

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {$createParagraphNode, $getRoot, EditorState, LexicalEditor} from 'lexical';
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import { useEffect, useState } from "react";
import { Field } from "formik";


const Editor:React.FC<FieldProps> = ({
    field,
    form,
}): JSX.Element => {
    const theme = {}
    const [editorInit, setEditorInit] = useState<boolean>(false)
    
    function editorOnChange(editorState: EditorState, editor: LexicalEditor) {
        editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            const plainString = $getRoot().getTextContent()

            form.setFieldValue(field.name, htmlString);
            form.setFieldValue("description-hidden", plainString);
        });

        return null;
    }

    const SetDataPlugin = ({data}: any) => {
        const [editor] = useLexicalComposerContext();
        
        useEffect(() => {
            if (editorInit == true) return
            if (!data) return

            editor.update(() => {
                const htmlString = $generateHtmlFromNodes(editor, null);
                if (data == htmlString) return
    
                const parser = new DOMParser();
                const dom = parser.parseFromString(data, "text/html");

                const root = $getRoot()
                root.clear();
                
                const nodes = $generateNodesFromDOM(editor, dom);
                nodes.forEach((n)=> root.append(n))

                setEditorInit(true)
            });
        }, [editor, data]);
      
        return null;
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
            <SetDataPlugin data={field.value} />

            <Field
                className="editor--hidden"
                type="text"
                name="description-hidden"
                id="description-hidden"
                minLength={1}
                maxLength={2000}
                required
                onInvalid={(e:any) => (e.target as HTMLInputElement).setCustomValidity('Заповнити поле')}
                onInput={(e:any) => (e.target as HTMLInputElement).setCustomValidity('')}
            />
        </div>
        </LexicalComposer>
    );
}

export default Editor