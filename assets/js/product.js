/* =====================================================
   القسم المشترك: بيانات + سلة + لغة + هيدر/فوتر
===================================================== */

/* التصنيفات */
const CATS=[
  {id:'watches',ar:'ساعات',en:'Watches',e:'⌚'},
  {id:'glasses',ar:'نظارات',en:'Glasses',e:'🕶️'},
  {id:'perfumes',ar:'عطور',en:'Perfumes',e:'🌸'},
  {id:'wallets',ar:'محافظ',en:'Wallets',e:'👛'},
  {id:'cardholders',ar:'حوافظ كروت',en:'Card Holders',e:'💳'},
  {id:'handbags',ar:'شنط يد',en:'Hand Bags',e:'👜'},
  {id:'crossbags',ar:'شنط كروس',en:'Cross Bags',e:'🎒'},
  {id:'belts',ar:'أحزمة',en:'Belts',e:'🪢'},
  {id:'women',ar:'حريمي',en:'Women',e:'💎'},
  {id:'organizers',ar:'منظمات وحافظات',en:'Organizers & Cases',e:'🗃️'}
];

/* المنتجات */
const PRODUCTS=[
  {id:1,cat:'watches',ar:'ساعة أوتوماتيك فضية 41مم',en:'Automatic Silver Watch 41mm',price:4000,old:6000,badge:'sale',stock:1,colors:['#c8c8c8','#2b2b2b','#1e3d5c']},
  {id:2,cat:'watches',ar:'ساعة رويال أوك',en:'Royal Oak Watch',price:899,old:1200,badge:'sale',stock:1,colors:['#c8c8c8','#d9b64a']},
  {id:3,cat:'watches',ar:'ساعة كلاسيك جلد بني',en:'Classic Brown Leather Watch',price:1500,old:0,badge:'new',stock:1,colors:['#6b4a2f','#2b2b2b']},
  {id:4,cat:'watches',ar:'ساعة رياضية سوداء',en:'Black Sport Watch',price:2500,old:0,badge:'new',stock:0,colors:['#2b2b2b']},
  {id:5,cat:'watches',ar:'ساعة نسائية ذهبية',en:'Gold Women Watch',price:3200,old:3800,badge:'sale',stock:1,colors:['#d9b64a','#c8c8c8']},
  {id:6,cat:'watches',ar:'ساعة ميناء أزرق',en:'Blue Dial Watch',price:4000,old:6000,badge:'sale',stock:1,colors:['#1e3d5c','#c8c8c8']},
  {id:7,cat:'glasses',ar:'نظارة شمس أفيتور',en:'Aviator Sunglasses',price:650,old:850,badge:'sale',stock:1,colors:['#d9b64a','#2b2b2b']},
  {id:8,cat:'glasses',ar:'نظارة طبية إطار أسود',en:'Black Frame Optical Glasses',price:450,old:0,badge:'new',stock:1,colors:['#2b2b2b','#6b4a2f']},
  {id:9,cat:'perfumes',ar:'عطر عود ملكي 50مل',en:'Royal Oud Perfume 50ml',price:1200,old:1500,badge:'sale',stock:1,colors:['#6b4a2f']},
  {id:10,cat:'perfumes',ar:'عطر زهور الصباح',en:'Morning Flowers Perfume',price:780,old:0,badge:'new',stock:1,colors:['#cfdcb4']},
  {id:11,cat:'wallets',ar:'محفظة جلد طبيعي',en:'Genuine Leather Wallet',price:550,old:700,badge:'sale',stock:1,colors:['#6b4a2f','#2b2b2b']},
  {id:12,cat:'wallets',ar:'محفظة جلد صناعي',en:'Faux Leather Wallet',price:480,old:0,badge:'new',stock:1,colors:['#2b2b2b']},
  {id:13,cat:'cardholders',ar:'حافظة كروت معدنية',en:'Metal Card Holder',price:350,old:0,badge:'new',stock:1,colors:['#c8c8c8','#2b2b2b']},
  {id:14,cat:'cardholders',ar:'حافظة كروت جلد',en:'Leather Card Holder',price:250,old:400,badge:'sale',stock:1,colors:['#6b4a2f']},
  {id:15,cat:'handbags',ar:'شنطة يد جلد أسود',en:'Black Leather Hand Bag',price:1800,old:2200,badge:'sale',stock:1,colors:['#2b2b2b']},
  {id:16,cat:'handbags',ar:'شنطة يد سواريه',en:'Evening Hand Bag',price:950,old:0,badge:'new',stock:1,colors:['#d9b64a']},
  {id:17,cat:'crossbags',ar:'شنطة كروس جلد',en:'Leather Cross Bag',price:850,old:1100,badge:'sale',stock:1,colors:['#6b4a2f']},
  {id:18,cat:'crossbags',ar:'شنطة كروس قماش',en:'Canvas Cross Bag',price:600,old:0,badge:'new',stock:1,colors:['#efe8d8']},
  {id:19,cat:'belts',ar:'حزام جلد كلاسيكي',en:'Classic Leather Belt',price:450,old:600,badge:'sale',stock:1,colors:['#6b4a2f','#2b2b2b']},
  {id:20,cat:'belts',ar:'حزام كاجوال',en:'Casual Belt',price:300,old:0,badge:'new',stock:1,colors:['#2b2b2b']}
];

