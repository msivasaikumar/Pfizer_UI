import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./CreateTemplate.scss";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

function CreateTemplate() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {};

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Template</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" className="MuiDialog-root">
        <div>
          <h2 className="MuiDialogTitle-root">Create Template</h2>
        </div>
        <Grid container>
          <Grid item xs={6}>
            <div className="d-flex">
              <span className="project-label">Project Name:</span>
              <span className="m-1">E-commerce</span>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="d-flex">
              <span className="m-1 label">Template Name:</span>
              <FormControl>
                <TextField placeholder="Enter template name" className="customTextField" />
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <DialogContent>
          <QuillEditor />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateTemplate;
