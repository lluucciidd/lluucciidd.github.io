const yesBtn = document.getElementById('yesBtn');
const playground = document.getElementById('playground');
const card = document.getElementById('card');
const music = document.getElementById('music');

let yesScale = 1;
let currentNoBtn = document.getElementById('noBtn');

function spawnHeart() {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '💖';
    const rect = yesBtn.getBoundingClientRect();
    h.style.left = rect.left + rect.width / 2 + 'px';
    h.style.top = rect.top + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1500);
}

function spawnNewNo() {
    const no = document.createElement('button');
    no.textContent = 'No';
    no.style.background = '#adb5bd';
    no.style.color = '#212529';
    no.style.zIndex = '2';

    const pad = 40;
    const width = playground.clientWidth;
    const height = playground.clientHeight;
    let x, y;
    const edge = Math.floor(Math.random() * 4); // 0=top,1=right,2=bottom,3=left
    switch(edge){
        case 0: // top
        x = Math.random() * (width - pad);
        y = 0;
        break;
        case 1: // right
        x = width - 2*pad;
        y = Math.random() * (height - pad);
        break;
        case 2: // bottom
        x = Math.random() * (width - pad);
        y = height - pad - 8;
        break;
        case 3: // left
        x = 0;
        y = Math.random() * (height - pad);
        break;
    }

    no.style.left = x + 'px';
    no.style.top = y + 'px';

    no.addEventListener('click', handleNoClick);
    playground.appendChild(no);
    currentNoBtn = no;
}

function handleNoClick() {
    yesScale *= 1.3;
    yesBtn.style.transform = `translate(-110%, -50%) scale(${yesScale})`;

    spawnHeart();
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 300);

    if (music.paused) music.play();

    this.remove();
    spawnNewNo();
}

currentNoBtn.addEventListener('click', handleNoClick);

setInterval(() => {
    if (!currentNoBtn) return;
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = currentNoBtn.getBoundingClientRect();

    const dx = noRect.left - yesRect.left;
    const dy = noRect.top - yesRect.top;

    yesBtn.style.left = yesBtn.offsetLeft + dx * 0.02 + 'px';
    yesBtn.style.top = yesBtn.offsetTop + dy * 0.02 + 'px';
}, 80);

yesBtn.addEventListener('click', () => {
    document.getElementById('question').style.display = 'none';
    playground.style.display = 'none';
    document.getElementById('happyPage').style.display = 'flex';
    if (music.paused) music.play();

    for (let i = 0; i < 80; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + '%';
        c.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`;
        c.style.animationDuration = 2 + Math.random() * 2 + 's';
        card.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
});