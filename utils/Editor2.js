import { useEffect, useState } from "react";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import DOMPurify from "dompurify";
import { WYSIWYG_EDITOR_DEFAULT_SETTINGS } from "../config/editor.config";
import { Box } from "@chakra-ui/react";
import PostsService from "../services/posts/posts.service";
import { DEFAULT_HTML_CONVERSION_OPTIONS } from "../config/draftjs-html-conversion.config";
import useAuth from "../components/authentication/hooks/useAuth";


/* const MediaComponent = ({ contentState, block, blockProps }) => {
    const { foo } = blockProps;
    const data = contentState.getEntity(block.getEntityAt(0)).getData();
    const emptyHtml = ' ';
    return (
        <div>
            {emptyHtml}
            <img
                src={data.src}
                alt={data.alt || ''}
                style={{ height: data.height || 'auto', width: data.width || 'auto' }}
            />
        </div>
    );
}

function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();

    // Convert image type to mediaComponent
    if (type === 'atomic') {
        return {
            component: MediaComponent,
            editable: false,
            props: {
                foo: 'bar',
            },
        };
    }
} */



const Editor2 = ({ setHtmlBlockState, initialEditorState, setPostData, setDraftData, draftData, postData }) => {
    const { userData } = useAuth();
    const [editorState, setEditorState] = useState(EditorState.createEmpty()); // create custom type for textState
    const [initialized, setInitialized] = useState(false)

    const handleTextChange = (currentTextState) => {
        setEditorState(currentTextState);
        /**
         * Here we're converting the text state to content state in order to pass it into the imported
         * stateToHTML function (which takes those two args).
         */
        let contentState = currentTextState.getCurrentContent();
        //TODO: Do we need to do this everytime content changes?
        let newHtml = DOMPurify.sanitize(
            stateToHTML(contentState, DEFAULT_HTML_CONVERSION_OPTIONS) // sanitize the state to html conversion result
        );

        setHtmlBlockState(newHtml);
    };
    const uploadCallback = (file, callback) => {
        //console.log(file);
        return new Promise((resolve, reject) => {
            const reader = new window.FileReader();
            // console.log(reader);
            reader.onloadend = async () => {
                const form_data = new FormData();
                form_data.append("file", file);
                const res = await PostsService.uploadImageForPostAndGetUrl(file.name, file, userData?.id)
                if (setDraftData && typeof draftData?.imagePaths === "object") setDraftData({ ...draftData, imagePaths: [...draftData.imagePaths, `/temp/${userData?.id}/${file.name}`] })
                if (setPostData && typeof postData?.imagePaths === "object") setPostData({ ...postData, imagePaths: [...postData?.imagePaths, `/temp/${userData?.id}/${file.name}`] })
                resolve(res);
            };
            reader.readAsDataURL(file);
        });
    };
    // Check if state update from fetched content has already been made and don't reset state every single render
    useEffect(() => {
        if (initialEditorState !== EditorState.createEmpty()) {
            setEditorState(initialEditorState)
            setInitialized(true)
        }

        return () => {
            setInitialized(false)
            setEditorState(EditorState.createEmpty())
        }
    }, [initialEditorState])

    return (
        <Box zIndex={3}>
            <Editor
               // blockRendererFn={myBlockRenderer}
                {...WYSIWYG_EDITOR_DEFAULT_SETTINGS}
                editorState={editorState}
                onEditorStateChange={handleTextChange}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'history'],
                    image: {
                        urlEnabled: true,
                        uploadEnabled: true,
                        uploadCallback: uploadCallback,
                        previewImage: true,
                        alt: { present: false, mandatory: false }
                    },
                }}
            //toolbar={config}
            />
        </Box>

    )
}

export default Editor2;