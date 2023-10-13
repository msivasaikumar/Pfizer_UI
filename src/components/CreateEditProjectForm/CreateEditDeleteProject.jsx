import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Select from "../common/Select/Select";
import "./CreateEditDeleteProject.scss";

export default function CreateEditDeleteProject({ actionType, projectData }) {
  const [projectDetails, setProjectDetails] = useState(
    actionType !== "create" ? { ...projectData } : { project_name: "", project_domain: "", project_group: "", project_subdomain: "" }
  );
  const handleValueChange = (newValue, changingParam) => {
    const newProjectDetails = { ...projectDetails };
    newProjectDetails[changingParam] = newValue;
    setProjectDetails(newProjectDetails);
  };

  return (
    <div className="project-changes-container">
      {actionType !== "delete" ? (
        <div className="create-edit-container">
          <FormControl fullWidth sx={{ margin: { xs: "0 0 1rem 0", md: "0 0 2rem 0" } }}>
            <FormLabel className="mb-2">Project Name</FormLabel>
            <TextField
              value={projectDetails.project_name}
              placeholder="Enter a project name"
              onChange={(event) => handleValueChange(event.target.value, "project_name")}
            />
          </FormControl>
          <Select
            value={projectDetails.project_group}
            label="Select Group"
            placeholder="Select a group"
            options={["Group 1", "Group 2", "Group 3", "Group 4", "Group 5", "Group 6"]}
            margin={{ xs: "0 0 1rem 0", md: "0 0 2rem 0" }}
            onChange={(event) => handleValueChange(event.target.value, "project_group")}
          />
          <div className="d-flex">
            <Select
              value={projectDetails.project_domain}
              label="Select Domain"
              placeholder="Select a domain"
              options={["Domain 1", "Bio-Pharma", "Domain 3", "Domain 4", "Domain 5", "Domain 6"]}
              margin="0 1rem 0 0"
              onChange={(event) => handleValueChange(event.target.value, "project_domain")}
            />
            <Select
              value={projectDetails.project_subdomain}
              label="Select Sub Domain"
              placeholder="Select a sub domain"
              options={["Sub Domain 1", "PLS", "Sub Domain 3", "Sub Domain 4", "Sub Domain 5", "Sub Domain 6"]}
              margin="0 0 0 1rem"
              onChange={(event) => handleValueChange(event.target.value, "project_subdomain")}
            />
          </div>
        </div>
      ) : (
        <div className="delete-project-container">
          <h6 className="mt-4 sub-heading">Project Name:</h6>
          <p className="mt-1 project-name">{projectData.project_name}</p>
          <p className="delete-disclaimer mt-5">You are about to delete a project, this action cannot be reversed.</p>
        </div>
      )}
    </div>
  );
}
