/* سلوك القائمة المشتركة: يعمل بعد أن تحقن الصفحة الهيدر الخاص بها */
(function setupResponsiveMenu(){
  const header=document.querySelector('.hdr');
  const nav=document.querySelector('.nav');
  if(!header||!nav)return;
  let menu=document.querySelector('.menu-btn');
  if(!menu){
    menu=document.createElement('button');
    menu.className='menu-btn';
    menu.type='button';
    menu.setAttribute('aria-label','Open navigation menu');
    menu.setAttribute('aria-expanded','false');
    header.insertBefore(menu,header.firstElementChild);
  }
  const setMenuOpen=isOpen=>{
    nav.classList.toggle('open',isOpen);
    header.classList.toggle('nav-expanded',isOpen);
    menu.setAttribute('aria-expanded',String(isOpen));
  };
  setMenuOpen(false);
  menu.addEventListener('click',()=>setMenuOpen(!nav.classList.contains('open')));
  nav.addEventListener('click',event=>{
    if(event.target.closest('a'))setMenuOpen(false);
  });
  document.addEventListener('click',event=>{
    if(!event.target.closest('.hdr')&&nav.classList.contains('open'))setMenuOpen(false);
  });
  window.addEventListener('resize',()=>{
    if(window.innerWidth>900)setMenuOpen(false);
  });
})();
