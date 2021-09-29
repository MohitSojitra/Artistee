import React, { useEffect, useLayoutEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";

import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button } from "@mui/material";
export default function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  useLayoutEffect(() => {
    document.getElementById("preview").innerHTML = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  }, [editorState]);
  return (
    <div style={{ padding: "20px", overflow: "scroll" }}>
      <h1>React Editors</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{ border: "1px solid black", padding: "2px", minHeight: "400px" }}>
        <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      </div>
      <div>
        <h5>Preview</h5>
        <div id="preview"></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Button variant={"contained"}>Send Mail </Button>
      </div>
    </div>
  );
}
