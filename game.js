let basket = document.getElementById('basket');
let gameArea = document.getElementById('gameArea');
let basketX = 350;
let basketWidth = 60;
let gameWidth = 800;
let pumpkins = [];
let fallSpeed = 3;

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

function createPumpkin() {
    let pumpkin = document.createElement('div');
    pumpkin.className = 'pumpkin';
    pumpkin.innerHTML = '🎃';
    pumpkin.style.left = Math.random() * (gameWidth - 50) + 'px';
    pumpkin.style.top = '-50px';
    gameArea.appendChild(pumpkin);
    pumpkins.push({element: pumpkin, y: -50});
}

function gameLoop() {
    for(let i = pumpkins.length - 1; i >= 0; i--) {
        pumpkins[i].y += fallSpeed;
        pumpkins[i].element.style.top = pumpkins[i].y + 'px';

        if(pumpkins[i].y > 600) {
            pumpkins[i].element.remove();
            pumpkins.splice(i, 1);
        }
    }
    requestAnimationFrame(gameLoop);
}

setInterval(createPumpkin, 1500);
gameLoop();
