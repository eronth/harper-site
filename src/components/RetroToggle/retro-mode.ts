// Also read by the inline script in index.html, which applies the saved mode
// before first paint so a retro visitor never sees the modern skin flash by.
export const retroModeStorageKey = 'retroMode';

export function readRetroMode(): boolean {
  try {
    return localStorage.getItem(retroModeStorageKey) === 'true';
  } catch {
    return false;
  }
}

// The retro skin hangs off a data attribute on <html> so any stylesheet can key off it
export function applyRetroMode(on: boolean) {
  if (on) {
    document.documentElement.dataset.style = 'retro';
  } else {
    delete document.documentElement.dataset.style;
  }

  try {
    localStorage.setItem(retroModeStorageKey, String(on));
  } catch {
    // Storage blocked (private mode etc.): the mode still applies, it just won't persist
  }
}
