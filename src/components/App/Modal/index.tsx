import { createPortal } from 'react-dom';
import { ReactNode, FC, useState, useEffect } from 'react';
import { mdiWindowClose } from '@mdi/js';
import './style.css'
import Icon from "@mdi/react";

type IModalParams = {
  isOpen: boolean,
  onClose: () => void,
  header: string,
  children: ReactNode | JSX.Element
}

const Modal: FC<IModalParams> = ({ isOpen, onClose, header, children }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setModalOpen(true);
    } else {
      setTimeout(() => setModalOpen(false), 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className={`modal-overlay ${modalOpen ? 'open' : ''}`}>
      <div className={`modal ${modalOpen ? 'open' : ''}`}>
        <div className={'modal__header-wrp'}>
          <h2 className={'modal__header'}>
            {header.toUpperCase()}
          </h2>
          <button
            className="modal-close"
            onClick={onClose}
          >
            <Icon
              size={'32px'}
              color={'currentColor'}
              path={mdiWindowClose}
            />
          </button>
        </div>

        <div className={'modal__content'}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') || document.body
  )
};

export default Modal;