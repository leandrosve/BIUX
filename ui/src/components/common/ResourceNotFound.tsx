import { Alert, Image, Text } from '@chakra-ui/react';
import ResponsiveCard, { ResponsiveCardProps } from './ResponsiveCard';
import LinkButton, { LinkButtonProps } from './LinkButton';
import { ArrowBackIcon } from '@chakra-ui/icons';
import missingIllustration from '../../assets/illustrations/missing-page.png';

interface Props extends ResponsiveCardProps {
  message?: string;
  backButtonProps?: LinkButtonProps;
}
const ResourceNotFound = ({ message, backButtonProps, ...props }: Props) => (
  <ResponsiveCard {...props} marginTop={5}>
    <Alert display='flex' gap={3} flexGrow={1} flexDirection='column' alignItems='center' justifyContent='center' background='transparent'>
      <Image src={missingIllustration} aria-hidden width={150} className='hue-adaptative' />
      <Text fontSize='lg' maxWidth={350} textAlign='center'>
        {message || "No hemos podido encontrar el recurso solicitado"}
      </Text>
      {!!backButtonProps && <LinkButton leftIcon={<ArrowBackIcon />} {...backButtonProps} />}
    </Alert>
  </ResponsiveCard>
);

export default ResourceNotFound;