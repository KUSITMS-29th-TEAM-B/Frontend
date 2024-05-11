// TinyMCEEditor.tsx
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { motion } from "framer-motion";

interface TinyMCEEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const BundleEditor: React.FC<TinyMCEEditorProps> = ({
  content,
  onContentChange,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("loading:", loading);
  }, [loading]);

  let API_KEY = process.env.REACT_APP_TINYMCE_API;

  const editorInit = {
    height: 300,
    menubar: false,
    statusbar: false,
    highlight_on_focus: false,
    plugins: [
      "lists",
      "link",
      "image",
      "preview",
      "table",
      "emoticons",
      "codesample",
    ],
    toolbar:
      "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | " +
      "forecolor backcolor emoticons ",
    setup: (editor: any) => {
      editor.on("init", () => {
        setLoading(false);
        console.log("Editor initialized");
      });
    },
  };

  return (
    <>
      {
        <div
          style={{
            display: !loading ? "none" : "block",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          Loading Component Animation
        </div>
      }
      <div style={{ display: loading ? "none" : "block" }}>
        <Editor
          apiKey={API_KEY}
          value={content}
          onEditorChange={(newContent: string) => onContentChange(newContent)}
          init={editorInit}
        />
      </div>
    </>
  );
};

export default BundleEditor;
