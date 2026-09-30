/* تحديد المكان الحالي في القائمة، مع رابط متجر عام للصفحة التي تعرض كل المنتجات. */
(function enhanceNavigation(){
  const nav=document.querySelector('.nav');
  if(!nav)return;

  const language=document.documentElement.lang==='ar'?'ar':'en';
  let shopLink=nav.querySelector('[data-nav="shop"]');
  if(!shopLink){
    shopLink=document.createElement('a');
    shopLink.href='shop.html';
    shopLink.dataset.nav='shop';
    shopLink.textContent=language==='ar'?'المتجر':'Shop';
    const home=nav.querySelector('a[href="index.html"]');
    home?.after(shopLink);
  }

  // Cloudflare Pages may expose clean URLs such as `/shop` instead of
  // `shop.html`; normalize both forms before comparing navigation links.
  const currentPath=location.pathname.replace(/\/+$/,'');
  const currentLeaf=currentPath.split('/').pop().toLowerCase();
  const page=!currentLeaf?'index.html':currentLeaf.includes('.')?currentLeaf:`${currentLeaf}.html`;
  const query=new URLSearchParams(location.search);
  const favoritesView=page==='shop.html'&&query.get('favorites')==='1';
  let category=query.get('cat');
  if(page==='product.html'&&!category){
    const breadcrumb=document.querySelector('.product-breadcrumb a[href*="cat="]');
    if(breadcrumb)category=new URL(breadcrumb.href,location.href).searchParams.get('cat');
  }

  nav.querySelectorAll('a').forEach(link=>{
    const target=new URL(link.href,location.href);
    const targetPage=(target.pathname.split('/').pop()||'index.html').toLowerCase();
    const targetCategory=target.searchParams.get('cat');
    const active=(page==='index.html'&&targetPage==='index.html')||
      ((page==='shop.html'||page==='product.html')&&category&&targetPage==='shop.html'&&targetCategory===category)||
      (page==='shop.html'&&!category&&!favoritesView&&link.dataset.nav==='shop');
    link.classList.toggle('nav-active',Boolean(active));
    if(active)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });

  // Utility pages are represented by controls outside the category navigation.
  // Keep the cart highlighted through checkout so visitors never lose context.
  const cartIsCurrent=page==='cart.html'||page==='checkout.html';
  document.querySelectorAll('a[href="cart.html"]').forEach(link=>{
    link.classList.toggle('nav-active',cartIsCurrent);
    if(cartIsCurrent)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('a[href="shop.html?favorites=1"]').forEach(link=>{
    link.classList.toggle('nav-active',favoritesView);
    if(favoritesView)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });

  const prefetched=new Set();
  const prefetch=href=>{
    const url=new URL(href,location.href);
    if(url.origin!==location.origin||!url.pathname.endsWith('.html')||prefetched.has(url.href))return;
    prefetched.add(url.href);
    const hint=document.createElement('link');
    hint.rel='prefetch';hint.href=url.href;document.head.append(hint);
  };
  nav.addEventListener('pointerover',event=>{
    const link=event.target.closest('a');
    if(link)prefetch(link.href);
  },{passive:true});
})();
