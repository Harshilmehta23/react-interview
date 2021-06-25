import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const IdleTimeOutModal = ({ showModal, handleClose, handleLogout }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      centered
      backdrop={"static"}
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>You Have Been Idle!</Modal.Title>
      </Modal.Header>
      <Modal.Body>You Will Get Timed Out.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
