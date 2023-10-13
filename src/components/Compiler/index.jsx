import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";

const Compiler = (props) => {
  const { code } = props;
  const [newCode, setNewCode] = useState({});

  useEffect(() => {
    setNewCode(JSON.stringify(code));
  }, [code]);

  return (
    <div className="root" style={{ marginTop: "20px", width: "60%" }}>
      <AceEditor
        placeholder="Placeholder Text"
        mode="json"
        theme="solarized_dark"
        name="blah2"
        fontSize={14}
        width="100%"
        height="100px"
        showPrintMargin
        showGutter
        highlightActiveLine
        value={`${newCode}`}
        setOptions={{
          useWorker: false,
          autoScrollEditorIntoView: true,
          showLineNumbers: true,
          tabSize: 2,
          wrap: true
        }}
        // wrapEnabled={true}
      />
    </div>
  );
};

export default Compiler;
