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

  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const query=new URLSearchParams(location.search);
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
      (page==='shop.html'&&!category&&link.dataset.nav==='shop');
    link.classList.toggle('nav-active',Boolean(active));
    if(active)link.setAttribute('aria-current','page');
    else link.removeAttribute('aria-current');
  });
})();
