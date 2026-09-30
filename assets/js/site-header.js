/* One header component for every storefront page. Keep page-owned handlers
   (search, language and cart) while isolating layout from legacy page styles. */
(function mountSiteHeader(){
  const previous=document.querySelector('#chrome-top .hdr');
  if(!previous)return;
  const arabic=document.documentElement.lang==='ar';
  const label=(ar,en)=>arabic?ar:en;
  const svg=paths=>`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const icons={
    menu:svg('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    search:svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>'),
    favorite:svg('<path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 6l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.3a5.5 5.5 0 0 0 0-7.8Z"/>'),
    cart:svg('<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
    account:svg('<circle cx="12" cy="8" r="3.5"/><path d="M5 21a7 7 0 0 1 14 0"/>'),
    chat:svg('<path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-4.4A7.5 7.5 0 1 1 20 11.5Z"/><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"/>')
  };
  const brandName='<span class="brand-wordmark" lang="en" dir="ltr">Sanad Store</span>';
  const brandBag=`<svg class="brand-bag" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M12 25h40l-3 31H15z" fill="#d8b895"/>
    <path d="M21 25c0-12 4-18 11-18s11 6 11 18" fill="none" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <circle cx="21" cy="25" r="3" fill="#222"/><circle cx="43" cy="25" r="3" fill="#222"/>
  </svg>`;
  const whatsapp=document.querySelector('.wa');
  if(whatsapp){
    const whatsappText=whatsapp.querySelector('span');
    const whatsappIcon=document.createElement('span');
    whatsappIcon.className='wa-icon';
    whatsappIcon.innerHTML=icons.chat;
    whatsapp.rel='noopener noreferrer';
    whatsapp.setAttribute('aria-label',label('اطلب عبر واتساب','Order on WhatsApp'));
    whatsapp.replaceChildren(whatsappIcon);
    if(whatsappText)whatsapp.append(whatsappText);
  }
  const header=document.createElement('header');
  header.className='site-header';
  header.dataset.menuOpen='false';
  header.dataset.searchOpen='false';
  const menu=document.createElement('button');
  menu.type='button';menu.className='site-icon site-menu';menu.innerHTML=icons.menu;
  menu.setAttribute('aria-label',label('القائمة الرئيسية','Main menu'));
  menu.setAttribute('aria-controls','site-navigation');menu.setAttribute('aria-expanded','false');
  const brand=document.createElement('a');
  brand.className='site-brand';brand.href='index.html';brand.innerHTML=brandName;
  const nav=document.createElement('nav');
  nav.id='site-navigation';nav.className='site-nav';
  nav.setAttribute('aria-label',label('التنقل الرئيسي','Main navigation'));
  previous.querySelectorAll('.nav a').forEach(link=>{
    link.className='';nav.append(link);
  });
  const actions=document.createElement('div');actions.className='site-actions';
  const language=previous.querySelector('#langBtn');
  if(language){language.className='site-language';language.textContent=arabic?'English':'عربي';language.setAttribute('aria-label',label('Switch to English','التبديل للعربية'));actions.append(language);}
  const account=previous.querySelector('.account-btn');
  if(account){account.className='site-icon site-account';account.innerHTML=icons.account;account.setAttribute('aria-label',label('الحساب','Account'));actions.append(account);}
  const favorites=document.createElement('a');
  favorites.className='site-icon site-favorites';favorites.href='shop.html?favorites=1';favorites.innerHTML=icons.favorite;
  favorites.setAttribute('aria-label',label('المفضلة','Favorites'));
  if(location.pathname.replace(/\/+$/,'').endsWith('/shop')||location.pathname.endsWith('shop.html')){
    if(new URLSearchParams(location.search).get('favorites')==='1')favorites.setAttribute('aria-current','page');
  }
  const favoriteCount=document.createElement('span');
  favoriteCount.id='favoriteCount';favoriteCount.className='site-count';favoriteCount.setAttribute('aria-live','polite');favoriteCount.hidden=true;
  favorites.append(favoriteCount);actions.append(favorites);
  const cart=previous.querySelector('a[href="cart.html"]');
  if(cart){
    const count=cart.querySelector('#cartCount');
    cart.className='site-icon site-cart';cart.innerHTML=icons.cart;
    cart.setAttribute('aria-label',label('سلة المشتريات','Shopping cart'));
    if(count){count.className='site-count';count.setAttribute('aria-live','polite');cart.append(count);}
    actions.append(cart);
  }
  header.append(menu,brand,nav,actions);
  const search=previous.querySelector('#sForm');
  const compact=matchMedia('(max-width:1399px)');
  let searchToggle;
  if(search){
    search.className='site-search';search.setAttribute('role','search');
    const input=search.querySelector('input');
    input.setAttribute('aria-label',label('البحث عن المنتجات','Search products'));
    const submit=search.querySelector('button');
    submit.className='site-icon';submit.innerHTML=icons.search;
    submit.setAttribute('aria-label',label('بحث','Search'));
    searchToggle=document.createElement('button');searchToggle.type='button';
    searchToggle.className='site-icon site-search-toggle';searchToggle.innerHTML=icons.search;
    searchToggle.setAttribute('aria-label',label('فتح البحث','Open search'));
    searchToggle.setAttribute('aria-controls','sForm');searchToggle.setAttribute('aria-expanded','false');
    searchToggle.addEventListener('click',()=>{
      const open=header.dataset.searchOpen!=='true';
      header.dataset.searchOpen=String(open);searchToggle.setAttribute('aria-expanded',String(open));
      if(open)input.focus();
    });
    header.append(searchToggle);
  }
  previous.replaceWith(header);
  const syncFavorites=()=>{
    let ids=[];
    try{ids=JSON.parse(localStorage.getItem('favorites')||'[]');}catch{}
    const count=[...new Set((Array.isArray(ids)?ids:[]).map(Number).filter(Number.isSafeInteger))].length;
    favoriteCount.textContent=String(count);favoriteCount.hidden=count===0;
  };
  syncFavorites();
  window.addEventListener('storage',event=>{if(event.key==='favorites')syncFavorites();});
  document.addEventListener('sanad:favorites-changed',syncFavorites);
  const footerBrand=document.querySelector('#chrome-bottom .fgrid > div:first-child > h4');
  if(footerBrand){footerBrand.className='footer-brand';footerBrand.innerHTML=brandBag+brandName;}
  const social=document.querySelector('#chrome-bottom .social');
  if(social){
    social.replaceChildren();
    const facebook=document.createElement('a');
    facebook.className='facebook-link';
    facebook.href='https://www.facebook.com/share/1DL5dy1b3F/?mibextid=wwXIfr';
    facebook.target='_blank';
    facebook.rel='noopener noreferrer';
    facebook.setAttribute('aria-label',label('تابعنا على فيسبوك','Follow us on Facebook'));
    facebook.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" stroke="none" d="M13.8 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5H17V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.1H7.8V13h2.7v8h3.3Z"/></svg>';
    social.append(facebook);
  }
  const setOpen=open=>{
    header.dataset.menuOpen=String(open);menu.setAttribute('aria-expanded',String(open));
  };
  const layout=()=>{
    setOpen(false);header.dataset.searchOpen='false';searchToggle?.setAttribute('aria-expanded','false');
    if(search){if(compact.matches)header.append(search);else actions.prepend(search);}
  };
  layout();compact.addEventListener('change',layout);
  menu.addEventListener('click',()=>setOpen(header.dataset.menuOpen!=='true'));
  nav.addEventListener('click',event=>{if(event.target.closest('a'))setOpen(false);});
  document.addEventListener('click',event=>{if(!header.contains(event.target))setOpen(false);});
  header.addEventListener('keydown',event=>{
    if(event.key!=='Escape')return;
    if(header.dataset.searchOpen==='true'){
      header.dataset.searchOpen='false';searchToggle?.setAttribute('aria-expanded','false');searchToggle?.focus();
    }else{setOpen(false);menu.focus();}
  });
})();
