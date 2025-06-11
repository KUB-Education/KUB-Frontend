import { Modal } from '@/common/ui/components';
import { Content, Title } from './styles.tsx';
import { Specialty } from '@/educational-programs/entities';
import { useEditEducationalProgram } from '@/educational-programs/hooks';
import SpecialtyForm from '../SpecialtyForm';

export type EditSpecialtyModalModalProps = {
  open: boolean;
  specialty?: Specialty;
  onClose: () => void;
};

const EditSpecialtyModal = ({
  open,
  specialty,
  onClose,
}: EditSpecialtyModalModalProps) => {
  const { editEducationalProgram, isPending } = useEditEducationalProgram({
    onSuccess: onClose,
  });

  const onSubmit = (specialty: Specialty) => {
    editEducationalProgram({ data2: specialty });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Specialty information</Title>
        <SpecialtyForm
          isPending={isPending}
          data={specialty}
          onBack={onClose}
          onSubmit={onSubmit}
        />
      </Content>
    </Modal>
  );
};

export default EditSpecialtyModal;
