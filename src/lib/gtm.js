export const pushDataLayer = (eventName, data) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    const payload = {
      event: eventName,
      ...data,
    };
    console.log('[GA] pushDataLayer payload', payload);
    window.dataLayer.push(payload);
  }
};
