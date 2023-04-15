// ==UserScript==
// @name          ChatGPT Font Size Changer with Side Pane Width Draggable
// @namespace     https://chat.openai.com/
// @version       1.1
// @description   The "Font Size Changer with Side Pane Width Draggable" script is a Tampermonkey user script that modifies the font size and other styles of web elements with the class ".text-base". It sets the font size, line height, font family, and font weight to predefined values for improved readability. Additionally, the script adjusts the max width of elements with the class ".xl:max-w-3xl" to a specific value. Furthermore, it deactivates the "font-size" property for elements with the class ".prose" by setting it to "inherit". These changes are made using the GM_addStyle function, making it easy to customize the font styles according to your preference. The script also allows you to change the width of elements with the class ".md:w-[260px]" (side pane) by dragging it with the cursor.
// @match         *://*/*
// @author       Amitai Salmon
// @grant         GM_addStyle
// ==/UserScript==

(function() {
    "use strict";

    // Define CSS values as constants
    const TEXT_BASE_FONT_SIZE = "1.3rem";
    const TEXT_BASE_LINE_HEIGHT = "2.1rem";
    const TEXT_BASE_FONT_FAMILY = "Calibri";
    const TEXT_BASE_FONT_WEIGHT = "100";
    const XL_MAX_WIDTH = "70rem";
    const SIDE_MENU_MIN_WIDTH = 300; // minimum width of side pane in pixels

    // Function to change the font size and side pane width
    function changeFontSizeAndSidePaneWidth() {
        GM_addStyle(`.text-base {
            font-size: ${TEXT_BASE_FONT_SIZE} !important;
            line-height: ${TEXT_BASE_LINE_HEIGHT} !important;
            font-family: ${TEXT_BASE_FONT_FAMILY} !important;
            font-weight: ${TEXT_BASE_FONT_WEIGHT} !important;
        }`);
        GM_addStyle(`.xl\\:max-w-3xl {
            max-width: ${XL_MAX_WIDTH} !important;
        }`);
        GM_addStyle(`.md\\:w-\\[260px\\] {
            width: var(--side-pane-width, ${SIDE_MENU_MIN_WIDTH}px) !important;
            overflow: hidden;
            transition: width 0.3s;
        }`);
        GM_addStyle(`.md\\:w-\\[260px\\]:active {
            cursor: ew-resize;
            user-select: none;
        }`);
        GM_addStyle(`.prose {
            font-size: inherit !important;
            line-height: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
        }`);
    }

    // Function to handle side pane width dragging
    function handleSidePaneWidthDrag(event) {
        if (event.buttons !== 1) return; // exit if mouse button is not pressed
        const newWidth = event.clientX;
        const sidePane = document.querySelector(".md\\:w-\\[260px\\]");
        if (sidePane) {
            sidePane.style.setProperty("--side-pane-width", `${newWidth}px`);
        }
    }

    changeFontSizeAndSidePaneWidth();
    document.addEventListener("mousemove", handleSidePaneWidthDrag);
    document.addEventListener("mouseup", handleSidePaneWidthDrag);
})();