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


/* Mobile game-mode carousel: starts when visible and loops from last to first. */
const modeTrack=document.querySelector('#modes .v4-modes');
if(modeTrack){
 const cards=Array.from(modeTrack.querySelectorAll('.v4-mode'));
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const isMobile=()=>window.matchMedia('(max-width: 620px)').matches;
 let timer=null,inView=false,interacting=false,resumeTimer=null;
 const stop=()=>{if(timer){clearInterval(timer);timer=null}};
 const cardLeft=card=>card.offsetLeft-cards[0].offsetLeft;
 const advance=()=>{
   if(!isMobile()||!inView||interacting||document.hidden||reducedMotion.matches||cards.length<2)return;
   const current=modeTrack.scrollLeft;
   const index=cards.reduce((best,card,i)=>Math.abs(cardLeft(card)-current)<Math.abs(cardLeft(cards[best])-current)?i:best,0);
   const next=(index+1)%cards.length;
   modeTrack.scrollTo({left:cardLeft(cards[next]),behavior:next===0?'instant':'smooth'});
 };
 const sync=()=>{stop();if(isMobile()&&inView&&!interacting&&!document.hidden&&!reducedMotion.matches&&cards.length>1)timer=setInterval(advance,4500)};
 const hold=()=>{
   interacting=true;stop();clearTimeout(resumeTimer);
   resumeTimer=setTimeout(()=>{interacting=false;sync()},8500);
 };
 modeTrack.addEventListener('touchstart',hold,{passive:true});
 modeTrack.addEventListener('pointerdown',hold,{passive:true});
 modeTrack.addEventListener('focusin',hold);
 const observer=new IntersectionObserver(entries=>{
   inView=entries[0].isIntersecting;
   sync();
 },{threshold:0.25});
 observer.observe(modeTrack);
 document.addEventListener('visibilitychange',sync);
 window.addEventListener('resize',sync);
 reducedMotion.addEventListener('change',sync);
}
