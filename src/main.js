import { CONFIG } from './config.js';
import { logger, sleep, isRegistrationPage } from './utils.js';

/**
 * Main automation logic
 * EDUCATIONAL PURPOSES ONLY - demonstrates DOM manipulation
 */
const MAX_RETRIES = 50; // Prevent infinite loop
let retryCount = 0;

async function main() {
    if (!isRegistrationPage()) {
        logger("Not on registration page. Bot is idle.", "warning");
        return;
    }

    logger("Bot started...", "info");

 while (retryCount < MAX_RETRIES) {
        try {
            const checkboxes = document.querySelectorAll(CONFIG.selectors.checkbox);
            let hasAction = false;

            checkboxes.forEach(chk => {
                if (CONFIG.targetCourses.includes(chk.value)) {
                    if (!chk.checked && !chk.disabled) {
                        chk.click();
                        logger(`Selected course: ${chk.value}`, "success");
                        hasAction = true;
                    } else if (chk.disabled) {
                        logger(`Course ${chk.value} is full/locked`, "warning");
                    }
                }
            });

            if (hasAction) {
                await sleep(CONFIG.timeout.submitDelay);
                const saveBtn = document.querySelector(CONFIG.selectors.submitBtn);
                
                if (saveBtn) {
                    saveBtn.click();
                    logger("Clicked save button!", "success");
                } else {
                    logger("Error: Save button not found", "error");
                }
            }

            retryCount++;
            logger(`Scan ${retryCount}/${MAX_RETRIES}`, "info");
            await sleep(CONFIG.timeout.stepDelay);

        } catch (e) {
            logger(`Runtime error: ${e.message}`, "error");
            retryCount++;
            await sleep(3000);
        }
    }

    logger("Max retries reached. Bot stopped.", "warning");
}

main();