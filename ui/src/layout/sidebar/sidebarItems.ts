import { HouseIcon, StudentIcon } from '../../components/common/Icons';
import { SettingsIcon } from '@chakra-ui/icons';

const items = [
  {
    label: 'Inicio',
    icon: HouseIcon,
    selected: true,
    path: '/'
  },
  {
    label: 'Alumnos',
    icon: StudentIcon,
    iconSize: 5,
    path:'/alumnos'
  },
  {
    label: 'Configuracion',
    icon: SettingsIcon,
    iconSize: 5,
    path:'/config'
  },
];

export default items;
