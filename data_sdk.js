// data_sdk.js
// Offline-first local data engine using localStorage

(function () {
  const STORAGE_KEY = 'rural_attendance_data';

  let data = [];

  // Load from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    data = saved ? JSON.parse(saved) : [];
  } catch {
    data = [];
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function notify(handler) {
    if (handler && typeof handler.onDataChanged === 'function') {
      handler.onDataChanged([...data]);
    }
  }

  window.dataSdk = {
    async init(handler) {
      this._handler = handler;
      notify(handler);
      return { isOk: true };
    },

    async create(record) {
      try {
        record.__backendId = crypto.randomUUID();
        data.push(record);
        persist();
        notify(this._handler);
        return { isOk: true };
      } catch (e) {
        console.error('Create failed', e);
        return { isOk: false };
      }
    },

    async update(updatedRecord) {
      try {
        const index = data.findIndex(
          d => d.__backendId === updatedRecord.__backendId
        );
        if (index === -1) return { isOk: false };

        data[index] = updatedRecord;
        persist();
        notify(this._handler);
        return { isOk: true };
      } catch (e) {
        console.error('Update failed', e);
        return { isOk: false };
      }
    },

    async delete(record) {
      try {
        data = data.filter(d => d.__backendId !== record.__backendId);
        persist();
        notify(this._handler);
        return { isOk: true };
      } catch (e) {
        console.error('Delete failed', e);
        return { isOk: false };
      }
    }
  };
})();
