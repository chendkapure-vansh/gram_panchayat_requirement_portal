/**
 * Storage keys used across the application.
 * Persisted in browser localStorage.
 */
export const STORAGE_KEYS = {
  CART: 'jr_cart',
  ENQUIRIES: 'jr_enquiries',
  LANGUAGE: 'jr_language',
} as const;

/**
 * Safely retrieve an item from localStorage with JSON parsing and fallback.
 * Handles disabled cookies, incognito restrictions, and corrupted JSON.
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null || rawValue === undefined) {
      return fallback;
    }
    return JSON.parse(rawValue) as T;
  } catch (error) {
    console.warn(`[storage] Failed to parse item for key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safely save an item to localStorage with JSON stringification.
 * Returns true if successful, false otherwise.
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.warn(`[storage] Failed to save item for key "${key}":`, error);
    return false;
  }
}

