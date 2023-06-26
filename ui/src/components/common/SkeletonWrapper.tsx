import { Skeleton, SkeletonProps } from '@chakra-ui/react';

interface Props extends SkeletonProps {
  loading?: boolean;
  repeat?: number;
}

const SkeletonWrapper = ({ loading, repeat = 1, children, ...props }: Props) => {
  if (loading)
    return (
      <>
        {[...Array(repeat)].map((_, index) => (
          <Skeleton key={index} {...props} />
        ))}
      </>
    );
  return <>{children}</>;
};

export default SkeletonWrapper;
