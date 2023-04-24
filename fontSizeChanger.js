// ==UserScript==
// @name          ChatGPT Font Size Changer with Side Pane Width Draggable
// @namespace     https://chat.openai.com/
// @description   The "Font Size Changer with Side Pane Width Draggable" script is a Tampermonkey user script that modifies the font size and other styles of web elements with the class ".text-base". It sets the font size, line height, font family, and font weight to predefined values for improved readability. Additionally, the script adjusts the max width of elements with the class ".xl:max-w-3xl" to a specific value. Furthermore, it deactivates the "font-size" property for elements with the class ".prose" by setting it to "inherit". These changes are made using the GM_addStyle function, making it easy to customize the font styles according to your preference. The script also allows you to change the width of elements with the class ".md:w-[260px]" (side pane) by dragging it with the cursor.
// @match         https://chat.openai.com/*a
// @author        Amitai Salmon
// @grant         GM_addStyle
// @version       2.0.0
// @require       https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    "use strict";

    // Define CSS values as variables
    let fontSize = 1.3;
    let lineHeight = 2.2;
    const TEXT_BASE_FONT_FAMILY = "Calibri";
    const TEXT_BASE_FONT_WEIGHT = "100";
    const XL_MAX_WIDTH = "70rem";
    const SIDE_MENU_MIN_WIDTH = 300; // minimum width of side pane in pixels
    var editMenu = 0;

    // Function to change the font size and side pane width
    function changeFontSizeAndSidePaneWidth() {
        GM_addStyle(`.text-base {
            font-size: ${fontSize}rem !important;
            line-height: ${lineHeight}rem !important;
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
        GM_addStyle(`.md\\:pb-6 {
            padding-bottom: 2.5rem !important;
        }`);
    }

    // Function to handle side pane width dragging
    function handleSidePaneWidthDrag(event) {
        if (event.buttons !== 1) return; // exit if mouse button is not pressed
        if (editMenu !== 1) return;
        const newWidth = event.clientX;
        const sidePane = document.querySelector(".md\\:w-\\[260px\\]");
        if (sidePane) {
            sidePane.style.setProperty("--side-pane-width", `${newWidth}px`);
        }
    }

    // Function to increase font size
    function increaseFontSize() {
        fontSize += 0.2;
        changeFontSizeAndSidePaneWidth();
    }

    // Function to decrease font size
    function decreaseFontSize() {
        fontSize -= 0.2;
        if (fontSize < 0.2) {
            fontSize = 0.2;
        }
        changeFontSizeAndSidePaneWidth();
    }
    // Function to increase line height
    function increaseLineHeight() {
        lineHeight += 0.2;
        changeFontSizeAndSidePaneWidth();
    }

    // Function to decrease line height
    function decreaseLineHeight() {
        lineHeight -= 0.2;
        if (lineHeight < 0.2) {
            lineHeight = 0.2;
        }
        changeFontSizeAndSidePaneWidth();
    }

    // Create buttons for font size and line height controls
    const increaseFontSizeButton = document.createElement("button");
    increaseFontSizeButton.textContent = "+";
    increaseFontSizeButton.style.position = "fixed";
    increaseFontSizeButton.style.bottom = "20px";
    increaseFontSizeButton.style.right = "100px";
    increaseFontSizeButton.style.zIndex = "9999";
    increaseFontSizeButton.addEventListener("click", increaseFontSize);
    increaseFontSizeButton.addEventListener("click", increaseLineHeight);

    const decreaseFontSizeButton = document.createElement("button");
    decreaseFontSizeButton.textContent = "-";
    decreaseFontSizeButton.style.position = "fixed";
    decreaseFontSizeButton.style.bottom = "20px";
    decreaseFontSizeButton.style.right = "60px";
    decreaseFontSizeButton.style.zIndex = "9999";
    decreaseFontSizeButton.addEventListener("click", decreaseFontSize);
    decreaseFontSizeButton.addEventListener("click", decreaseLineHeight);

    const editMenuButtom = document.createElement("button");
    editMenuButtom.textContent = "edit menu";
    editMenuButtom.style.position = "fixed";
    editMenuButtom.style.bottom = "20px";
    editMenuButtom.style.right = "140px";
    editMenuButtom.style.zIndex = "9999";
    editMenuButtom.addEventListener("click", myfunc);

    // Add buttons to the DOM
    document.body.appendChild(increaseFontSizeButton);
    document.body.appendChild(decreaseFontSizeButton);
    document.body.appendChild(editMenuButtom);

    // Add event listener for side pane width dragging
    //window.addEventListener('dblclick', handleSidePaneWidthDrag);

    function myfunc() {
        if (editMenu == 0) {
            editMenu = 1;
            editMenuButtom.style.fontWeight = "bold";
        } else {
            editMenu = 0;
            editMenuButtom.style.fontWeight = "normal";
        }
    }

    window.addEventListener("mousemove", function(evt) {
        //if (evt.detail === 3) {
        handleSidePaneWidthDrag(evt);
        //}
    });

    // Fully loaded!

    // Call the initial function to apply font size and side pane width changes
    changeFontSizeAndSidePaneWidth();
})();