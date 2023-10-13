import "./DocumentHeader.scss";
import { useState } from "react";
import editIcon from "../../assets/images/edit.svg";
import downloadIcon from "../../assets/images/download.svg";
import { commonText } from "../../i18n/Common";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { DocumentHeaderText } from "../../i18n/Components";
import Divider from "@mui/material/Divider";
import NavHeader from "../common/NavHeader/NavHeader";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const DocumentHeader = ({
  navigationHeader,
  path,
  defaultTitle,
  documentNameLabel,
  documentNamePlaceHolder,
  handleDownload,
  templateLabel,
  templateName,
  numOfSections
}) => {
  const [selectedValue, setSelectedValue] = useState(DocumentHeaderText.saveOpt);
  const [inEditState, setEditState] = useState(false);
  const [input, setInput] = useState(defaultTitle);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="doc-header d-d-flex flex-column">
      {navigationHeader && <NavHeader navigationHeader={navigationHeader} path={path} />}
      {documentNameLabel && (
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center">
            <p className="input-label">{documentNameLabel}</p>
            {!inEditState ? (
              <div className="d-flex flex-row align-items-center ms-3 label-value">
                <p>{input}</p>
                <IconButton className="ml-2" size="small" onClick={() => setEditState(true)}>
                  <img src={editIcon} alt={commonText.editIconAlt} />
                </IconButton>
              </div>
            ) : (
              <div className="d-flex flex-row align-items-center ms-3 label-value">
                <TextField
                  value={input}
                  size="small"
                  onChange={(e) => {
                    setInput(e.currentTarget.value);
                  }}
                  variant="outlined"
                  placeholder={documentNamePlaceHolder || ""}
                />
                <IconButton size="small" onClick={() => setEditState(false)}>
                  <DoneOutlinedIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div className="d-flex flex-row align-items-center">
            <FormControl fullWidth sx={{ width: "6rem" }}>
              <InputLabel id="documentNameLabel-select">{DocumentHeaderText.saveOpt}</InputLabel>
              <Select
                labelId="documentNameLabel-select"
                id="documentNameLabel-select"
                value={selectedValue}
                label="documentNameLabel"
                onChange={handleChange}
              >
                <MenuItem value="Save">{DocumentHeaderText.saveOpt}</MenuItem>
                <MenuItem value="Approve">{DocumentHeaderText.approveOpt}</MenuItem>
              </Select>
            </FormControl>
            <IconButton size="small" onClick={handleDownload} className="ms-2">
              <img src={downloadIcon} alt={commonText.downloadIconAlt} />
            </IconButton>
          </div>
        </div>
      )}
      {templateLabel && templateName && (
        <div className="d-flex flex-row justify-content-between align-items-center mt-3">
          <div className="d-flex flex-row align-items-center">
            <p className="input-label">{templateLabel}</p>
            <p className="ms-3 label-value">{templateName}</p>
          </div>
          {numOfSections && (
            <div className="d-flex flex-row align-items-center">
              <p className="input-label">{DocumentHeaderText.section}</p>
              <p className="ms-3 label-value">{numOfSections}</p>
            </div>
          )}
        </div>
      )}
      <Divider className="divider mt-3 mb-3" />
    </div>
  );
};
export default DocumentHeader;
