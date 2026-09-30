document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('metaQuoteForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('quoteName').value.trim();
    const email=document.getElementById('quoteEmail').value.trim();
    const phone=document.getElementById('quotePhone').value.trim();
    const service=document.getElementById('quoteService').value;
    const message=document.getElementById('quoteMessage').value.trim()||'No additional message.';
    const text=`Hello Agile Solutions, I want a Meta Ads quote.%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0ARequirement: ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/918005677079?text=${text}`,'_blank','noopener,noreferrer');
  });

  const benefitCards=[...document.querySelectorAll('.meta-benefit-card')];
  let benefitIndex=0, benefitTimer;
  const benefitCounter=document.getElementById('benefitCounter');
  function showBenefit(i){
    benefitIndex=(i+benefitCards.length)%benefitCards.length;
    benefitCards.forEach((c,n)=>c.classList.toggle('is-active',n===benefitIndex));
    if(benefitCounter) benefitCounter.textContent=`${benefitIndex+1} / ${benefitCards.length}`;
  }
  function startBenefitTimer(){clearInterval(benefitTimer); if(innerWidth<=900) benefitTimer=setInterval(()=>showBenefit(benefitIndex+1),3000)}
  document.getElementById('benefitPrev')?.addEventListener('click',()=>{showBenefit(benefitIndex-1);startBenefitTimer()});
  document.getElementById('benefitNext')?.addEventListener('click',()=>{showBenefit(benefitIndex+1);startBenefitTimer()});
  startBenefitTimer(); window.addEventListener('resize',startBenefitTimer);

  const reviewCards=[...document.querySelectorAll('.meta-review-card')];
  const reviewCounter=document.getElementById('reviewCounter');
  let reviewIndex=0, reviewTimer;
  function showReview(i){
    reviewIndex=(i+reviewCards.length)%reviewCards.length;
    reviewCards.forEach((c,n)=>c.style.display=(innerWidth<=900?(n===reviewIndex?'flex':'none'):'flex'));
    if(reviewCounter) reviewCounter.textContent=`${reviewIndex+1} / ${reviewCards.length}`;
  }
  function startReviewTimer(){
    clearInterval(reviewTimer);
    showReview(reviewIndex);
    if(innerWidth<=900) reviewTimer=setInterval(()=>showReview(reviewIndex+1),3000);
  }
  document.getElementById('reviewPrev')?.addEventListener('click',()=>{showReview(reviewIndex-1);startReviewTimer()});
  document.getElementById('reviewNext')?.addEventListener('click',()=>{showReview(reviewIndex+1);startReviewTimer()});
  window.addEventListener('resize',startReviewTimer);
  const reviewWrap=document.getElementById('reviewsSlider');
  let reviewTouchX=0;
  reviewWrap?.addEventListener('touchstart',e=>{reviewTouchX=e.changedTouches[0].clientX},{passive:true});
  reviewWrap?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-reviewTouchX;if(Math.abs(dx)>45){showReview(dx<0?reviewIndex+1:reviewIndex-1);startReviewTimer()}},{passive:true});
  const benefitWrap=document.getElementById('benefitsSlider'); let benefitTouchX=0;
  benefitWrap?.addEventListener('touchstart',e=>{benefitTouchX=e.changedTouches[0].clientX},{passive:true});
  benefitWrap?.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-benefitTouchX;if(Math.abs(dx)>45){showBenefit(dx<0?benefitIndex+1:benefitIndex-1);startBenefitTimer()}},{passive:true});
  showReview(0); showBenefit(0);
});
