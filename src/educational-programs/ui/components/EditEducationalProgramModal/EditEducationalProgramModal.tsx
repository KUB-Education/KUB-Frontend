import { Modal } from '@/common/ui/components';
import { Content, Title } from './styles.tsx';
import { EducationalProgram } from '@/educational-programs/entities';
import { useEditEducationalProgram } from '@/educational-programs/hooks';
import EducationalProgramForm from '../EducationalProgramForm';

export type EditEducationalProgramModalProps = {
  open: boolean;
  educationalProgram?: EducationalProgram;
  onClose: () => void;
};

const EditEducationalProgramModal = ({
  open,
  educationalProgram,
  onClose,
}: EditEducationalProgramModalProps) => {
  const { editEducationalProgram, isPending } = useEditEducationalProgram({
    onSuccess: onClose,
  });

  const onSubmit = (educationalProgram: EducationalProgram) => {
    editEducationalProgram({ data3: educationalProgram });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Educational program information</Title>
        <EducationalProgramForm
          isPending={isPending}
          data={educationalProgram}
          onBack={onClose}
          onSubmit={onSubmit}
        />
      </Content>
    </Modal>
  );
};

export default EditEducationalProgramModal;
