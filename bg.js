/* Audio-reactive animated background.
   Uses the same <audio id="song"> element as script.js (loaded after it). */
(function(){
var au=document.getElementById('song'),mu=document.getElementById('music');
var cv=document.createElement('canvas');cv.id='bg';cv.setAttribute('aria-hidden','true');
document.body.insertBefore(cv,document.body.firstChild);
var cx=cv.getContext('2d'),W=0,H=0;
function size(){var d=Math.min(window.devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)}
size();addEventListener('resize',size);

var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---------- audio analysis ---------- */
var ac=null,an=null,fd=null,tried=false;
function setup(){
  if(tried)return;tried=true;
  /* file:// pages can't be analysed (browser would mute the song), so fall back to a soft simulated pulse */
  if(location.protocol==='file:')return;
  try{
    var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    ac=new AC();var src=ac.createMediaElementSource(au);
    an=ac.createAnalyser();an.fftSize=1024;an.smoothingTimeConstant=.78;
    src.connect(an);an.connect(ac.destination);fd=new Uint8Array(an.frequencyBinCount);
  }catch(e){an=null}
}
au.addEventListener('play',function(){setup();if(ac&&ac.state==='suspended')ac.resume()});

var bass=0,mid=0,high=0,energy=0,avgB=0,lastBeat=0,beatKick=0,hue=0,bars=[],NB=48;
for(var q=0;q<NB;q++)bars.push(0);
function ease(cur,tgt,up,down){return cur+(tgt-cur)*(tgt>cur?up:down)}

function analyse(t){
  var playing=!au.paused&&!au.ended,b=0,m=0,h=0;
  if(playing&&an){
    an.getByteFrequencyData(fd);
    var bw=ac.sampleRate/an.fftSize,i;
    var band=function(lo,hi){var a=Math.max(1,Math.round(lo/bw)),z=Math.min(fd.length-1,Math.round(hi/bw)),s=0,c=0;for(var j=a;j<=z;j++){s+=fd[j];c++}return c?s/c/255:0};
    b=band(40,200);m=band(200,2000);h=band(2000,9000);
    /* spectrum bars, log-spaced */
    for(i=0;i<NB;i++){
      var f0=60*Math.pow(110,i/NB),f1=60*Math.pow(110,(i+1)/NB);
      bars[i]=ease(bars[i],band(f0,f1),.5,.12);
    }
  }else if(playing){
    /* simulated pulse (no analyser available) */
    var ph=t/1000*2*Math.PI*1.25;
    b=.45+.35*Math.max(0,Math.sin(ph))**3;m=.35+.15*Math.sin(t/700);h=.25+.1*Math.sin(t/230);
    for(var k=0;k<NB;k++)bars[k]=ease(bars[k],.25+.3*Math.abs(Math.sin(t/500+k*.4))*b,.3,.1);
  }else{
    for(var z=0;z<NB;z++)bars[z]*=.9;
  }
  bass=ease(bass,b,.6,.1);mid=ease(mid,m,.4,.08);high=ease(high,h,.5,.1);
  energy=(bass*1.2+mid+high*.6)/2.8;
  /* beat detection: bass jumps above its running average */
  avgB=avgB*.93+b*.07;
  var beat=false;
  if(playing&&b>avgB*1.22&&b>.3&&t-lastBeat>280){beat=true;lastBeat=t}
  beatKick*=.9;if(beat)beatKick=1;
  return beat;
}

/* ---------- visual elements ---------- */
var css=getComputedStyle(document.documentElement),pal={a:'#e0457b',l:'#ffb3cf',p:'#c77dff',w:'#ff8fa3',dark:false},palT=0;
function readPal(){
  var a=css.getPropertyValue('--accent').trim()||'#e0457b';
  pal.a=a;pal.dark=(css.getPropertyValue('--bg').trim().toLowerCase()==='#1c0f15');
  pal.l=pal.dark?'#ff9ec4':'#ffb3cf';pal.p=pal.dark?'#b07cff':'#d59bff';pal.w=pal.dark?'#ff7a8a':'#ff9aa8';
}
readPal();

var orbs=[],O=7,cols=['a','l','p','w','a','l','p'];
for(var o=0;o<O;o++)orbs.push({x:Math.random(),y:Math.random(),r:.22+Math.random()*.2,sx:.00006+Math.random()*.00008,sy:.00005+Math.random()*.00008,ph:Math.random()*6.28,c:cols[o]});

var parts=[],rings=[];
function spawn(x,y,burst){
  var p={x:x,y:y,vx:(Math.random()-.5)*(burst?3.2:.5),vy:burst?-(1+Math.random()*2.6):-(.3+Math.random()*.7),
    s:6+Math.random()*(burst?16:12),a:.0,life:0,max:(burst?110:260)+Math.random()*120,
    heart:Math.random()<.55,c:cols[(Math.random()*cols.length)|0],rot:(Math.random()-.5)*.6,w:Math.random()*6.28};
  parts.push(p);if(parts.length>160)parts.shift();
}
function heart(x,y,s){
  cx.beginPath();cx.moveTo(x,y+s*.35);
  cx.bezierCurveTo(x-s*.9,y-s*.25,x-s*.5,y-s*.95,x,y-s*.4);
  cx.bezierCurveTo(x+s*.5,y-s*.95,x+s*.9,y-s*.25,x,y+s*.35);cx.closePath();
}

var last=0;
function frame(t){
  requestAnimationFrame(frame);
  if(document.hidden)return;
  var dt=Math.min(40,t-last||16);last=t;
  if(t-palT>1500){palT=t;readPal()}
  var beat=analyse(t),playing=!au.paused&&!au.ended;
  var boost=playing?1:0;
  cx.clearRect(0,0,W,H);
  var min=Math.min(W,H),max=Math.max(W,H);

  /* 1. drifting glow orbs: swell with bass, brighten with energy */
  cx.globalCompositeOperation=pal.dark?'lighter':'source-over';
  for(var i=0;i<orbs.length;i++){
    var ob=orbs[i];
    var px=(.5+.5*Math.sin(t*ob.sx*(1+boost*.6)+ob.ph))*W*1.1-W*.05;
    var py=(.5+.5*Math.cos(t*ob.sy*(1+boost*.6)+ob.ph*1.7))*H*1.1-H*.05;
    var r=max*ob.r*(1+bass*.55*boost+beatKick*.12+.05*Math.sin(t/1800+i));
    var al=(pal.dark?.16:.22)+energy*(pal.dark?.34:.28)*boost;
    var g=cx.createRadialGradient(px,py,0,px,py,r);
    g.addColorStop(0,hexA(pal[ob.c],al));g.addColorStop(1,hexA(pal[ob.c],0));
    cx.fillStyle=g;cx.fillRect(px-r,py-r,r*2,r*2);
  }
  cx.globalCompositeOperation='source-over';

  /* 2. beat ripples */
  if(beat){rings.push({r:min*.08,a:.55+bass*.3,x:W/2,y:H*(.35+Math.random()*.3)});if(rings.length>8)rings.shift();
    var n=3+((bass*8)|0);for(var k=0;k<n;k++)spawn(Math.random()*W,H+10,true)}
  for(var j=rings.length-1;j>=0;j--){
    var rg=rings[j];rg.r+=dt*.32+bass*3;rg.a-=dt*.0009;
    if(rg.a<=0){rings.splice(j,1);continue}
    cx.lineWidth=2+rg.a*6;cx.strokeStyle=hexA(pal.a,rg.a*.8);
    cx.beginPath();cx.arc(rg.x,rg.y,rg.r,0,6.283);cx.stroke();
  }

  /* 3. floating hearts & sparkles (more + faster with the music) */
  if(Math.random()<.05+energy*.35*boost)spawn(Math.random()*W,H+14,false);
  for(var n2=parts.length-1;n2>=0;n2--){
    var p=parts[n2];p.life+=dt*.06*(1+energy*1.5*boost);
    p.w+=.03;p.x+=p.vx+Math.sin(p.w)*.35;p.y+=p.vy*(1+energy*1.4*boost);p.vy*=.999;p.vx*=.995;
    var f=p.life/p.max;if(f>=1||p.y<-30){parts.splice(n2,1);continue}
    p.a=Math.sin(Math.PI*Math.min(1,f))*(pal.dark?.75:.6);
    var sc=p.s*(1+beatKick*.35);
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot+Math.sin(p.w)*.25);
    cx.fillStyle=hexA(pal[p.c],p.a);cx.shadowColor=hexA(pal.a,p.a*.9);cx.shadowBlur=10;
    if(p.heart){heart(0,0,sc);cx.fill()}
    else{cx.beginPath();for(var s=0;s<4;s++){var an2=s*Math.PI/2;cx.lineTo(Math.cos(an2)*sc*.55,Math.sin(an2)*sc*.55);cx.lineTo(Math.cos(an2+Math.PI/4)*sc*.14,Math.sin(an2+Math.PI/4)*sc*.14)}cx.closePath();cx.fill()}
    cx.restore();
  }

  /* 4. spectrum wave rising from the bottom */
  var base=H,amp=H*.16,step=W/(NB-1);
  cx.beginPath();cx.moveTo(0,base);
  var idle=playing?0:1;
  for(var b2=0;b2<NB;b2++){
    var v=bars[b2],x=b2*step,w=.02+.03*Math.sin(t/1400+b2*.35)*(1+idle);
    var y=base-(amp*(.08+Math.pow(v,1.2)*1.5)+H*(.012+w*.4));
    if(b2===0)cx.lineTo(x,y);else{var px2=(b2-1)*step,py2=cx._ly;cx.quadraticCurveTo(px2,py2,(px2+x)/2,(py2+y)/2)}
    cx._ly=y;
  }
  cx.lineTo(W,cx._ly);cx.lineTo(W,base);cx.closePath();
  var wg=cx.createLinearGradient(0,base-amp*1.8,0,base);
  wg.addColorStop(0,hexA(pal.a,0));wg.addColorStop(1,hexA(pal.a,pal.dark?.5:.38));
  cx.fillStyle=wg;cx.fill();

  /* 5. push levels to CSS (vinyl deck glow + page vignette) */
  if(mu){mu.style.setProperty('--bass',bass.toFixed(3))}
  document.documentElement.style.setProperty('--pulse',(beatKick).toFixed(3));
}

/* hex / rgb colour -> rgba with alpha */
var cache={};
function hexA(c,a){
  var k=cache[c];
  if(!k){var m=c.replace('#','');if(m.length===3)m=m[0]+m[0]+m[1]+m[1]+m[2]+m[2];
    k=cache[c]=[parseInt(m.substr(0,2),16),parseInt(m.substr(2,2),16),parseInt(m.substr(4,2),16)]}
  return 'rgba('+k[0]+','+k[1]+','+k[2]+','+Math.max(0,Math.min(1,a)).toFixed(3)+')';
}

if(reduce){
  /* reduced motion: draw one calm static frame, no loop */
  cx.clearRect(0,0,W,H);
  orbs.forEach(function(ob){var px=ob.x*W,py=ob.y*H,r=Math.max(W,H)*ob.r,g=cx.createRadialGradient(px,py,0,px,py,r);
    g.addColorStop(0,hexA(pal[ob.c],.2));g.addColorStop(1,hexA(pal[ob.c],0));cx.fillStyle=g;cx.fillRect(px-r,py-r,r*2,r*2)});
}else requestAnimationFrame(frame);

window.__bg={get levels(){return{bass:bass,mid:mid,high:high,analyser:!!an}}};
})();
  
