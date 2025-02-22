//preloader
const progressRing = document.querySelector('.progress-ring__indicator');

const radius = progressRing.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    progressRing.style.strokeDashoffset = offset;

}

// Simulate loading progress
let progress = 0;
const interval = setInterval(() => {
    progress += 1;
    setProgress(progress);

    if (progress >= 100) {
        clearInterval(interval);
        hideScreen(screenPreloader);
    }
}, 30);
// game progress
const gameLoaderProgress = document.querySelector('.game-progress-bar__line-progress');
function setGameLoaderProgress(percent) {
    gameLoaderProgress.style.width = `${percent}%`;
}
let gameLoadProgress = 0;
function startLoadGame() {
    const intervalGame = setInterval(() => {
        gameLoadProgress += 1;
        setGameLoaderProgress(gameLoadProgress);

        if (gameLoadProgress >= 100) {
            clearInterval(intervalGame);

            startScan();
        }
    }, 30);
}


//header game
const headerGame = document.querySelector('.game__header');
const headerGameInfo = headerGame.querySelector('.header-btn_info');
const headerGameProgress = headerGame.querySelector('.game__progress');
// show\hide screen
function showScreen(screen) {
    screen.classList.remove('hidden')
};
function hideScreen(screen) {
    screen.classList.add('hidden')
};

// preloader
const screenPreloader = document.querySelector('.screen-preloader');

// acces camera
const screenAccesCamera = document.querySelector('.screen-camera-acces');
// onbording
const screenOnbording = document.querySelector('.screen-onbord');
//game prloader
const screenPreloadGame = document.querySelector('.screen-prloader-game')
// scan
const screenScanBox = document.querySelector('.scan-box');
const screenScanLocation = document.querySelector('.scan-location');
const screenScanResize = document.querySelector('.scan-resize');

//tutorial
const screenTutorial = document.querySelector('.screen-tutorial');
// game win
const screenWin = document.querySelector('.screen-winner');
// game lose
const screenLose = document.querySelector('.screen-loser');
// info
const screenInfo = document.querySelector('.screen-info')

// sound 
const btnSound = document.querySelector('.header-btn_sound');
let sound = true;
btnSound.addEventListener('click', () => {
    if (sound) {
        btnSound.classList.remove('sound-on');
        sound = false;
    } else {
        btnSound.classList.add('sound-on');
        sound = true;
    }
});


//game ring
const gameRings = document.querySelectorAll('.game__progress-ring');

// colors: yelow, blue,green,pink,orang
function setRing(colorClass) {
    for (let i = 0; i < gameRings.length; i++) {
        const element = gameRings[i];
        if (!element.classList.contains('full-ring')) {
            element.classList.add('full-ring');
            element.classList.add(colorClass);
            addWinRing(colorClass)
           


            break;
        }

    }
};
function addWinRing(colorClass) {
    const winRing = document.createElement('div');
    winRing.className ='win-ring';
    winRing.innerHTML = `
        <div class="game__progress-ring ${colorClass}"></div>
        <span>+1</span>
    `;
    document.body.appendChild(winRing);
    
    setTimeout(()=> {
        winRing.classList.add('animation')
        setTimeout(()=> winRing.remove(),900)
       
    },500)
}
function removeAllRings() {
    gameRings.forEach((ring) => {
        ring.className = 'game__progress-ring';
    })
}



///ui

function AllowAcces() {
    hideScreen(screenAccesCamera);
    showScreen(screenOnbording);
    showScreen(headerGame);
}

function startGame() {
    startLoadGame();
    hideScreen(screenOnbording);
    showScreen(screenPreloadGame);
}

function startScan() {
    hideScreen(screenPreloadGame);
    showScreen(headerGame);
    showScreen(screenScanBox)
}

function scanBoxOk() {
    hideScreen(screenScanBox);
    showScreen(screenScanLocation);
}
function scanLocationOk() {
    hideScreen(screenScanLocation);
    showScreen(screenScanResize);
}
function scanResizeOk() {
    hideScreen(screenScanResize);
    showScreen(headerGameInfo);
    showScreen(headerGameProgress);
    showScreen(screenTutorial)
}
function tutorialOk() {
    hideScreen(screenTutorial);
    testBtnRings.style.display = ''
}
function userWinGame() {
    showScreen(screenWin);
}
function userLoseGame() {
    showScreen(screenLose);
}



function playGameAgain() {
    refreashBtn();
    
    hideScreen(screenWin);
    hideScreen(screenLose);
    testBtnRings.style.display = ''
}

// error
const errorSupport = document.querySelector('.error-support');
const errorCameraNo = document.querySelector('.error-camera-no');
const errorBoxNo = document.querySelector('.error-box-no');
const errorLocationNo = document.querySelector('.error-location-no');
const errorCameraAcces = document.querySelector('.error-camera-acces');

// test
const testBtnRings = document.querySelector('.test-btn_group_rings');

function missRing() {
for (let i = 0; i < testBtnRings.querySelectorAll('.test-button').length; i++) {
    const element = testBtnRings.querySelectorAll('.test-button')[i];
    if(element.style.display !== 'none') {
        element.style.display = 'none';
        break;
    }
    
};
 
 checkEndGame()
}
function testBtnRing(colorClass, el) {
    winGame = true;
    setRing(colorClass);
    el.style.display = 'none';
    
    checkEndGame()
}
function refreashBtn() {
    winGame = false;
    attemptsGame = 5;
    removeAllRings();
    testBtnRings.querySelectorAll('.test-button').forEach((ring)=> ring.style.display='');
    setTimeout(()=> {
        btnPromocode.classList.remove('copy_ok');
        btnPromocode.textContent = promo;
        btnPlayAgain.style.display = 'none';
    },600)
   
}


// GAME
let winGame = false;
let attemptsGame = 5;

function checkEndGame() {
    attemptsGame --;
    if(attemptsGame <= 0) {
        testBtnRings.style.display = 'none'
        if(winGame) {
            userWinGame()
        } else {
            userLoseGame()
        }
        
    }
}

//promocode
let promo = 423541;

const btnPromocode = document.querySelector('.btn_promocode');
const btnPlayAgain = document.querySelector('.btn_play-again');
const promocode = document.getElementById('promocode');

promocode.textContent = promo;
btnPromocode.addEventListener('click', ()=> {
    navigator.clipboard.writeText(promocode.textContent)
    .then(() => {
        btnPromocode.classList.add('copy_ok');
        btnPromocode.textContent = 'Промокод Скопирован';
        btnPlayAgain.style.display = '';
    })
    .catch(error => {
        console.error(`Текст не скопирован ${error}`)
  })
    
})