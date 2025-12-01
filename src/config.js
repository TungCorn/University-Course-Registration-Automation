/**
 * Configuration for the automation tool
 * EDUCATIONAL PURPOSES ONLY
 * 
 * Change these settings to match your target environment
 */
export const CONFIG = {
    // Target URL - Replace with your university portal
    // Example: "portal.your-university.edu"
    targetUrl: "YOUR_UNIVERSITY_PORTAL_URL",

    // Course codes to register (checkbox values)
    // You need to inspect the registration page to get exact values
    targetCourses: [
        "SEMESTER_COURSECODE_SECTION", // Example: "241_CS101_01"
        "SEMESTER_COURSECODE_SECTION"  // Example: "241_MATH201_02"
    ],

    // DOM Selectors (update if the website structure changes)
    selectors: {
        checkbox: 'input[type="checkbox"][name^="chk_"]', // Course checkbox
        submitBtn: '#btnSubmit',                           // Save button
        tableRow: 'tr.course-row'                          // Row containing course
    },

    // Timing configuration (milliseconds)
    // WARNING: Do not set below 2000ms to avoid server overload
    timeout: {
        stepDelay: 3000,   // Delay between scans (prevents spam)
        submitDelay: 500   // Delay before clicking save
    },

    // Debug mode (prints logs to console)
    debugMode: true
};