import { FieldProps } from "formik";

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {$createParagraphNode, $createTextNode, $getRoot, $getSelection, EditorState, LexicalEditor, RangeSelection} from 'lexical';
import {$generateHtmlFromNodes, $generateNodesFromDOM} from '@lexical/html';
import { useEffect, useRef, useState } from "react";
import { Field } from "formik";


const Editor:React.FC<FieldProps> = ({
    field,
    form
}): JSX.Element => {
    const theme = {}
    const [htmlStringHidden, setHtmlStringHidden] = useState("")
    
    function editorOnChange(editorState: EditorState, editor: LexicalEditor) {
        editorState.read(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            const plainString = $getRoot().getTextContent()

            form.setFieldValue(field.name, htmlString);
            form.setFieldValue("description-hidden", plainString);
            setHtmlStringHidden(plainString)

            console.log(htmlString);
        });
    }

    function DescriptionValue() {
        const [editor] = useLexicalComposerContext();
      
        useEffect(() => {
            if (htmlStringHidden == '' && field.value != '') {
                editor.update(() => {
                    const parser = new DOMParser();
                    const dom = parser.parseFromString(field.value, 'text/html');
                    const nodes = $generateNodesFromDOM(editor, dom);
                    $getRoot().select();

                    const selection = $getSelection() as RangeSelection;
                    selection.insertNodes(nodes);
                  });
                }
        }, [editor, field.value]);
      
        return null;
      }

    // useEffect(()=>{
    //     if (field.value && field.value != "") {
    //         // setHtmlStringHidden(field.value)
    //         form.setFieldValue(field.name, field.value);
    //         form.setFieldValue("description-hidden", field.value);
    //     }
    // }, [field.value])

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
            <DescriptionValue />

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