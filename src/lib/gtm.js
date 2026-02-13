export const pushDataLayer = (eventName, data) => {
  if (typeof window !== 'undefined') {
    const isDebugMode = localStorage.getItem('ga_debug_mode') === 'true';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      ...data,
      ...(isDebugMode ? { debug_mode: true } : {}),
    });
  }
};
