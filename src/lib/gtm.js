export const pushDataLayer = (eventName, data) => {
  if (typeof window !== 'undefined') {
    const debugMode =
      typeof localStorage !== 'undefined' &&
      localStorage.getItem('ga_debug_mode') === 'true';
    window.dataLayer = window.dataLayer || [];
    const payload = {
      event: eventName,
      ...data,
      ...(debugMode ? { debug_mode: true } : {}),
    };
    console.log('[GA] pushDataLayer payload', payload);
    window.dataLayer.push(payload);

    // GA4 (gtag) direct send for DebugView and non-GTM setups.
    if (typeof window.gtag === 'function') {
      const params = { ...payload };
      delete params.event;
      window.gtag('event', eventName, params);
    }
  }
};
