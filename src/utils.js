import { CONFIG } from './config.js';

/**
 * Styled console logger
 * @param {string} msg - Log message
 * @param {string} type - Log type (info, success, error, warning)
 */
export function logger(msg, type = 'info') {
    const styles = {
        info: 'color: #00bcd4; font-weight: bold',     // Cyan
        success: 'color: #4caf50; font-weight: bold',  // Green
        error: 'color: #f44336; font-weight: bold',    // Red
        warning: 'color: #ff9800; font-weight: bold'   // Orange
    };
    console.log(`%c[AutoReg] ${msg}`, styles[type] || styles.info);
}

/**
 * Sleep/delay function
 * @param {number} ms - Time to sleep (milliseconds)
 * @returns {Promise}
 */
export function sleep(ms) {
    const safeMs = Math.max(ms, 2000);
    return new Promise(resolve => setTimeout(resolve, safeMs));
}

/**
 * Check if current page is the registration page
 * @returns {boolean}
 */
export function isRegistrationPage() {
    // Replace with your university portal URL
    return window.location.href.includes(CONFIG.targetUrl);
}