/* قاموس الترجمة المشترك */
PRODUCTS.length=0;
const appwriteProducts=window.SanadAppwrite?.cachedProducts||[];
PRODUCTS.push(...(appwriteProducts.length?appwriteProducts:SanadSafety.products()),...(appwriteProducts.length?[]:SanadSafety.demoProducts()));
const I18N={
  ar:{brand:'SANAD',ship:'شحن ثابت 100 ج.م لكل طلب',home:'الرئيسية',searchPh:'ابحث هنا...',
    shipNote:'الشحن لكل محافظات مصر، وطلبك بيوصل خلال ٤-٧ أيام.',phone:'للطلبات والاستفسار: 01107859933',
    shopBy:'تسوق حسب',info:'معلومات',service:'خدمة العملاء',follow:'تابعنا',news:'النشرة البريدية',
    emailPh:'اكتب بريدك الإلكتروني',subbed:'تم الاشتراك بنجاح ✓',wa:'اطلب عبر واتساب',
    add:'أضف للسلة',order:'اطلب الآن',sale:'خصم',new:'جديد',out:'نفدت',added:'تمت الإضافة للسلة ✓',
    about:'من نحن',shipPol:'سياسة الشحن',ret:'الاستبدال والإرجاع',cartT:'السلة',track:'متابعة الطلب',contact:'تواصل معنا'},
  en:{brand:'SANAD',ship:'Fixed shipping: 100 EGP per order',home:'Home',searchPh:'Search...',
    shipNote:'Shipping to all Egypt governorates, delivery in 4-7 days.',phone:'Orders & inquiries: 01107859933',
    shopBy:'Shop By',info:'Information',service:'Customer Service',follow:'Follow Us',news:'Newsletter',
    emailPh:'Enter your email',subbed:'Subscribed ✓',wa:'Order on WhatsApp',
    add:'Add To Cart',order:'Order Now',sale:'Sale',new:'New',out:'Sold out',added:'Added to cart ✓',
    about:'About Us',shipPol:'Shipping Policy',ret:'Returns & Exchange',cartT:'Cart',track:'Track Order',contact:'Contact Us'}
};

const getLang=()=>localStorage.getItem('lang')||'en';
const fmt=n=>getLang()==='ar'?n.toLocaleString('en-US')+' ج.م':'LE '+n.toLocaleString('en-US');
const favoriteIds=()=>SanadSafety.favorites();
const favoriteIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 6l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.3a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
const favoriteButton=(id,L)=>{const active=favoriteIds().includes(Number(id));const label=active?(L==='ar'?'إزالة من المفضلة':'Remove from favorites'):(L==='ar'?'أضف إلى المفضلة':'Add to favorites');return `<button class="favorite ${active?'active':''}" type="button" data-id="${id}" aria-label="${label}" aria-pressed="${active}">${favoriteIcon}</button>`;};

