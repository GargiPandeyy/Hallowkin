let basket = document.getElementById('basket');
let gameArea = document.getElementById('gameArea');
let basketX = 350;
let basketWidth = 60;
let gameWidth = 800;

document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft' && basketX > 0) {
        basketX -= 30;
    }
    if(e.key === 'ArrowRight' && basketX < gameWidth - basketWidth) {
        basketX += 30;
    }
    basket.style.left = basketX + 'px';
});

document.addEventListener('mousemove', function(e) {
    let rect = gameArea.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    if(mouseX >= 0 && mouseX <= gameWidth - basketWidth) {
        basketX = mouseX;
        basket.style.left = basketX + 'px';
    }
});
