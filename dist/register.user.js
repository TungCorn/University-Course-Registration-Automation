// ==UserScript==
// @name         University Course Registration Helper
// @namespace    https://github.com/TungCorn/course-registration-tool
// @version      1.0.0
// @description  Browser automation for course registration (Educational purposes only)
// @author       TungCorn
// @match        *://YOUR_UNIVERSITY_PORTAL/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=example.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- 1. CONFIGURATION ---
    const CONFIG = {
        // Course values to target (inspect checkbox values on your portal)
        targetCourseValues: [
            "COURSE_VALUE_1", 
            "COURSE_VALUE_2"
        ],
        btnSubmitSelector: "#btnSubmit", // Save button selector
        refreshInterval: 3000 // milliseconds (DO NOT set below 2000)
    };

    // --- 2. UTILS ---
    function log(msg, color = 'blue') {
        console.log(`%c[AutoReg] ${msg}`, `color: ${color}; font-weight: bold;`);
    }

    // --- 3. MAIN LOGIC ---
    function autoRegister() {
        let hasAction = false;

        // Find all checkboxes on page
        // Find all custom labels that act as checkboxes for courses
        const checkboxes = document.querySelectorAll('label[for^="sub_chk_"]');

        checkboxes.forEach(labelElement => { // Renamed 'chk' to 'labelElement' for clarity
            const courseId = labelElement.getAttribute('for'); // Get the ID from the 'for' attribute of the label
            const linkedInput = document.getElementById(courseId); // Find the actual (likely hidden) input element

            // If this course ID is in our target list and the linked input exists
            if (CONFIG.targetCourseValues.includes(courseId) && linkedInput) {
                // If the linked input is not checked and not disabled
                if (!linkedInput.checked && !linkedInput.disabled) {
                    labelElement.click(); // Click the label to toggle the associated input
                    log(`Checked course: ${courseId}`, 'green');
                    hasAction = true;
                } else if (linkedInput.disabled) {
                    log(`Course ${courseId} is locked/full`, 'red');
                }
            }
        });

        // If new selection made -> Click save
        if (hasAction) {
            const saveBtn = document.querySelector(CONFIG.btnSubmitSelector);
            if (saveBtn) {
                log("Clicking save button...", 'orange');
                saveBtn.click();
            } else {
                log("Save button not found!", 'red');
            }
        }
    }

    // --- 4. INIT ---
    log("Script started. Waiting for courses...");
    
    // Control panel UI (Optional)
    const panel = document.createElement('div');
    panel.innerHTML = `<div style="position:fixed; bottom:10px; right:10px; background:black; color:white; padding:10px; z-index:9999; border-radius:5px; opacity:0.8;">
        Bot running... <br>
        <button id="stopBot" style="color:black;">Stop</button>
    </div>`;
    document.body.appendChild(panel);

    // Start loop
    const intervalId = setInterval(autoRegister, CONFIG.refreshInterval);

    // Stop button handler
    document.getElementById('stopBot').addEventListener('click', () => {
        clearInterval(intervalId);
        panel.innerHTML = "Bot stopped.";
        log("Bot stopped by user.", 'red');
    });

})();