/* ===== السلة ===== */
const getCart=()=>SanadSafety.cart();
const setCart=c=>{SanadSafety.saveCart(c);syncCart();};
const cartQty=()=>getCart().reduce((s,x)=>s+x.q,0);
function addToCart(id,qty=1,variant=''){
  const c=getCart();const f=c.find(x=>x.id===id&&x.variant===variant);
  f?f.q+=qty:c.push({id,q:qty,variant});
  setCart(c);toast(I18N[getLang()].added);
}
function syncCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cartQty();}
function toast(m){
  let t=document.getElementById('toast');if(!t)return;
  t.textContent=m;t.classList.add('show');
  clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1600);
}
const emojiOf=p=>CATS.find(c=>c.id===p.cat).e;

/* كارت منتج */
function cardHTML(p){
  const L=getLang();const name=L==='ar'?p.ar:p.en;
  const badge=p.badge==='sale'?`<span class="badge sale">${I18N[L].sale}</span>`
             :p.badge==='new'?`<span class="badge new">${I18N[L].new}</span>`:'';
  const out=p.stock?'':`<span class="badge out">${I18N[L].out}</span>`;
  return `<article class="card product-card">
    ${favoriteButton(p.id,L)}
    <a href="product.html?id=${p.id}">
      <div class="ph">${badge}${out}${(p.images?.[0]||p.image)?`<img class="product-image" src="${p.images?.[0]||p.image}" alt="${name}" loading="lazy" decoding="async">`:`<span class="product-icon icon-${p.cat}" aria-hidden="true"></span>`}</div>
      <h3>${name}</h3>
    </a>
    <div class="prices">${p.old?`<s>${fmt(p.old)}</s>`:''}<b>${fmt(p.price)}</b></div>
    <div class="colors">${p.colors.map(c=>`<i style="background:${c}"></i>`).join('')}</div>
    <div class="card-actions">
      <button class="btn add" data-id="${p.id}">${I18N[L].add}</button>
      <button class="btn order" data-id="${p.id}">${I18N[L].order}</button>
    </div>
  </article>`;
}
function bindCards(scope){
  scope.querySelectorAll('.add').forEach(b=>b.onclick=()=>addToCart(+b.dataset.id));
  scope.querySelectorAll('.order').forEach(b=>b.onclick=()=>{addToCart(+b.dataset.id);location.href='checkout.html';});
  scope.querySelectorAll('.favorite').forEach(b=>b.onclick=event=>{
    event.preventDefault();event.stopPropagation();
    const favorites=favoriteIds();const id=Number(b.dataset.id);const index=favorites.indexOf(id);
    index<0?favorites.push(id):favorites.splice(index,1);
    const active=index<0;
    SanadSafety.saveFavorites(favorites);b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
    b.setAttribute('aria-label',active?(getLang()==='ar'?'إزالة من المفضلة':'Remove from favorites'):(getLang()==='ar'?'أضف إلى المفضلة':'Add to favorites'));
    document.dispatchEvent(new Event('sanad:favorites-changed'));
  });
}

/* تطبيق اللغة */
function applyLang(){
  const L=getLang();
  document.documentElement.lang=L;
  document.documentElement.dir=L==='ar'?'rtl':'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    if(I18N[L][el.dataset.i18n]!=null)el.textContent=I18N[L][el.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    if(I18N[L][el.dataset.i18nPh]!=null)el.placeholder=I18N[L][el.dataset.i18nPh];
  });
}

