import { Modal } from '@/common/ui/components';
import { Content, Title } from './styles.tsx';
import { StudyField } from '@/educational-programs/entities';
import { useEditEducationalProgram } from '@/educational-programs/hooks';
import StudyFieldForm from '../StudyFieldForm';

export type EditStudyFieldModalProps = {
  open: boolean;
  studyField?: StudyField;
  onClose: () => void;
};

const EditStudyFieldModal = ({
  open,
  studyField,
  onClose,
}: EditStudyFieldModalProps) => {
  const { editEducationalProgram, isPending } = useEditEducationalProgram({
    onSuccess: onClose,
  });

  const onSubmit = (studyField: StudyField) => {
    editEducationalProgram({ data1: studyField });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Content>
        <Title>Study field information</Title>
        <StudyFieldForm
          isPending={isPending}
          data={studyField}
          onBack={onClose}
          onSubmit={onSubmit}
        />
      </Content>
    </Modal>
  );
};

export default EditStudyFieldModal;
