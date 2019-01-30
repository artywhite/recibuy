import qs from 'querystring';

const defaultPostHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
};

class Api {
  static async get(url, params = {}) {
    const query = qs.stringify(params);

    const modifiedUrl = `${url}${query ? `?${query}` : ''}`;
    try {
      const response = await window.fetch(modifiedUrl);
      return response.json();
    } catch (err) {
      throw err;
    }
  }

  // TODO: check response status
  static async post(url, body = {}) {
    try {
      const response = await window.fetch(url, {
        method: 'POST',
        headers: { ...defaultPostHeaders },
        body: JSON.stringify(body),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  }

  static async put(url, body = {}) {
    try {
      const response = await window.fetch(url, {
        method: 'PUT',
        headers: { ...defaultPostHeaders },
        body: JSON.stringify(body),
      });
      return response.json();
    } catch (err) {
      throw err;
    }
  }
}

export default Api;
