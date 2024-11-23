import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { FormGenerator } from "./components/FormGenerator"; // Import form generator
import "tailwindcss/tailwind.css";

const App: React.FC = () => {
  const [jsonSchema, setJsonSchema] = useState<any>(null);

  // Handle changes in the Monaco JSON editor
  const handleEditorChange = (value: string | undefined) => {
    try {
      setJsonSchema(JSON.parse(value || "{}")); // Update the JSON schema on change
    } catch (error) {
      console.error("Invalid JSON schema", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side - JSON editor */}
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-xl font-bold mb-2">JSON Editor</h2>
        <MonacoEditor
          height="90vh"
          language="json"
          defaultValue={JSON.stringify({ formTitle: "Sample Form", fields: [] }, null, 2)}
          onChange={handleEditorChange}
        />
      </div>

      {/* Right side - Form preview */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">Form Preview</h2>
        <FormGenerator schema={jsonSchema} /> {/* Pass schema to the form generator */}
      </div>
    </div>
  );
};

export default App;
