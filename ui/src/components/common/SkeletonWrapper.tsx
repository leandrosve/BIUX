import { Skeleton, SkeletonProps } from '@chakra-ui/react';

interface Props extends SkeletonProps {
  loading?: boolean;
  repeat?: number;
  heights?: (number | string)[];
}

const SkeletonWrapper = ({ loading, repeat = 1, children, heights = [], height, ...props }: Props) => {
  if (loading)
    return (
      <>
        {[...Array(repeat)].map((_, index) => (
          <Skeleton key={index} borderRadius='lg' {...props} height={heights[index] ?? height}  />
        ))}
      </>
    );
  return <>{children}</>;
};

export default SkeletonWrapper;
