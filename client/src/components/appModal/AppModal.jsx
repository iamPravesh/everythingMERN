import Modal from '@mui/material/Modal';

import './appModal.css';

const AppModal = ({ open, onClose, children}) => {
  return (
    <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
      <div className='modal-general'>
        {children}
      </div>
    </Modal>
  )
}

export default AppModal