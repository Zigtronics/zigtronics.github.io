const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.mobile-nav');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.hidden=open;toggle.querySelector('span').textContent=open?'+':'−'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');toggle.querySelector('span').textContent='+'}));const dialog=document.querySelector('#lightbox');document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#lightbox-image').src=button.dataset.image;document.querySelector('#lightbox-image').alt=button.dataset.title;document.querySelector('#lightbox-title').textContent=button.dataset.title;dialog.showModal()}));document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});document.querySelector('#year').textContent=new Date().getFullYear();

// Automatic gallery: ten seconds per image, with manual selection.
const gallerySlides=[...document.querySelectorAll('.hero-slide')];
const galleryDots=[...document.querySelectorAll('.gallery-dots button')];
const captions=['BUILT FOR THE APPLICATION','FROM CONCEPT TO CIRCUIT','SYSTEMS THAT WORK TOGETHER'];
let galleryIndex=0;
let galleryPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let galleryTimer;
function showGalleryPhoto(index){galleryIndex=index;gallerySlides.forEach((slide,i)=>{slide.classList.toggle('is-active',i===index);slide.setAttribute('aria-hidden',String(i!==index));galleryDots[i].classList.toggle('is-active',i===index);galleryDots[i].setAttribute('aria-pressed',String(i===index));});document.querySelector('#hero-caption').textContent=captions[index];document.querySelector('#hero-count').textContent=String(index+1).padStart(2,'0')+' / 03';}
function resetGalleryTimer(){clearInterval(galleryTimer);if(!galleryPaused&&!document.hidden)galleryTimer=setInterval(()=>showGalleryPhoto((galleryIndex+1)%gallerySlides.length),10000);}
galleryDots.forEach((dot,i)=>dot.addEventListener('click',()=>{showGalleryPhoto(i);resetGalleryTimer();}));
document.addEventListener('visibilitychange',resetGalleryTimer);
resetGalleryTimer();
