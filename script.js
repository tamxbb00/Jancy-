var T="Happy Birthday, Jancy!",i=0,n=document.getElementById('name');
(function t(){n.textContent=T.slice(0,i++);if(i<=T.length)setTimeout(t,90)})();
var bd=new Date(2026,10,18);
function tick(){var d=bd-new Date(),e=document.getElementById('count');
if(d>0)e.textContent=Math.floor(d/864e5)+' days '+Math.floor(d%864e5/36e5)+' hours to go \u2728';
else e.textContent='It\u2019s your day! \ud83c\udf89'}
tick();setInterval(tick,60000);
var R=["Your smile makes my whole day better.","You make me feel at home.","You are the kindest person I know.","You make ordinary moments special.","With you, my heart is at peace.","You are simply you, and that is my favourite thing.","I don't need a reason to love you. You are the one I needed in my life. 💗"],ri=0;
function nextR(){document.getElementById('reason').textContent=R[ri%R.length];ri++;hearts(3)}
var L="Jancy,\n\nYou are the most lovable person in my world.\nThank you for every smile, every memory, and for just being you.\n\nI wish you a year full of happiness, peace, and all your dreams coming true.\n\nI love you. Happy Birthday.\n\n💗𓏲ּ𝄢  \u2190 you\n💗🕸️𓏲ּ𝄢  \u2190 me";
var done=false;
function go(){var m=document.getElementById('more');m.className='';m.scrollIntoView({behavior:'smooth'});hearts(10);
if(done)return;done=true;var k=0,l=document.getElementById('letter');
(function t(){l.textContent=L.slice(0,k++);if(k<=L.length)setTimeout(t,45)})()}
function hearts(c){var e=['💗𓏲ּ𝄢','\ud83d\udc96','\u2728','💗🕸️𓏲ּ𝄢','\ud83e\udd0d'];
for(var j=0;j<c;j++)(function(j){setTimeout(function(){var s=document.createElement('span');s.className='h';s.textContent=e[j%5];
s.style.left=Math.random()*100+'vw';s.style.fontSize=(16+Math.random()*20)+'px';s.style.animationDuration=(3+Math.random()*3)+'s';
document.body.appendChild(s);setTimeout(function(){s.remove()},6500)},j*120)})(j)}

var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.2});
document.querySelectorAll('#more .card,#more .s,#more .beat').forEach(function(x){x.classList.add('rv');io.observe(x)});
setInterval(function(){if(!document.hidden)hearts(1)},4500);
function burst(x,y){var e=['✨','💗𓏲ּ𝄢','💖','💗🕸️𓏲ּ𝄢'];
for(var j=0;j<3;j++){var s=document.createElement('span');s.className='sp';s.textContent=e[j%4];
s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',(Math.random()*160-80)+'px');s.style.setProperty('--dy',(Math.random()*160-100)+'px');
document.body.appendChild(s);(function(s){setTimeout(function(){s.remove()},1000)})(s)}}
document.addEventListener('pointerdown',function(e){burst(e.clientX,e.clientY)});
var O=["Close your eyes and put your hand on your heart. That beat is me, right there with you. 💗🕸️𓏲ּ𝄢","You are stronger than you know, and you are never alone. Take a deep breath. This will pass, and I am here.","Somewhere, someone thinks you are the best thing that ever happened to them. That someone is me. 🤍"];
function op(i){var p=document.getElementById('op');p.style.opacity=0;setTimeout(function(){p.textContent=O[i];p.style.transition='opacity .8s';p.style.opacity=1},250);hearts(3)}
