import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import PromptConfigurations from "../PromptConfigurations";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Compiler from "../Compiler";
import { deleteIcon } from "./constants";
import { data } from "./mockData";

import "./index.scss"; // Import the CSS file for the component

function RootCauseAnalysis() {
  const [incidentDescription, setIncidentDescription] = useState("");
  const [incidentList, setIncidentList] = useState([]);
  const [rootCauses, setRootCauses] = useState([]);
  const [showDescriptions, setShowDescriptions] = useState({});
  const [configurations, setConfigurations] = useState({
    configText: "",
    refNum: 1,
    rootNum: 1
  });
  const [open, setOpen] = React.useState(false);
  const [rootCause, setRootCause] = React.useState("");
  const [justification, setJustification] = React.useState("");
  const [references, setReferences] = React.useState("");
  const [serverProps, setServerProps] = React.useState({});

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  /*  eslint no-unsafe-optional-chaining: "error" */
  const toogleModal = () => setOpen(!open);

  const toggleDescription = (id, e) => {
    if (e.target.nodeName !== "A") {
      setShowDescriptions({ ...showDescriptions, [id]: !showDescriptions[id] });
    }
  };

  const OnInput = () => {
    style.height = 0;
    style.height = `${this.scrollHeight}px`;
  };

  const handleAddRootCauseManually = () => {
    if (incidentDescription.trim() === "") return;

    const rootCauseResult = [];
    data.forEach((cause, i) => {
      if (i < configurations.rootNum) {
        rootCauseResult.push({
          ...cause,
          text: incidentDescription,
          references: cause.references.map((r, j) => j < configurations.refNum && r)
        });
      }
    });

    setRootCauses(rootCauseResult);
    setShowDescriptions({ ...showDescriptions, [Date.now()]: false });
    setServerProps({
      incidentDescription,
      configurations
    });
  };

  const submitRootCause = async () => {
    try {
      // Create a JSON object with incidentDescription and configurations
      const payLoad = {
        incidentDescription,
        configurations
      };
      setIncidentList([...incidentList, incidentDescription]);

      // Send a POST request to your Python backend
      const response = await fetch("/process_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payLoad)
      });
      setIncidentDescription("");

      if (!response.ok) {
        throw new Error("Failed to send data");
      }
      const responseData = await response.json();
      // responseData is the list of objects received from the backend
      document.getElementById("loading-info").style.display = "none";

      /* eslint-disable-next-line no-plusplus */
      for (let i = 0; i < responseData?.similarIncidents?.length; i++) {
        const rootCauseObj = {
          text: `${responseData?.similarIncidents[i]?.root_cause_tier_1} + " || " + ${responseData?.similarIncidents[i]?.root_cause_tier_2}`,
          id: responseData?.similarIncidents[i]?.root_cause_tier_1 + responseData?.similarIncidents[i]?.similarIncident,
          description: responseData?.similarIncidents[i]?.root_cause_tier_3,
          references: []
        };
        /* eslint-disable-next-line no-plusplus */
        for (let j = 0; j < responseData?.similarIncidents[i]?.similarIncident.length; j++) {
          rootCauseObj?.references?.push([responseData?.similarIncidents[i]?.similarIncident[j]]); // List of references
        }
        rootCauses.push(rootCauseObj);
        setRootCauses([...rootCauses]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfigurationsChange = (newConfigurations) => {
    setConfigurations(newConfigurations);
  };

  const handleDelete = (id) => {
    setRootCauses(rootCauses.filter((e) => e.id !== id));
  };

  const handleSubmitNewRootCause = () => {
    // e.preventDefault();
    const newCause = {
      cause: rootCause,
      description: justification,
      references: references.split(" ")
    };
    setRootCauses([
      ...rootCauses,
      {
        ...newCause,
        id: Date.now()
      }
    ]);
    toogleModal();
  };

  /** function for reorder state */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /** handle drag event for root cause list item */
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(rootCauses, result.source.index, result.destination.index);

    setRootCauses(items);
  };

  /** Draggable root cause component */
  const RootCause = ({ rootCauseItem, index }) => (
    <Draggable draggableId={`${rootCauseItem.id}`} index={index}>
      {(provided) => (
        <div
          role="presentation"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`root-cause ${showDescriptions[rootCauseItem.id] ? "expanded" : ""}`}
          key={rootCauseItem.id}
          onClick={(e) => toggleDescription(rootCauseItem.id, e)}
        >
          <div className="root-cause-robbon">
            <div
              className="root-cause-text"
              // onClick={() => toggleDescription(rootCause.id)}
            >
              #{rootCauseItem.text}
              <FaAngleRight onClick={(e) => toggleDescription(rootCauseItem.id, e)} className="collapse-icon" />
            </div>

            <img role="presentation" alt="delete" className="delete-logo" src={deleteIcon} onClick={() => handleDelete(rootCauseItem.id)} />
          </div>
          {showDescriptions[rootCauseItem.id] && <div className="root-cause-description">{rootCauseItem.description}</div>}
          {showDescriptions[rootCauseItem.id] && (
            <div className="root-cause-references">
              <h3>References:</h3>
              <ul className="reference-list">
                {rootCauseItem.references.map((reference, k) => (
                  <li className="root-cause-reference" key={k}>
                    <a target="_blank" rel="noopener noreferrer" href={reference}>
                      {reference}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );

  /** List of Root causes */
  const RootCauseList = React.memo(({ rootCausesList }) =>
    rootCausesList?.map((rc, index) => <RootCause rootCauseItem={rc} index={index} key={rc.id} showDescriptions handleDelete toggleDescription />)
  );

  /** For auto expand the text area */
  const tx = document.getElementsByTagName("textArea");

  return (
    <div className="root-cause-container">
      <div className="root-cause-analysis">
        <div className="incident-description">
          <h2 className="incident-title">Enter Incident Description</h2>
          <div className="incident-chat-block">
            <div>
              <form className="incident-input-block">
                <textarea
                  id="textArea"
                  className="incident-description-input"
                  placeholder="Please Provide me an overview of the clinical trial stage."
                  value={incidentDescription}
                  onChange={(e) => {
                    setIncidentDescription(e.target.value);
                    tx[0].setAttribute("style", `height: ${tx[0].scrollHeight}px; overflow-y:hidden`);
                    tx[0].addEventListener("input", OnInput, false);
                    // setScrollHeight((prev) => prev + 16);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // Prevent the default form submission
                      handleAddRootCauseManually();
                      setIncidentList([...incidentList, e.target.value]);
                    }
                  }}
                  required
                />
                <button type="submit" className="submit-button" onClick={submitRootCause}>
                  Submit
                </button>
              </form>
            </div>
          </div>
          <PromptConfigurations onConfigurationsChange={handleConfigurationsChange} />
          <Compiler code={serverProps} />
        </div>
        <div className="root-causes">
          <h2 className="incident-title">Root Causes</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <RootCauseList
                    rootCausesList={rootCauses}
                    showDescriptions={showDescriptions}
                    handleDelete={handleDelete}
                    toggleDescription={toggleDescription}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button type="button" onClick={toogleModal}>
            Add RootCause Manually
          </button>
          <Modal open={open} onClose={toogleModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <label htmlFor="#rootCause">Root Cause</label>
              <textarea type="text" id="#rootCause" name="rootCause" onChange={(e) => setRootCause(e.target.value)} />
              <br />
              <br />
              <label htmlFor="#justification">Justification</label>
              <textarea type="text" id="#justification" name="description" onChange={(e) => setJustification(e.target.value)} />
              <br />
              <br />
              <label htmlFor="#references">References</label>
              <textarea type="text" id="#references" name="references" onChange={(e) => setReferences(e.target.value)} />
              <br />
              <br />
              <Button onClick={handleSubmitNewRootCause} variant="contained">
                Add Rootcause
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default RootCauseAnalysis;
