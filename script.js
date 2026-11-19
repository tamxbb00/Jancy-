var T="Happy Birthday, My Love, Jancy",i=0,n=document.getElementById('name');
(function t(){n.textContent=T.slice(0,i++);if(i<=T.length)setTimeout(t,90);else n.insertAdjacentHTML('beforeend',' <span class="em">\ud83d\udc93\ud83e\udd79</span>')})();
var bd=new Date(2026,10,18);
function tick(){var d=bd-new Date(),e=document.getElementById('count');
if(d>0)e.textContent=Math.floor(d/864e5)+' days '+Math.floor(d%864e5/36e5)+' hours to go \u2728';
else if(d>-864e5)e.textContent='It\u2019s your day! \ud83c\udf89';
else e.textContent='Your birthday celebration is today, with me \ud83c\udf89'}
tick();setInterval(tick,60000);
var R=["Your smile makes my whole day better.","You make me feel at home.","You are the kindest person I know.","You make ordinary moments special.","With you, my heart is at peace.","You are simply you, and that is my favourite thing.","You are my mentor and my queen. \ud83d\udc51","I don't need a reason to love you. You are the one I needed in my life. 💗"],ri=0;
function nextR(){document.getElementById('reason').textContent=R[ri%R.length];ri++;hearts(3)}
var L="Jancy,\n\nYou are the most lovable person in my world.\nThank you for every smile, every memory, and for just being you.\n\nI wish you a year full of happiness, peace, and all your dreams coming true.\n\nYou are my mentor and my queen. \ud83d\udc51\n\nI love you. Happy Birthday.\n\n💗𓏲ּ𝄢  \u2190 you\n💗🕸️𓏲ּ𝄢  \u2190 me";
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

var au=document.getElementById('song'),mu=document.getElementById('music'),sk=document.getElementById('seek'),cu=document.getElementById('cur'),du=document.getElementById('dur'),pb=document.getElementById('pbtn');
function fmt(s){s=Math.floor(s||0);return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
function toggleSong(){if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()}
pb.addEventListener('click',toggleSong);
var vn=document.getElementById('vinyl');
vn.addEventListener('click',toggleSong);
vn.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleSong()}});
au.addEventListener('play',function(){mu.classList.add('playing');pb.setAttribute('aria-label','Pause song');hearts(4)});
au.addEventListener('pause',function(){mu.classList.remove('playing');pb.setAttribute('aria-label','Play song')});
au.addEventListener('ended',function(){au.currentTime=0;sk.value=0;cu.textContent='0:00'});
au.addEventListener('loadedmetadata',function(){du.textContent=fmt(au.duration)});
au.addEventListener('timeupdate',function(){if(au.duration)sk.value=au.currentTime/au.duration*100;cu.textContent=fmt(au.currentTime)});
sk.addEventListener('input',function(){if(au.duration){au.currentTime=sk.value/100*au.duration;cu.textContent=fmt(au.currentTime)}});

