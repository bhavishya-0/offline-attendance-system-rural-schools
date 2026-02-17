// element_sdk.js
// Lightweight UI configuration SDK (safe stub for hackathon/demo)

(function () {
  let currentConfig = {};

  window.elementSdk = {
    init(options = {}) {
      // Store default config
      currentConfig = { ...(options.defaultConfig || {}) };

      // Notify UI about initial config
      if (typeof options.onConfigChange === 'function') {
        options.onConfigChange(currentConfig);
      }

      // Save references (optional, future use)
      this._onConfigChange = options.onConfigChange || null;
      this._mapToCapabilities = options.mapToCapabilities || null;
      this._mapToEditPanelValues = options.mapToEditPanelValues || null;
    },

    setConfig(newConfig = {}) {
      // Merge config updates
      currentConfig = { ...currentConfig, ...newConfig };

      // Notify UI again
      if (typeof this._onConfigChange === 'function') {
        this._onConfigChange(currentConfig);
      }
    }
  };
})();
