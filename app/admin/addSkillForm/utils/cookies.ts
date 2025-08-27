interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
}

class CookieManager {
  /**
   * Set a cookie
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    if (typeof window === 'undefined') {
      return; // Server-side, can't set cookies directly
    }

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    // Handle expires
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const date = new Date();
        date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
        cookieString += `; expires=${date.toUTCString()}`;
      } else {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
    }

    // Handle path
    if (options.path) {
      cookieString += `; path=${options.path}`;
    } else {
      cookieString += `; path=/`;
    }

    // Handle domain
    if (options.domain) {
      cookieString += `; domain=${options.domain}`;
    }

    // Handle secure
    if (options.secure) {
      cookieString += `; secure`;
    }

    // Handle sameSite
    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`;
    }

    // Handle httpOnly (note: this can't be set via JavaScript for security reasons)
    if (options.httpOnly) {
      console.warn('httpOnly flag cannot be set via JavaScript for security reasons');
    }

    document.cookie = cookieString;
  }

  /**
   * Get a cookie value
   */
  get(name: string): string | null {
    if (typeof window === 'undefined') {
      return null; // Server-side, can't access cookies directly
    }

    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  }

  /**
   * Remove a cookie
   */
  remove(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    this.set(name, '', {
      ...options,
      expires: new Date(0), // Set to past date to delete
    });
  }

  /**
   * Check if a cookie exists
   */
  exists(name: string): boolean {
    return this.get(name) !== null;
  }

  /**
   * Get all cookies as an object
   */
  getAll(): Record<string, string> {
    if (typeof window === 'undefined') {
      return {}; // Server-side, can't access cookies directly
    }

    const cookies: Record<string, string> = {};
    const cookieArray = document.cookie.split(';');

    for (let cookie of cookieArray) {
      cookie = cookie.trim();
      const [name, value] = cookie.split('=');
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    }

    return cookies;
  }

  /**
   * Clear all cookies (only those accessible via JavaScript)
   */
  clear(): void {
    const cookies = this.getAll();
    for (const name in cookies) {
      this.remove(name);
    }
  }
}

// Create and export a singleton instance
export const cookies = new CookieManager();

// Export individual methods for convenience
export const setCookie = cookies.set.bind(cookies);
export const getCookie = cookies.get.bind(cookies);
export const removeCookie = cookies.remove.bind(cookies);
export const cookieExists = cookies.exists.bind(cookies);
export const getAllCookies = cookies.getAll.bind(cookies);
export const clearAllCookies = cookies.clear.bind(cookies);

// Export the class for advanced usage
export { CookieManager };
export type { CookieOptions };