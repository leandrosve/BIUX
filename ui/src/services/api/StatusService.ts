import APIService from './APIService';

export default class StatusService extends APIService {
  static async checkStatus() {
    const disableMaintenance = localStorage.getItem('disable-maintenance') == 'true';
    if (disableMaintenance && location.pathname !== '/mantenimiento') return;
    if (disableMaintenance && location.pathname == '/mantenimiento') {
      location.href = '/';
      return;
    }

    const res = await this.get('/status/check');
    if (res.hasError && location.pathname !== '/mantenimiento') {
      location.href = '/mantenimiento';
      return;
    }
    if (!res.hasError && location.pathname == '/mantenimiento') {
      location.href = '/';
      return;
    }
  }
}
