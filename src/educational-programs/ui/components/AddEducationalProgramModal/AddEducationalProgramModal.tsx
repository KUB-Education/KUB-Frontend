import { Modal } from '@/common/ui/components';
import { Content, Title } from './styles.tsx';
import { useAddEducationalProgram } from '@/educational-programs/hooks';
import EducationalProgramForm from '../EducationalProgramForm';
import { EducationalProgram } from '@/educational-programs/entities';

export type AddEducationalProgramModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddEducationalProgramModal = ({
  open,
  onClose,
}: AddEducationalProgramModalProps) => {
  const { addEducationalProgram, isPending } = useAddEducationalProgram({
    onSuccess: onClose,
  });

  const onSubmit = (educationalProgram: EducationalProgram) => {
    addEducationalProgram({
      data3: educationalProgram,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Educational program information</Title>
        <EducationalProgramForm
          isPending={isPending}
          onBack={onClose}
          onSubmit={onSubmit}
        />
      </Content>
    </Modal>
  );
};

export default AddEducationalProgramModal;
