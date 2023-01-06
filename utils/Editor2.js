import { useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import DOMPurify from "dompurify";


/* const Editor = dynamic(() => import('draft-js').then((mod) => mod.Editor), {
    ssr: false,
});
const EditorState = dynamic(() => import('draft-js').then((mod) => mod.EditorState), {
    ssr: false,
}); */
const config = {
    image: { uploadCallback: () => console.log("callback called") },
};
const Editor2 = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // create custom type for textState
    const [htmlBlockState, setHtmlBlockState] = useState("")

    const handleTextChange = (currentTextState) => {
        setEditorState(currentTextState);
        /**
         * Here we're converting the text state to content state in order to pass it into the imported
         * stateToHTML function (which takes those two args).
         */
        let contentState = currentTextState.getCurrentContent();
        let newHtml = DOMPurify.sanitize(
            stateToHTML(contentState) // sanitize the state to html conversion result
        );

        setHtmlBlockState(newHtml);
    };

    return (
        <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorState={editorState}
            onEditorStateChange={handleTextChange}
            /*  toolbar={{
                 image: {
                     previewImage: true,
                 },
                 alt: { present: true, mandatory: true },
             }} */
            toolbar={config}
        />
    )
}

export default Editor2;