export function pushDL(eventName, params = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

const DEBUG_MODE_KEY = 'ga_debug_mode';
const PATCH_FLAG_KEY = '__ga_debug_mode_patched__';

export function isDebugModeEnabled() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEBUG_MODE_KEY) === 'true';
}

export function ensureDebugDataLayerPatch() {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  if (window.dataLayer[PATCH_FLAG_KEY]) return;

  const originalPush = window.dataLayer.push.bind(window.dataLayer);
  window.dataLayer.push = (...items) => {
    const isDebugMode = isDebugModeEnabled();
    const nextItems = items.map((item) => {
      if (!isDebugMode) return item;
      if (!item || typeof item !== 'object' || Array.isArray(item)) return item;
      if (Object.prototype.hasOwnProperty.call(item, 'debug_mode')) return item;
      return { ...item, debug_mode: true };
    });
    return originalPush(...nextItems);
  };

  window.dataLayer[PATCH_FLAG_KEY] = true;
}

export function setDebugMode(enabled) {
  if (typeof window === 'undefined') return;
  ensureDebugDataLayerPatch();

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
  ensureDebugDataLayerPatch();

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

export function initGlobalDebugMode() {
  if (typeof window === 'undefined') return;
  ensureDebugDataLayerPatch();

  const enabledByQuery = syncDebugModeFromQuery(window.location.search);
  const isDebugMode = enabledByQuery || isDebugModeEnabled();

  if (isDebugMode && typeof window.gtag === 'function') {
    window.gtag('set', { debug_mode: true });
  }
}
