document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('#hero-animation-services');
    const items = container.querySelectorAll('#hero-animation-service');
    const length = items.length;

    let keyframes = '';

    for (let i = 0; i < length; i++) {
        const offset = -(i * 100);
        const multiple = length - 1;
        const percentage = 100 / multiple;

        keyframes += `
        ${i * percentage}% {
        transform: translateY(${offset}%);
        }
    `;
    }

    function getStyleSheetByName(name) {
        const styleSheets = document.styleSheets;

        for (let i = 0; i < styleSheets.length; i++) {
            const styleSheet = styleSheets[i];

            if (styleSheet.ownerNode.id === name) {
                
                return styleSheet;
            }
        }

        return null;
    }

    const targetStyleSheet = getStyleSheetByName("orb-services-css");

    if (targetStyleSheet) {
        targetStyleSheet.insertRule(`@keyframes cycle { ${keyframes} }`, targetStyleSheet.cssRules.length);
    } else {
        console.log("Stylesheet not found");
    }
    document.documentElement.style.setProperty('--animation-duration', `${length}s`);
});
