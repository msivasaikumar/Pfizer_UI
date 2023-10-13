import React from "react";
import "./ProjectDetails.scss";
import ProjectDetailsHeader from "../../components/common/ProjectDetailsHeader/ProjectDetailsHeader";
import ApplicationCard from "../../components/ApplicationCard/ApplicationCard";
import FolderData from "../../components/FolderData/FolderData";
import AppCardDetails from "../../components/ApplicationCard/AppCardDetails";
import { ApplicationCards } from "../../utils/constants";

const ProjectDetails = () => (
  <div className="doc-container">
    <ProjectDetailsHeader />
    <div className="container">
      <div className="row custom-grid">
        {ApplicationCards.map((app) => (
          <div className="col-md-6 custom-cell" key={app.title}>
            <ApplicationCard
              title={app.title}
              description={app.description}
              folderChildren={
                Object.keys(app.folder).length !== 0 ? <FolderData title={app.folder.title} value={app.folder.value} type={app.folder.type} /> : ""
              }
              detailedChildren={app.detailsList.length !== 0 ? <AppCardDetails detailsList={app.detailsList} /> : ""}
              btnText={app.btnText}
              isBtnDisabled={app.isBtnDisabled}
              className="mt-3"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default ProjectDetails;
