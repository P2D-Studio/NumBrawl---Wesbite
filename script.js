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
