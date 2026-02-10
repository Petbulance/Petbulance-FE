export function pushDL(eventName, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

const DEBUG_MODE_KEY = 'ga_debug_mode';

export function isDebugModeEnabled() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEBUG_MODE_KEY) === 'true';
}

export function setDebugMode(enabled) {
  if (typeof window === 'undefined') return;

  if (enabled) {
    localStorage.setItem(DEBUG_MODE_KEY, 'true');
  } else {
    localStorage.removeItem(DEBUG_MODE_KEY);
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ debug_mode: !!enabled });

  if (typeof window.gtag === 'function') {
    window.gtag('set', { debug_mode: !!enabled });
  }
}

export function syncDebugModeFromQuery(search) {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(search ?? window.location.search);
  const queryValue = params.get('debug_mode');

  if (queryValue === 'true') {
    setDebugMode(true);
    return true;
  }

  if (queryValue === 'false') {
    setDebugMode(false);
    return false;
  }

  return isDebugModeEnabled();
}

export function withDebugQuery(path) {
  if (!isDebugModeEnabled()) return path;
  return `${path}${path.includes('?') ? '&' : '?'}debug_mode=true`;
}
