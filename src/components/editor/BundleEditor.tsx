// TinyMCEEditor.tsx
import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyMCEEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const BundleEditor: React.FC<TinyMCEEditorProps> = ({
  content,
  onContentChange,
}) => {
  let API_KEY = process.env.REACT_APP_TINYMCE_API;

  return (
    <Editor
      apiKey={API_KEY}
      value={content}
      onEditorChange={(newContent: string) => onContentChange(newContent)}
      init={{
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
      }}
    />
  );
};

export default BundleEditor;
