export default class StorageService {
  static save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static load(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static delete(key) {
    localStorage.removeItem(key);
  }

  static getAll() {
    return Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
  }
} 