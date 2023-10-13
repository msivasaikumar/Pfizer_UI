import React from "react";

function Popup({ reference, isOpen, setIsOpen }) {
  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div role="presentation" onClick={handleClosePopup} className="popup">
          <div className="popup-content">
            <p>{reference}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Popup;
