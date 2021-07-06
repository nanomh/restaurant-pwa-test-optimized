import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class WarungDbSource {
  static async daftarWarung() {
    const response = await fetch(API_ENDPOINT.list);
    const responseJson = await response.json();
    return responseJson;
  }

  static async cariWarung(id) {
    const response = await fetch(API_ENDPOINT.search(id));
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailIdWarung(id) {
    const response = await fetch(API_ENDPOINT.detail(id));
    const responseJson = await response.json();
    return responseJson;
  }

  static async kirimUlasan(data) {
    const response = await fetch(API_ENDPOINT.ulasan, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: data,
    });
    const responseJson = await response.json();
    return responseJson;
  }
}
export default WarungDbSource;
