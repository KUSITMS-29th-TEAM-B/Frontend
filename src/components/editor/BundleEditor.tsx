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
  console.log(API_KEY);
  return (
    <Editor
      apiKey={API_KEY}
      value={content}
      onEditorChange={(newContent: string) => onContentChange(newContent)}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
      }}
    />
  );
};

export default BundleEditor;
