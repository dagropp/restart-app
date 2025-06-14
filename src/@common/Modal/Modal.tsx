import MuiModal from '@mui/material/Modal';
import { ModalProps as MuiModalProps } from '@mui/material/Modal';

const Modal = ({ children, ...props }: MuiModalProps) => (
  <MuiModal {...props}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
      {children}
    </div>
  </MuiModal>
);

export default Modal;