/* ---- sketch: look closer (smooth dive into the strokes, which are made of her name) ---- */
(function(){
var sk=document.getElementById('sk'),btn=document.getElementById('lookBtn');
if(!sk||!btn)return;
var zm=null,zw=null,zi=null,zimg=null,hint=null,open=false,busy=false,F=0,st={s:1,px:.5,py:.5},raf=0;
var TARGET={x:.645,y:.385},MAXS=7.5,reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var hdReady=false,hdImg=null;
function preload(){if(hdImg)return;hdImg=new Image();hdImg.onload=function(){hdReady=true;if(zimg)zimg.src=hdImg.src};hdImg.src='sketch-hd.webp'}
setTimeout(preload,2500);btn.addEventListener('pointerenter',preload);
function ease(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
function clampP(){var h=.5/st.s;st.px=Math.min(1-h,Math.max(h,st.px));st.py=Math.min(1-h,Math.max(h,st.py))}
function apply(){clampP();var tx=F/2-st.s*F*st.px,ty=F/2-st.s*F*st.py;zi.style.transform='translate3d('+tx+'px,'+ty+'px,0) scale('+st.s+')'}
function tween(to,dur,done){cancelAnimationFrame(raf);var from={s:st.s,px:st.px,py:st.py},t0=null;
if(reduce||dur<=0){st.s=to.s;st.px=to.px;st.py=to.py;apply();if(done)done();return}
(function step(ts){if(t0===null)t0=ts;var k=Math.min(1,(ts-t0)/dur),e=ease(k);
st.s=Math.exp(Math.log(from.s)+(Math.log(to.s)-Math.log(from.s))*e);
st.px=from.px+(to.px-from.px)*e;st.py=from.py+(to.py-from.py)*e;apply();
if(k<1)raf=requestAnimationFrame(step);else if(done)done()})(performance.now?performance.now():0);
}
function build(){
zm=document.createElement('div');zm.id='zm';
zm.innerHTML='<div class="zw"><div class="zi"><img src="'+(hdReady?hdImg.src:'sketch.webp')+'" alt=""></div></div>'+
'<p class="zh">Look closely… every single line is your name 🤍<small>Drag to explore ✨</small></p><button class="zc" type="button">Close ✕</button>';
document.body.appendChild(zm);zw=zm.querySelector('.zw');zi=zm.querySelector('.zi');zimg=zi.querySelector('img');hint=zm.querySelector('.zh');
zm.addEventListener('click',function(e){if(!e.target.closest('.zw')&&!e.target.closest('.zc'))close()});
zm.querySelector('.zc').addEventListener('click',close);
var d=null;
zw.addEventListener('pointerdown',function(e){if(busy)return;cancelAnimationFrame(raf);d={x:e.clientX,y:e.clientY};zw.classList.add('drag');try{zw.setPointerCapture(e.pointerId)}catch(_){}});
zw.addEventListener('pointermove',function(e){if(!d)return;st.px-=(e.clientX-d.x)/(st.s*F);st.py-=(e.clientY-d.y)/(st.s*F);d={x:e.clientX,y:e.clientY};apply()});
function up(){d=null;zw.classList.remove('drag')}
zw.addEventListener('pointerup',up);zw.addEventListener('pointercancel',up);
}
function flipDelta(){var a=sk.getBoundingClientRect(),b=zw.getBoundingClientRect();return{tx:a.left+a.width/2-(b.left+b.width/2),ty:a.top+a.height/2-(b.top+b.height/2),s:a.width/b.width}}
function openZ(){if(open||busy)return;if(!zm)build();preload();open=true;busy=true;
F=zw.getBoundingClientRect().width;st={s:1,px:.5,py:.5};apply();hint.classList.remove('show');
zw.style.transition='none';var f=flipDelta();zw.style.transform='translate('+f.tx+'px,'+f.ty+'px) scale('+f.s+')';
zw.getBoundingClientRect();sk.style.visibility='hidden';zm.classList.add('on');
zw.style.transition='transform 1.25s cubic-bezier(.2,.9,.25,1.03)';zw.style.transform='none';
hearts(5);
setTimeout(function(){F=zw.getBoundingClientRect().width;apply();
tween({s:MAXS,px:TARGET.x,py:TARGET.y},6200,function(){busy=false;hint.classList.add('show')});
setTimeout(function(){hint.classList.add('show')},4800)},1100)}
function close(){if(!open)return;open=false;busy=true;hint.classList.remove('show');
tween({s:1,px:.5,py:.5},reduce?0:1500,function(){
var f=flipDelta();zm.classList.remove('on');
zw.style.transition='transform .9s cubic-bezier(.6,0,.3,1)';zw.style.transform='translate('+f.tx+'px,'+f.ty+'px) scale('+f.s+')';
setTimeout(function(){sk.style.visibility='';busy=false},880)})}
btn.addEventListener('click',openZ);
document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
window.addEventListener('resize',function(){if(open&&zw){zw.style.transition='none';zw.style.transform='none';F=zw.getBoundingClientRect().width;apply()}});
})();
