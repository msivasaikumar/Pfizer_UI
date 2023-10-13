import { Card, CardContent, Divider, Button } from "@mui/material";
import "./ApplicationCard.scss"; // Import your SCSS file

const ApplicationCard = ({ title, description, folderChildren, detailedChildren, btnText, isBtnDisabled, className }) => (
  <Card className={`app-card ${className}`}>
    <CardContent className="d-flex flex-column justify-content-between align-items-center">
      <p className="app-card-title text-center">{title}</p>
      <p className={`mt-4 text-center app-card-desc ${isBtnDisabled ? "disabled-app-card" : ""}`}>{description}</p>
      {!isBtnDisabled && (
        <div className="app-card-data d-flex flex-row justify-content-center align-items-center mb-4">
          {/* <FolderData title="Title" value={12} /> */}
          {folderChildren && folderChildren}
          {detailedChildren && (
            <div className="d-flex flex-row ms-3">
              <Divider orientation="vertical" flexItem className="app-card-divider" />
              <div className="d-flex flex-column ms-2 justify-content-center align-items-center">{detailedChildren}</div>
            </div>
          )}
        </div>
      )}
      <div>
        <Button variant="contained" color="primary" disabled={isBtnDisabled} sx={{ borderRadius: "2rem" }}>
          {btnText}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default ApplicationCard;
