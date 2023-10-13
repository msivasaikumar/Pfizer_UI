import React, { useState } from "react";
import Accordion from "../../components/common/Accordion";
import TextArea from "../../components/common/TextArea";
import { accordionItems } from "../../jsonData";
import Modal from "../../components/common/Modal";
import Button from "@mui/material/Button";
import "./InputPrompt.scss";
// import { Typography } from "@mui/material";

function InputPrompt() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const getRowCount = (text) => {
    if (!text) return 1;
    const charactersPerRow = 70;
    return Math.max(1, Math.ceil(text.length / charactersPerRow));
  };

  return (
    <div className="App">
      <Button onClick={() => setModalOpen(true)}>Input Prompts</Button>
      <Modal className="create-prompt-modal" open={modalOpen} onClose={() => setModalOpen(false)} title="Input Prompts">
        <div className="suggestions-text">
          <h6>Suggestions(4)</h6>
          {accordionItems.map((item, index) => (
            <Accordion key={index} summary={item.summary} details={item.details} onClick={() => setInputValue(item.details)} />
          ))}

          <div className="input-wrapper d-flex">
            <TextArea value={inputValue} onChange={(e) => setInputValue(e.target.value)} rows={getRowCount(inputValue)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default InputPrompt;
