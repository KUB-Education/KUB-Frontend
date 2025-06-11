import { Modal } from '@/common/ui/components';
import { Content, Title } from './styles.tsx';
import { useAddEducationalProgram } from '@/educational-programs/hooks';
import StudyFieldForm from '../StudyFieldForm';
import { StudyField } from '@/educational-programs/entities';

export type AddStudyFieldModalProps = {
  open: boolean;
  onClose: () => void;
};

const AddStudyFieldModal = ({ open, onClose }: AddStudyFieldModalProps) => {
  const { addEducationalProgram, isPending: isEditPending } =
    useAddEducationalProgram({
      onSuccess: onClose,
    });

  const onSubmit = (studyField: StudyField) => {
    addEducationalProgram({ data1: studyField });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Study field information</Title>
        <StudyFieldForm
          isPending={isEditPending}
          onBack={onClose}
          onSubmit={onSubmit}
        />
      </Content>
    </Modal>
  );
};

export default AddStudyFieldModal;