/* حقن الهيدر والفوتر */
function chrome(){
  const L=getLang();
  document.getElementById('chrome-top').innerHTML=`
    <div class="topbar"><div class="mtrack" dir="ltr">${('<span>'+I18N[L].ship+'</span>').repeat(6)}</div></div>
    <header class="hdr">
      <a class="logo" href="index.html"><b>${I18N[L].brand}</b></a>
      <nav class="nav">
        <a href="index.html">${I18N[L].home}</a>
        ${CATS.map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}
      </nav>
      <div class="acts">
        <form id="sForm" class="sform"><input id="sInp" data-i18n-ph="searchPh"><button>🔍</button></form>
        <button id="langBtn" class="ibtn">${L==='ar'?'EN':'عربي'}</button>
        <a class="ibtn" href="cart.html">🛒<span id="cartCount" class="count">0</span></a>
      </div>
    </header>`;
  document.getElementById('chrome-bottom').innerHTML=`
    <footer class="ftr"><div class="fgrid">
      <div><h4>${I18N[L].brand}</h4><p>${I18N[L].shipNote}</p><p>${I18N[L].phone}</p></div>
      <div><h4>${I18N[L].shopBy}</h4>${CATS.slice(0,5).map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}</div>
      <div><h4>${I18N[L].info}</h4>
        <a href="contact.html">${I18N[L].about}</a><a href="contact.html">${I18N[L].shipPol}</a><a href="contact.html">${I18N[L].ret}</a></div>
      <div><h4>${I18N[L].service}</h4>
        <a href="contact.html">${I18N[L].contact}</a><a href="cart.html">${I18N[L].cartT}</a><a href="contact.html">${I18N[L].track}</a></div>
      <div><h4>${I18N[L].follow}</h4><div class="social">📘 📸 🐦 </div>
        <h4>${I18N[L].news}</h4>
        <form id="nForm" class="nform"><input id="nInp" type="email" required data-i18n-ph="emailPh"><button class="btn">${L==='ar'?'اشترك':'Submit'}</button></form></div>
    </div></footer>
    <a class="wa" target="_blank" href="https://wa.me/201107859933">💬 <span>${I18N[L].wa}</span></a>
    <div id="toast" class="toast"></div>`;
  document.getElementById('langBtn').onclick=()=>{
    localStorage.setItem('lang',L==='ar'?'en':'ar');location.reload();
  };
  document.getElementById('sForm').onsubmit=e=>{
    e.preventDefault();
    const v=document.getElementById('sInp').value.trim();
    location.href='shop.html'+(v?'?q='+encodeURIComponent(v):'');
  };
  document.getElementById('nForm').onsubmit=e=>{
    e.preventDefault();
    localStorage.setItem('news',document.getElementById('nInp').value);
    toast(I18N[getLang()].subbed);e.target.reset();
  };
  syncCart();
}

/* =====================================================
   منطق صفحة تفاصيل المنتج
===================================================== */

/* نصوص الصفحة */
Object.assign(I18N.ar,{relT:'قد يعجبك أيضًا',qtyT:'الكمية',colT:'الاختيارات',
  desc:'منتج مختار بعناية ليكمل إطلالتك، مع تجربة طلب بسيطة وواضحة من البداية للنهاية.',
  notFound:'المنتج غير موجود.',homeCrumb:'الرئيسية',selected:'اختيار SANAD',inStock:'متوفر الآن',outOfStock:'غير متوفر مؤقتًا',
  detailsT:'عن المنتج',shippingT:'الشحن والاستبدال',shippingText:'التوصيل لكل محافظات مصر خلال ٤–٧ أيام. الدفع عند الاستلام متاح، ويمكن الاستبدال خلال ١٤ يوم.',
  shipFast:'توصيل خلال ٤–٧ أيام',cod:'الدفع عند الاستلام',exchange:'استبدال خلال ١٤ يوم',zoom:'اضغط لتكبير الصورة',previous:'الصورة السابقة',next:'الصورة التالية',close:'إغلاق'});
Object.assign(I18N.en,{relT:'You may also like',qtyT:'Quantity',colT:'Options',
  desc:'A carefully selected piece designed to complete your look, with a simple and clear ordering experience.',
  notFound:'Product not found.',homeCrumb:'Home',selected:'A SANAD selection',inStock:'In stock',outOfStock:'Temporarily unavailable',
  detailsT:'About this product',shippingT:'Shipping & returns',shippingText:'Delivery across Egypt in 4–7 days. Cash on delivery is available, with a 14-day exchange window.',
  shipFast:'Delivery in 4–7 days',cod:'Cash on delivery',exchange:'14-day exchange',zoom:'Click to enlarge',previous:'Previous image',next:'Next image',close:'Close'});

chrome();applyLang();

/* قراءة رقم المنتج من الرابط */
const id=+new URLSearchParams(location.search).get('id');
const p=PRODUCTS.find(x=>x.id===id);
const L=getLang();

