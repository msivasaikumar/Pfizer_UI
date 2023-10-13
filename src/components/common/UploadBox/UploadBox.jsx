/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useRef } from "react";
import Button from "@mui/material/Button";

import deleteIcon from "../../../assets/images/delete-icon.svg";
import fileIcon from "../../../assets/images/file-icon.svg";
import uploadSvg from "../../../assets/images/upload.svg";
import "./UploadBox.css";
import { commonText } from "../../../i18n/Common";
import { uploadBoxText } from "../../../i18n/Components";
import { FILE_TYPE } from "../../../models/components/constants";

const UploadBox = ({
  title = uploadBoxText.uploadTitle,
  acceptedFileTypes = FILE_TYPE,
  setFiles,
  allowMultipleUpload = false,
  isUploadDisabled = false,
  instructions,
  subInstructions
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showBrowseFiles, setShowBrowseFiles] = useState(true);
  // const [hightlight, setHightlight] = useState(false);
  const inputRef = useRef(null);

  const onFileChange = (e) => {
    if (!e.target.files) {
      return;
    }
    setUploadedFiles(Array.from(e.target.files));
    setShowBrowseFiles(false);
    setFiles(e.target.files);
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileRemove = (e) => {
    const newFilesArray = [...uploadedFiles];
    const deleteIndex = e.target.id;
    newFilesArray.splice(deleteIndex, 1);
    setUploadedFiles(newFilesArray);
    setShowBrowseFiles(false);
    if (newFilesArray.length === 0) {
      setShowBrowseFiles(true);
    }
    setFiles(newFilesArray);
  };

  const fileAccepted = (files) => {
    const acceptedFiles = [...acceptedFileTypes];
    const rejectedFiles = [];
    Array.from(files).forEach((file) => {
      if (!acceptedFiles.includes(file.type)) {
        rejectedFiles.push(file.name);
      }
    });
    const isAcceptable = !rejectedFiles.length;
    return isAcceptable;
  };

  const onDragOver = (evt) => {
    evt.preventDefault();

    // if (isUploadDisabled) return;
    // setHightlight(true);
  };

  // const onDragLeave = () => {
  //   setHightlight(false);
  // };

  const onDrop = (event) => {
    event.preventDefault();
    // setHightlight(false);

    if (isUploadDisabled) return;
    if (allowMultipleUpload && event.target.files?.length > 1) return;

    const { files } = event.dataTransfer;
    const isAcceptable = fileAccepted(files);
    if (!isAcceptable) return; // invalid file type
    setUploadedFiles(Array.from(files));
    setShowBrowseFiles(false);
    setFiles(files);
  };

  return (
    // TODO: To be replaced with a custom card component
    <div className="uploadBox">
      <div>
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          // onDragLeave={onDragLeave}
          role="presentation"
        >
          <p className="card-title">{title}</p>
          <div className="dotted-div">
            {showBrowseFiles && (
              <>
                <img src={uploadSvg} alt={uploadBoxText.uploadAlt} />
                <p className="upload-text">{uploadBoxText.dragAndDrop}</p>
                <p className="sub-upload-text">{commonText.or}</p>
                <Button variant="contained" onClick={handleUploadClick} disabled={isUploadDisabled}>
                  {uploadBoxText.browseFiles}
                </Button>
              </>
            )}
            <div className="uploaded-files">
              {uploadedFiles.length > 0 &&
                Array.from(uploadedFiles)?.map((file, index) => (
                  <div key={file?.name}>
                    <div className="show-files">
                      <div className="file-tile">
                        <div className="d-flex flex-row">
                          <img src={fileIcon} alt={uploadBoxText.fileIconAltText} id={index.toString()} />
                          <p className="file-name">{file?.name}</p>
                        </div>
                        <img src={deleteIcon} alt={uploadBoxText.deleteIconAltText} onClick={handleFileRemove} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {instructions && (
            <div className="d-flexflex-column">
              <p className="instructions">{instructions}</p>
              {!showBrowseFiles && subInstructions && <p className="sub-instructions instructions">{uploadBoxText.fileInstructions}</p>}
            </div>
          )}
          <input
            type="file"
            ref={inputRef}
            multiple={allowMultipleUpload}
            onChange={onFileChange}
            className="hidden"
            disabled={isUploadDisabled}
            accept={acceptedFileTypes.join(",")}
            data-testid="uploadBox"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadBox;
