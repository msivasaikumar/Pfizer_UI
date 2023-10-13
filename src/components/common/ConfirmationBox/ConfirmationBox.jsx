import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ConfirmationBoxText } from "../../../i18n/Components";
import "./ConfirmationBox.scss";

export default function ConfirmationBox({ isOpen, title, handleClose, handleAccept, children, agreeText, disagreeText }) {
  const handleAgree = () => {
    handleAccept();
    handleClose();
  };
  return (
    <div className="confirmation-box">
      <Dialog
        PaperProps={{ style: { maxWidth: "100%", borderRadius: "1rem" } }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-confirmation-title"
        aria-describedby="alert-confirmation-description"
      >
        {title && <DialogTitle className="confirmation-title">{title}</DialogTitle>}
        <DialogContent>{children}</DialogContent>
        <Divider className="confirmation-box-divider mt-3 mb-3" />
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            {disagreeText}
          </Button>
          <Button variant="contained" onClick={handleAgree}>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ConfirmationBox.defaultProps = {
  isOpen: false,
  agreeText: ConfirmationBoxText.agreeText,
  disagreeText: ConfirmationBoxText.disagreeText
};