if(!p){
  /* منتج غير موجود: رسالة واضحة */
  document.getElementById('pview').innerHTML=`<p style="text-align:center;padding:60px 0;font-size:18px">${I18N[L].notFound}</p>`;
}else{
  const name=L==='ar'?p.ar:p.en;
  const category=CATS.find(c=>c.id===p.cat);
  const categoryName=L==='ar'?category?.ar:category?.en;
  const images=(p.images?.length?p.images:[p.image]).filter(Boolean);
  const variants=p.variants||[];
  let selectedVariant=variants[0]||null;
  const badge=p.badge==='sale'?`<span class="badge sale">${I18N[L].sale}</span>`
             :p.badge==='new'?`<span class="badge new">${I18N[L].new}</span>`:'';
  const out=p.stock?'':`<span class="badge out">${I18N[L].out}</span>`;
  const initialImage=selectedVariant?.image||images[0];
  const imageMarkup=initialImage?`<img class="product-image" id="mainProductImage" src="${initialImage}" alt="${name}" decoding="async">`:`<span class="product-icon icon-${p.cat}" aria-hidden="true"></span>`;
  document.title=`${name} | SANAD`;
  /* تجربة تفصيل المنتج */
  document.getElementById('pview').innerHTML=`
    <nav class="product-breadcrumb" aria-label="Breadcrumb"><a href="index.html">${I18N[L].homeCrumb}</a><span>/</span><a href="shop.html?cat=${p.cat}">${categoryName||''}</a></nav>
    <div class="pgrid product-showcase">
      <div class="product-media">
        <div class="gallery-main">
          <div class="ph big">${badge}${out}${imageMarkup}</div>
          ${images.length>1?`<button class="gallery-nav previous" type="button" data-step="-1" aria-label="${I18N[L].previous}">←</button><button class="gallery-nav next" type="button" data-step="1" aria-label="${I18N[L].next}">→</button><span class="gallery-count"><bdi dir="ltr"><b id="currentImageNumber">1</b> / ${images.length}</bdi></span>`:''}
          ${images[0]?`<button class="zoom-hint" id="zoomImage" type="button">⌕ ${I18N[L].zoom}</button>`:''}
        </div>
        ${images.length>1?`<div class="product-thumbs">${images.map((src,i)=>`<button type="button" class="${i===0?'active':''}" data-index="${i}" aria-label="${name} ${i+1}"><img src="${src}" alt="${name} ${i+1}"></button>`).join('')}</div>`:''}
      </div>
      <div class="pinfo">
        <div class="product-kicker"><span>${I18N[L].selected}</span><b class="stock-state ${p.stock?'':'unavailable'}">${p.stock?I18N[L].inStock:I18N[L].outOfStock}</b></div>
        <h1>${name}</h1>
        <div class="product-price"><div class="prices">${p.old?`<s>${fmt(p.old)}</s>`:''}<b>${fmt(p.price)}</b></div>${p.old?`<span class="saving">${I18N[L].sale}</span>`:''}</div>
        <p class="pdesc">${I18N[L].desc}</p>
        <div class="product-options">
          ${variants.length?`<div class="option-row"><b>${I18N[L].colT}</b><div class="variant-select">${variants.map((variant,i)=>`<button class="${i===0?'on':''}" data-variant="${variant.id}" data-image="${variant.image}" aria-label="${I18N[L].colT}: ${variant.label}" aria-pressed="${i===0}"><img src="${variant.image}" alt=""><span>${variant.label}</span></button>`).join('')}</div></div>`:''}
          <div class="option-row quantity-row"><b>${I18N[L].qtyT}</b><div class="quantity-picker"><button type="button" id="qtyMinus" aria-label="Minus">−</button><input type="number" id="qty" value="1" min="1" max="99"><button type="button" id="qtyPlus" aria-label="Plus">+</button></div></div>
        </div>
        <div class="btnrow">
          <button class="btn add-primary" id="orderBtn" ${p.stock?'':'disabled'}>${I18N[L].order}</button>
          <button class="btn add-secondary" id="addBtn" ${p.stock?'':'disabled'}>${I18N[L].add}</button>
        </div>
        <div class="purchase-reassurance"><div><b>✓</b><span>${I18N[L].shipFast}</span></div><div><b>✓</b><span>${I18N[L].cod}</span></div><div><b>✓</b><span>${I18N[L].exchange}</span></div></div>
        <div class="product-details"><details open><summary>${I18N[L].detailsT}<span>+</span></summary><p>${I18N[L].desc}</p></details><details><summary>${I18N[L].shippingT}<span>+</span></summary><p>${I18N[L].shippingText}</p></details></div>
      </div>
    </div>
    ${images[0]?`<div class="product-lightbox" id="productLightbox" aria-hidden="true"><button class="lightbox-close" id="closeLightbox" type="button" aria-label="${I18N[L].close}">×</button><img id="lightboxImage" src="${images[0]}" alt="${name}"></div>`:''}`;
  let activeImage=Math.max(0,images.indexOf(initialImage));
  const setImage=index=>{
    if(!images.length)return;
    activeImage=((Number(index)||0)%images.length+images.length)%images.length;
    const source=images[activeImage];
    const main=document.getElementById('mainProductImage');
    const lightbox=document.getElementById('lightboxImage');
    if(main)main.src=source;
    if(lightbox)lightbox.src=source;
    const number=document.getElementById('currentImageNumber');
    if(number)number.textContent=activeImage+1;
    document.querySelectorAll('.product-thumbs button').forEach((button,index)=>button.classList.toggle('active',index===activeImage));
  };
  /* اختيار اللون */
  document.querySelectorAll('.product-thumbs button').forEach(b=>b.onclick=event=>{
    event.preventDefault();
    setImage(Number(b.dataset.index));
  });
  document.querySelectorAll('.gallery-nav').forEach(b=>b.onclick=event=>{
    event.preventDefault();
    event.stopPropagation();
    setImage(activeImage+Number(b.dataset.step));
  });
  const openLightbox=()=>{
    const lightbox=document.getElementById('productLightbox');
    lightbox?.classList.add('open');lightbox?.setAttribute('aria-hidden','false');
  };
  const closeLightbox=()=>{
    const lightbox=document.getElementById('productLightbox');
    lightbox?.classList.remove('open');lightbox?.setAttribute('aria-hidden','true');
  };
  document.getElementById('zoomImage')?.addEventListener('click',openLightbox);
  document.getElementById('mainProductImage')?.addEventListener('click',openLightbox);
  document.getElementById('closeLightbox')?.addEventListener('click',closeLightbox);
  document.getElementById('productLightbox')?.addEventListener('click',event=>{
    if(event.target===event.currentTarget)closeLightbox();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape')closeLightbox();
  });
  document.querySelectorAll('.variant-select button').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('.variant-select button').forEach(x=>x.classList.remove('on'));
    document.querySelectorAll('.variant-select button').forEach(x=>x.setAttribute('aria-pressed','false'));
    b.classList.add('on');b.setAttribute('aria-pressed','true');
    selectedVariant=variants.find(variant=>variant.id===b.dataset.variant)||null;
    const main=document.getElementById('mainProductImage');
    const lightbox=document.getElementById('lightboxImage');
    if(main)main.src=b.dataset.image;
    if(lightbox)lightbox.src=b.dataset.image;
  });
  /* قراءة الكمية وإضافة للسلة */
  const qty=()=>Math.max(1,Math.min(99,+document.getElementById('qty').value||1));
  document.getElementById('qtyMinus').onclick=()=>document.getElementById('qty').value=qty()-1||1;
  document.getElementById('qtyPlus').onclick=()=>document.getElementById('qty').value=Math.min(99,qty()+1);
  document.getElementById('addBtn').onclick=()=>addToCart(p.id,qty(),selectedVariant?.id||'');
  document.getElementById('orderBtn').onclick=()=>{addToCart(p.id,qty(),selectedVariant?.id||'');location.href='checkout.html';};
}

/* المنتجات المشابهة: نفس التصنيف عدا الحالي */
(function(){
  const rel=PRODUCTS.filter(x=>x.cat===(p?p.cat:'watches')&&x.id!==id).slice(0,4);
  const box=document.getElementById('rel');
  box.innerHTML=rel.map(cardHTML).join('');
  bindCards(box);
})();
/* =====================================================
   إضافة أيقونة الحساب (الشخص) للهيدر بنفس ستايل الخطوط
===================================================== */
(function(){
  const acts=document.querySelector('.acts');
  if(!document.querySelector('.account-btn')){
    const b=document.createElement('button');
    b.className='account-btn';
    /* رسالة بسيطة عند الضغط لحد ما تبقى فيها صفحة حقيقية */
    b.onclick=()=>toast(getLang()==='ar'?'صفحة الحساب قريبًا ✓':'Account page coming soon ✓');
    /* مكانها قبل أيقونة الشنطة زي الصورة المرجعية */
    acts.insertBefore(b,acts.querySelector('a[href="cart.html"]'));
  }
})();
