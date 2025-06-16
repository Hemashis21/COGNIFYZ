const colorChangeButton = document.getElementById('colorChangeButton');

const body = document.body;

const colors = ['#f0f0f0', '#ffcc99', '#a0c4ff', '#b3e0b3', '#ffe6b3', '#c9c9ff'];
let currentColorIndex = 0;

colorChangeButton.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;

    body.style.backgroundColor = colors[currentColorIndex];
});