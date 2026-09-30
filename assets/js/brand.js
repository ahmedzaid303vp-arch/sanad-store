/* اسم العلامة الموحد وإزالة أي رمز لوجو من الهيدر والفوتر. */
(function applySanadBrand(){
  const brand='SANAD';
  const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  const language=document.documentElement.lang==='en'?'en':'ar';
  const titles={
    'index.html':{ar:'الرئيسية',en:'Home'},
    'shop.html':{ar:'المتجر',en:'Shop'},
    'product.html':{ar:'المنتج',en:'Product'},
    'cart.html':{ar:'السلة',en:'Cart'},
    'checkout.html':{ar:'إتمام الطلب',en:'Checkout'},
    'contact.html':{ar:'تواصل معنا',en:'Contact'}
  };
  document.title=`Sanad Store | ${titles[page]?.[language]||titles['index.html'][language]}`;

  document.querySelectorAll('.logo').forEach((logo)=>{
    logo.replaceChildren(Object.assign(document.createElement('b'),{textContent:brand}));
  });

  document.querySelectorAll('.ftr h4').forEach((heading)=>{
    if(/ANAQA|أناقة|⌚/i.test(heading.textContent))heading.textContent=brand;
  });
})();
