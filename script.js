const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}))}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();

const contactForm=document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit',async(event)=>{
    event.preventDefault();
    if(!contactForm.reportValidity())return;
    const button=contactForm.querySelector('button[type="submit"]');
    const status=document.getElementById('contact-form-status');
    button.disabled=true;
    button.textContent='Sending…';
    status.textContent='';
    try{
      const response=await fetch(contactForm.action,{method:'POST',body:new FormData(contactForm),headers:{'Accept':'application/json'}});
      const result=await response.json();
      if(!response.ok||result.success===false||result.success==='false')throw new Error('Submission unsuccessful');
      window.location.assign('thank-you.html');
    }catch(error){
      status.textContent='We could not submit your enquiry. Please try again or email support@numbrawl.com.';
      button.disabled=false;
      button.textContent='Send enquiry ↗';
    }
  });
}


/* Mobile game-mode carousel: automatic, pauses for user interaction and accessibility */
const modeTrack=document.querySelector('#modes .v4-modes');
if(modeTrack){
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let timer=null,paused=false;
 const cards=Array.from(modeTrack.querySelectorAll('.v4-mode'));
 const isMobile=()=>window.matchMedia('(max-width: 620px)').matches;
 const advance=()=>{
   if(!isMobile()||paused||reducedMotion.matches||cards.length<2||document.hidden)return;
   const current=modeTrack.scrollLeft;
   let next=cards.find(card=>card.offsetLeft-modeTrack.offsetLeft>current+20);
   modeTrack.scrollTo({left:next?next.offsetLeft-modeTrack.offsetLeft:0,behavior:'smooth'});
 };
 const start=()=>{if(!timer)timer=window.setInterval(advance,4500)};
 const stop=()=>{if(timer){window.clearInterval(timer);timer=null}};
 const pause=()=>{paused=true;stop()};
 modeTrack.addEventListener('touchstart',pause,{passive:true});
 modeTrack.addEventListener('pointerdown',pause,{passive:true});
 modeTrack.addEventListener('focusin',pause);
 modeTrack.addEventListener('mouseenter',()=>{if(isMobile())stop()});
 modeTrack.addEventListener('mouseleave',()=>{if(!paused&&!reducedMotion.matches)start()});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else if(!paused&&!reducedMotion.matches)start()});
 window.addEventListener('resize',()=>{if(isMobile()&&!paused&&!reducedMotion.matches)start();else stop()});
 if(isMobile()&&!reducedMotion.matches)start();
}
