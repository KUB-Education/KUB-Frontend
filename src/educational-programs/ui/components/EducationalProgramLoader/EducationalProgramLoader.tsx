import { CircularProgress } from '@/common/ui/components';

export type EducationalProgramLoaderProps = {
  className?: string;
};

const EducationalProgramLoader = ({
  className,
}: EducationalProgramLoaderProps) => {
  return <CircularProgress className={className} />;
};

export default EducationalProgramLoader;
