import { FC, ReactNode } from 'react';
import { IUser } from '../../../types/user.ts';
import { UserModalType } from '../../../enums/user-modal-type.enum.ts';
import Modal from '../../App/Modal';
import PositionModal from './PositionModal';
import StatusModal from './StatusModal';
import SkillModal from './SkillModal';
import PermissionsModal from './PermissionsModal';
import StartDateModal from './StartDateModal';

type IProps = {
  userData: IUser,
  type: UserModalType,
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void,
}

type IModal = {
  header: string,
  el: ReactNode
}

const ModalWindows: FC<IProps> = (props) => {

  const modalContentFilter = () => {
    let modal: IModal = { header: '', el: null };
    switch (props.type) {
      case UserModalType.Status:
        modal.header = 'Change status';
        modal.el = <StatusModal userData={props.userData} onConfirm={props.onConfirm} />;
        break;
      case UserModalType.Skill:
        modal.header = 'Change skills';
        modal.el = <SkillModal userData={props.userData} onConfirm={props.onConfirm} />;
        break;
      case UserModalType.Position:
        modal.header = 'Change position';
        modal.el = <PositionModal userData={props.userData} onConfirm={props.onConfirm} />;
        break;
      case UserModalType.Permission:
        modal.header = 'Change permissions';
        modal.el = <PermissionsModal userData={props.userData} onConfirm={props.onConfirm} />;
        break;
      case UserModalType.StartWorkDate:
        modal.header = 'Set start work date';
        modal.el = <StartDateModal userData={props.userData} onConfirm={props.onConfirm} />
    }
    return modal;
  };

  const modalCtx = modalContentFilter();

  return (modalCtx.el !== null &&
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      header={modalCtx.header}
    >
      {modalCtx.el}
    </Modal>
  )
};

export default ModalWindows;