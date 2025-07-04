const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentColor = '#000000';
let isErasing = false;
let currentBrushSize = 2;

// Set canvas size to be responsive
function resizeCanvas() {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.7;
    const ratio = 800 / 500; // Original canvas ratio
    
    if (maxWidth / ratio <= maxHeight) {
        canvas.width = maxWidth;
        canvas.height = maxWidth / ratio;
    } else {
        canvas.width = maxHeight * ratio;
        canvas.height = maxHeight;
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Event listeners
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);

// Color selection
document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', () => {
        currentColor = color.getAttribute('data-color');
        isErasing = false;
        document.getElementById('eraser').classList.remove('active');
    });
});

// Eraser button
document.getElementById('eraser').addEventListener('click', () => {
    isErasing = !isErasing;
    document.getElementById('eraser').classList.toggle('active', isErasing);
});

// Clear button
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Brush size
document.getElementById('brush-size').addEventListener('input', (e) => {
    currentBrushSize = e.target.value;
});

function startDraw(event) {
    isDrawing = true;
    draw(event);
}

function draw(event) {
    if (!isDrawing) return;
    
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    
    if (isErasing) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    } else {
        ctx.strokeStyle = currentColor;
    }
    
    ctx.lineWidth = currentBrushSize;
    
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (canvas.width / rect.width);
    const y = (event.clientY - rect.top) * (canvas.height / rect.height);
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDraw() {
    isDrawing = false;
    ctx.beginPath();
}

// Initialize with black color
document.querySelector('.color.black').click();