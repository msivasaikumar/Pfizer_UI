// import { useContext } from "react";

// import { StoreContext } from "../../context";
import "./confirmationModal.css";

const ConfirmationModal = ({ id, title, projectName, label, cancel, success }) => (
  // const { confimationModal } = useContext(StoreContext);
  <div>
    <div
      // className={`modal  ${isDeleteModalOpen ? 'show' : ''}`}
      className="modal"
      id={id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered justify-content-center">
        <div className="custom-modal-content-sm">
          <div className="border-none">
            <h5 className="modal-title modal-title-heading" id="exampleModalLabel">
              {title}
            </h5>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12 mb-3">
                <lable className="delete-project-title">{projectName}</lable>
                <p>
                  <label className="drop-down-heading bottom-lable">{label}</label>
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" data-bs-dismiss="modal">
              {cancel}
            </button>
            <button type="button" className="save-btn">
              {success}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default ConfirmationModal;
