import { IconButton, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react';
import { ShareIcon, WhatsAppIcon } from '../../components/common/Icons';
import { CopyIcon, EmailIcon } from '@chakra-ui/icons';
import { SessionContext } from '../../context/SessionProvider';
import { useContext } from 'react';
import { BRoutes } from '../../router/routes';

interface Props {
  subject: string;
  body: string;
  label?: string;
}
const ShareButton = (props: Props) => {
  const handleWhatsApp = () => {
    const link = 'https://wa.me/?text=' + encodeURIComponent(props.body);
    window.open(link, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(props.body);
  };
  return (
    <Menu placement='left-start'>
      <Tooltip label={props.label || 'Compartir'} hasArrow>
      <MenuButton as={IconButton} aria-label={props.label || 'Compartir'} color='primary.700' _dark={{color: 'primary.200'}} icon={<ShareIcon width={30} height={30} />} />
      </Tooltip>
      <MenuList>
        <MenuItem as='button' gap={2} onClick={handleWhatsApp}>
          <WhatsAppIcon fontSize='25px' /> WhatsApp
        </MenuItem>
        <MenuItem gap={2} as='a' href={`mailto:?subject=${props.subject}&body=${encodeURIComponent(props.body)}`}>
          <EmailIcon fontSize='25px' color='#ca2929' _dark={{ color: '#df5b5b' }} /> Correo electrónico
        </MenuItem>
        <MenuItem gap={2} as='button' onClick={handleCopy}>
          <CopyIcon fontSize='22px' /> Copiar
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ShareButton;
