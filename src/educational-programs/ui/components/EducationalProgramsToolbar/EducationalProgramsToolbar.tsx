import {
  AddButton,
  DeleteButton,
  DetailsButton,
  Toolbar,
  ToolbarAction,
  ToolbarActionsList,
  ToolbarActionsListItem,
} from '@/common/ui/components';
import { EducationalProgram } from '@/educational-programs/entities';

export type EducationalProgramsToolbarProps = {
  selectedEducationalPrograms: EducationalProgram[];
  className?: string;
  onAdd: () => void;
  onDelete: () => void;
  onDetails: () => void;
  onViewTerms: () => void;
};

const EducationalProgramsToolbar = ({
  selectedEducationalPrograms,
  className,
  onAdd,
  onDetails,
  onDelete,
  onViewTerms,
}: EducationalProgramsToolbarProps) => {
  if (selectedEducationalPrograms.length) {
    return (
      <Toolbar className={className}>
        <ToolbarActionsList>
          <ToolbarActionsListItem>
            <ToolbarAction>
              <DeleteButton onClick={onDelete} />
            </ToolbarAction>
          </ToolbarActionsListItem>
          {selectedEducationalPrograms.length === 1 && (
            <>
              <ToolbarActionsListItem>
                <ToolbarAction>
                  <DetailsButton onClick={onDetails} />
                </ToolbarAction>
              </ToolbarActionsListItem>
              <ToolbarActionsListItem>
                <ToolbarAction>
                  <DetailsButton onClick={onViewTerms}>
                    View terms
                  </DetailsButton>
                </ToolbarAction>
              </ToolbarActionsListItem>
            </>
          )}
        </ToolbarActionsList>
      </Toolbar>
    );
  }

  return (
    <Toolbar className={className}>
      <ToolbarActionsList>
        <ToolbarActionsListItem>
          <ToolbarAction>
            <AddButton onClick={onAdd}>Add new educational program</AddButton>
          </ToolbarAction>
        </ToolbarActionsListItem>
      </ToolbarActionsList>
    </Toolbar>
  );
};

export default EducationalProgramsToolbar;
