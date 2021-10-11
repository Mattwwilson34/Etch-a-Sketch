const renderGrid = (gridSize = 16) => {
    const root = document.documentElement;
    const squareContainer = document.querySelector('.grid-container');
    let boxWidth = 800 / gridSize;
    let boxHeight = 800 / gridSize;

    //update css variable with new box sizes
    root.style.setProperty('--num-columns', gridSize);
    root.style.setProperty('--box-height', boxHeight + 'px');
    root.style.setProperty('--box-width', boxWidth + 'px');

    for (let i = 0; i < gridSize ** 2; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-brightness', 1);
        squareContainer.append(square);
    }
};
const randomRGB = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const color = `rgb(${r}, ${g}, ${b})`;
    return color;
};
const addBoxEventListeners = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('mouseenter', (e) => {
            let squareBrightness = e.target.getAttribute('data-brightness');
            square.style.filter = `brightness(${(squareBrightness -= 0.1)})`;
            square.style.background = `${randomRGB()}`;
            square.setAttribute('data-brightness', squareBrightness);
        });
    });
};
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};
const addResetBtnEventListener = () => {
    const resetBtn = document.querySelector('.reset');
    const squares = document.querySelectorAll('.square');
    const squareContainer = document.querySelector('.grid-container');

    resetBtn.addEventListener('click', (e) => {
        squares.forEach((square) => {
            square.classList.remove('square-hover');
        });
        removeAllChildNodes(squareContainer);
        gridSize = prompt('Enter in a new grid size');
        if (gridSize > 100) {
            gridSize = prompt('Grid size cannot be greater than 100x100. Please enter a new grid size.');
        }
        renderGrid(gridSize);
        addBoxEventListeners();
    });
};
const main = () => {
    renderGrid();
    addBoxEventListeners();
    addResetBtnEventListener();
    console.log(randomRGB());
};

main();
