import { Modal } from '@/common/ui/components';
import { Content, Title } from './styles.tsx';
import { useAddEducationalProgram } from '@/educational-programs/hooks';
import SpecialtyForm from '../SpecialtyForm';
import { Specialty } from '@/educational-programs/entities';

export type AddSpecialtyModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddSpecialtyModal = ({ open, onClose }: AddSpecialtyModalProps) => {
  const { addEducationalProgram, isPending } = useAddEducationalProgram({
    onSuccess: onClose,
  });

  const onSubmit = (specialty: Specialty) => {
    addEducationalProgram({ data2: specialty });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Specialty information</Title>
        <SpecialtyForm
          isPending={isPending}
          onBack={onClose}
          onSubmit={onSubmit}
        />
      </Content>
    </Modal>
  );
};

export default AddSpecialtyModal;
