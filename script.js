const emojis = ['🤓','🎉','🧠','👁️','🥶','🍞','👀','🔐','👍','🤝','🤳','✍️','🫵'];

let players = [];
let currentPlayer = 0;
let timer = 0;
let interval;
let totalPlayers = 0;

const playerContainer = document.getElementById('players');
const addBtn = document.getElementById('add-player');
const startBtn = document.getElementById('start-game');

addBtn.addEventListener('click', ()=>{
  if(players.length>=7){ alert('Maksimal 7 pemain'); return;}
  const div = document.createElement('div');
  div.innerHTML = `
    Nama: <input type="text" class="player-name" placeholder="Player ${players.length+1}" required />
    Sekolah: <input type="text" class="player-school" placeholder="SD/SMP/SMA/SMK/Kuliah" required />
    Kelas: <input type="text" class="player-class" placeholder="Kelas" required />
  `;
  playerContainer.appendChild(div);
  players.push({});
});

startBtn.addEventListener('click', ()=>{
  const names = document.querySelectorAll('.player-name');
  const schools = document.querySelectorAll('.player-school');
  const classes = document.querySelectorAll('.player-class');
  for(let i=0;i<players.length;i++){
    if(!names[i].value || !schools[i].value || !classes[i].value){ alert('Isi semua data pemain!'); return;}
    players[i].name = names[i].value;
    players[i].school = schools[i].value;
    players[i].class = classes[i].value;
    players[i].score = 0;
  }
  totalPlayers = players.length;
  document.getElementById('player-setup').style.display='none';
  document.getElementById('game').style.display='block';
  startTurn();
});

// Background music & click
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.3;
const clickSound = document.getElementById('click-sound');

let first=null, second=null;

function startTurn(){
  document.getElementById('timer').innerText = 'Waktu: 0 detik';
  timer = 0;
  renderCards();
  interval = setInterval(()=>{
    timer++;
    document.getElementById('timer').innerText = `Waktu: ${timer} detik`;
    if(timer>=120){
      clearInterval(interval);
      nextPlayer();
    }
  },1000);
}

function nextPlayer(){
  currentPlayer++;
  if(currentPlayer>=totalPlayers){
    alert('Semua giliran selesai!');
    return;
  }else{
    alert(`Giliran: ${players[currentPlayer].name}`);
    startTurn();
  }
}

function renderCards(){
  const container = document.getElementById('cards-container');
  container.innerHTML='';
  const cardSet = emojis.slice(0,6);
  const pairSet = [...cardSet, ...cardSet];
  pairSet.sort(()=>0.5-Math.random());
  pairSet.forEach((emoji)=>{
    const card = document.createElement('div');
    card.className='card';
    card.dataset.emoji = emoji;
    card.innerText='❓';
    card.addEventListener('click', flipCard);
    container.appendChild(card);
  });
}

function flipCard(){
  clickSound.play();
  if(!first){
    first=this;
    first.innerText=first.dataset.emoji;
  }else if(!second && this!==first){
    second=this;
    second.innerText=second.dataset.emoji;
    setTimeout(checkMatch,500);
  }
}

function checkMatch(){
  if(first.dataset.emoji===second.dataset.emoji){
    players[currentPlayer].score++;
    first=null; second=null;
  }else{
    first.innerText='❓';
    second.innerText='❓';
    first=null; second=null;
  }
  updateLeaderboard();
}

function updateLeaderboard(){
  const lb = document.getElementById('leaderboard');
  lb.innerHTML='';
  players.forEach(p=>{
    lb.innerHTML += `<div>${p.name}: ${p.score}</div>`;
  });
}

// Chat antar pemain
const chatBox = document.getElementById('chat-box');
document.getElementById('chat-send').addEventListener('click', ()=>{
  const input = document.getElementById('chat-input');
  if(input.value.trim()==='') return;
  chatBox.innerHTML += `<div><b>${players[currentPlayer].name}:</b> ${input.value}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
  input.value='';
});
