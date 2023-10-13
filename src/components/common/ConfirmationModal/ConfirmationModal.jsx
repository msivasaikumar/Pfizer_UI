import "./ConfirmationModal.scss";

function ConfirmationModal({ title, successButtonText, cancelButtonText, projectName, label }) {
  return (
    <div>
      <div
        // className={`modal  ${isDeleteModalOpen ? 'show' : ''}`}
        className="modal"
        tabIndex={-1}
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
                  <div className="delete-project-title">{projectName}</div>
                  <p>
                    <div className="drop-down-heading bottom-lable">{label}</div>
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="cancel-btn" data-bs-dismiss="modal">
                {cancelButtonText}
              </button>
              <button type="button" className="save-btn">
                {successButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
