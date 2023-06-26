import { BikeIcon, HouseIcon, StudentIcon } from '../../components/common/Icons';
import { SettingsIcon } from '@chakra-ui/icons';
import Role from '../../model/user/Role';

const items = [
  {
    label: 'Inicio',
    icon: HouseIcon,
    path: '/dashboard',
  },
  {
    label: 'Alumnos',
    icon: StudentIcon,
    iconSize: 5,
    path: '/alumnos',
    role: Role.INSTRUCTOR,
  },
  {
    label: 'Rutinas',
    icon: BikeIcon,
    iconSize: 5,
    path: '/rutinas',
    role: Role.INSTRUCTOR,
  },
  {
    label: 'Configuracion',
    icon: SettingsIcon,
    iconSize: 5,
    path: '/config',
  },
];

export default items;
