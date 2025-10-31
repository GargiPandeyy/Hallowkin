let basket = document.getElementById('basket');
let gameArea = document.getElementById('gameArea');
let basketX = 350;
let basketWidth = 60;
let gameWidth = 800;
let pumpkins = [];
let fallSpeed = 3;
let spawnRate = 1500;
let score = 0;
let highScore = 0;
let scoreDisplay = document.getElementById('score');
let highScoreDisplay = document.getElementById('highScore');
let timeLeft = 60;
let timerDisplay = document.getElementById('timer');
let gameRunning = true;
let pumpkinInterval;

function setDifficulty(level) {
    let buttons = document.querySelectorAll('.diffBtn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if(level === 'easy') {
        fallSpeed = 3;
        spawnRate = 1500;
    } else if(level === 'medium') {
        fallSpeed = 5;
        spawnRate = 1000;
    } else if(level === 'hard') {
        fallSpeed = 7;
        spawnRate = 700;
    }

    clearInterval(pumpkinInterval);
    pumpkinInterval = setInterval(createPumpkin, spawnRate);
}

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
    let x = Math.random() * (gameWidth - 50);
    pumpkin.style.left = x + 'px';
    pumpkin.style.top = '-50px';
    gameArea.appendChild(pumpkin);
    pumpkins.push({element: pumpkin, y: -50, x: x});
}

function checkCollision(pumpkin) {
    let basketY = 520;
    if(pumpkin.y >= basketY && pumpkin.y <= basketY + 60) {
        if(pumpkin.x >= basketX && pumpkin.x <= basketX + basketWidth) {
            return true;
        }
    }
    return false;
}

function countdown() {
    if(timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
    } else {
        gameRunning = false;
        clearInterval(pumpkinInterval);
    }
}

function gameLoop() {
    if(!gameRunning) return;

    for(let i = pumpkins.length - 1; i >= 0; i--) {
        pumpkins[i].y += fallSpeed;
        pumpkins[i].element.style.top = pumpkins[i].y + 'px';

        if(checkCollision(pumpkins[i])) {
            score += 10;
            scoreDisplay.textContent = score;
            if(score > highScore) {
                highScore = score;
                highScoreDisplay.textContent = highScore;
            }
            pumpkins[i].element.remove();
            pumpkins.splice(i, 1);
        } else if(pumpkins[i].y > 600) {
            pumpkins[i].element.remove();
            pumpkins.splice(i, 1);
        }
    }
    requestAnimationFrame(gameLoop);
}

pumpkinInterval = setInterval(createPumpkin, 1500);
setInterval(countdown, 1000);
gameLoop();
