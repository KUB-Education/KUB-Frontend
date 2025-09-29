import { Modal } from '@/common/ui/components';
import { User } from '@/users/entities';
import EditUserModalContent from '../EditUserModalContent';

export type EditUserModalProps = {
  open: boolean;
  user: User;
  onClose: () => void;
};

const EditUserModal = ({ open, onClose, user }: EditUserModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <EditUserModalContent user={user} onClose={onClose} />
    </Modal>
  );
};

export default EditUserModal;
