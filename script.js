// Emoji kartu
const emojis = ['🤓','🎉','🧠','👁️','🥶','🍞','👀','🔐','👍','🤝','🤳','✍️','🫵'];

// Player setup
let players = [];
let currentPlayer = 0;
const totalPlayers = 2; // bisa diubah sesuai setup
let timer = 0;
let interval;

document.getElementById('start-game').addEventListener('click', () => {
  for(let i=0;i<totalPlayers;i++){
    players.push({name:'Player '+(i+1), score:0});
  }
  document.getElementById('player-setup').style.display='none';
  startTurn();
});

function startTurn(){
  document.getElementById('game').style.display='block';
  document.getElementById('timer').innerText = `Waktu: 0`;
  timer=0;
  interval = setInterval(()=>{
    timer++;
    document.getElementById('timer').innerText = `Waktu: ${timer} detik`;
    if(timer>=120){ // 2 menit
      clearInterval(interval);
      nextPlayer();
    }
  },1000);
  renderCards();
}

function nextPlayer(){
  currentPlayer++;
  if(currentPlayer>=players.length){
    alert('Semua giliran selesai!');
  }else{
    alert(`Giliran berikutnya: ${players[currentPlayer].name}`);
    startTurn();
  }
}

// Render kartu
function renderCards(){
  const container = document.getElementById('cards-container');
  container.innerHTML='';
  const cardSet = emojis.slice(0,6);
  const pairSet = [...cardSet, ...cardSet];
  pairSet.sort(()=>0.5-Math.random());
  pairSet.forEach((emoji,i)=>{
    const card = document.createElement('div');
    card.className='card';
    card.dataset.emoji=emoji;
    card.innerText='❓';
    card.addEventListener('click', flipCard);
    container.appendChild(card);
  });
}

// Flip kartu
let first=null, second=null;
function flipCard(){
  document.getElementById('click-sound').play();
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

// Background music autoplay
document.getElementById('bg-music').play().catch(()=>{});
