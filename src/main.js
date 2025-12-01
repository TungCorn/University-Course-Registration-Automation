import { CONFIG } from './config.js';
import { logger, sleep, isRegistrationPage } from './utils.js';

/**
 * Main automation logic
 * EDUCATIONAL PURPOSES ONLY - demonstrates DOM manipulation
 */
async function main() {
    if (!isRegistrationPage()) {
        logger("Not on registration page. Bot is idle.", "warning");
        return;
    }

    logger("Bot started...", "info");

    while (true) {
        try {
            const checkboxes = document.querySelectorAll(CONFIG.selectors.checkbox);
            let hasAction = false;

            checkboxes.forEach(chk => {
                // Check if checkbox value is in target list
                if (CONFIG.targetCourses.includes(chk.value)) {
                    if (!chk.checked && !chk.disabled) {
                        chk.click();
                        logger(`Selected course: ${chk.value}`, "success");
                        hasAction = true;
                    }
                }
            });

            // If action was taken, submit the form
            if (hasAction) {
                await sleep(CONFIG.timeout.submitDelay);
                const saveBtn = document.querySelector(CONFIG.selectors.submitBtn);
                
                if (saveBtn) {
                    saveBtn.click();
                    logger("Clicked save button!", "success");
                    // Optional: break loop after saving
                    // break; 
                } else {
                    logger("Error: Save button not found", "error");
                }
            }

            // Wait before next scan
            await sleep(CONFIG.timeout.stepDelay);

        } catch (e) {
            logger(`Runtime error: ${e.message}`, "error");
            await sleep(3000); // Longer wait on error
        }
    }
}

// Start
main();