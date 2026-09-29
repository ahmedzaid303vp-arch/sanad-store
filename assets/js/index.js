/* =====================================================
   القسم المشترك (موجود بنفس الشكل في كل الصفحات):
   البيانات + أدوات السلة واللغة + حقن الهيدر والفوتر
===================================================== */

/* التصنيفات الثمانية زي الموقع المرجعي */
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

/* بيانات المنتجات المؤقتة (تُستبدل لاحقًا ببياناتك الحقيقية) */
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

/* قاموس الترجمة عربي/إنجليزي للعناصر المشتركة */
PRODUCTS.length=0;
const appwriteProducts=window.SanadAppwrite?.cachedProducts||[];
PRODUCTS.push(...(appwriteProducts.length?appwriteProducts:SanadSafety.products()),...(appwriteProducts.length?[]:SanadSafety.demoProducts()));
const I18N={
  ar:{brand:'SANAD',ship:'⚡ شحن مجاني للطلبات فوق 2000 ج.م 🚚',home:'الرئيسية',searchPh:'ابحث هنا...',
    shipNote:'الشحن لكل محافظات مصر، وطلبك بيوصل خلال ٤-٧ أيام.',phone:'للطلبات والاستفسار: 01107859933',
    shopBy:'تسوق حسب',info:'معلومات',service:'خدمة العملاء',follow:'تابعنا',news:'النشرة البريدية',
    emailPh:'اكتب بريدك الإلكتروني',subbed:'تم الاشتراك بنجاح ✓',wa:'اطلب عبر واتساب',
    add:'أضف للسلة',order:'اطلب الآن',sale:'خصم',new:'جديد',out:'نفدت',added:'تمت الإضافة للسلة ✓',
    about:'من نحن',shipPol:'سياسة الشحن',ret:'الاستبدال والإرجاع',cartT:'السلة',track:'متابعة الطلب',contact:'تواصل معنا'},
  en:{brand:'SANAD',ship:'⚡ FREE SHIPPING ON ORDERS OVER 2000 EGP 🚚',home:'Home',searchPh:'Search...',
    shipNote:'Shipping to all Egypt governorates, delivery in 4-7 days.',phone:'Orders & inquiries: 01107859933',
    shopBy:'Shop By',info:'Information',service:'Customer Service',follow:'Follow Us',news:'Newsletter',
    emailPh:'Enter your email',subbed:'Subscribed ✓',wa:'Order on WhatsApp',
    add:'Add To Cart',order:'Order Now',sale:'Sale',new:'New',out:'Sold out',added:'Added to cart ✓',
    about:'About Us',shipPol:'Shipping Policy',ret:'Returns & Exchange',cartT:'Cart',track:'Track Order',contact:'Contact Us'}
};

/* قراءة اللغة المحفوظة (العربية افتراضيًا) */
const getLang=()=>localStorage.getItem('lang')||'ar';

/* تنسيق السعر بالجنيه المصري */
const fmt=n=>getLang()==='ar'?n.toLocaleString('en-US')+' ج.م':'LE '+n.toLocaleString('en-US');

/* ===== أدوات السلة (محفوظة في localStorage بدل SQL) ===== */
const getCart=()=>SanadSafety.cart();
const setCart=c=>{SanadSafety.saveCart(c);syncCart();};
const cartQty=()=>getCart().reduce((s,x)=>s+x.q,0);
function addToCart(id,qty=1,variant=''){
  const c=getCart();const f=c.find(x=>x.id===id&&x.variant===variant);
  f?f.q+=qty:c.push({id,q:qty,variant});
  setCart(c);toast(I18N[getLang()].added);
}
/* تحديث عدّاد السلة في الهيدر */
function syncCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cartQty();}

/* تنبيه مؤقت أسفل الشاشة */
function toast(m){
  let t=document.getElementById('toast');if(!t)return;
  t.textContent=m;t.classList.add('show');
  clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1600);
}

/* إيموجي التصنيف الخاص بالمنتج (مكان الصورة الحقيقية لاحقًا) */
const emojiOf=p=>CATS.find(c=>c.id===p.cat).e;

/* بناء كارت منتج واحد */
function cardHTML(p){
  const L=getLang();const name=L==='ar'?p.ar:p.en;
  const badge=p.badge==='sale'?`<span class="badge sale">${I18N[L].sale}</span>`
             :p.badge==='new'?`<span class="badge new">${I18N[L].new}</span>`:'';
  const out=p.stock?'':`<span class="badge out">${I18N[L].out}</span>`;
  return `<div class="card">
    <a href="product.html?id=${p.id}">
      <div class="ph">${badge}${out}<button class="favorite" data-id="${p.id}" aria-label="Favorite">♡</button>${(p.images?.[0]||p.image)?`<img class="product-image" src="${p.images?.[0]||p.image}" alt="${name}" decoding="async">`:`<span class="product-icon icon-${p.cat}" aria-hidden="true"></span>`}</div>
      <h3>${name}</h3>
    </a>
    <div class="prices">${p.old?`<s>${fmt(p.old)}</s>`:''}<b>${fmt(p.price)}</b></div>
    <div class="colors">${p.colors.map(c=>`<i style="background:${c}"></i>`).join('')}</div>
    <button class="btn add" data-id="${p.id}">${I18N[L].add}</button>
    <button class="btn order" data-id="${p.id}">${I18N[L].order}</button>
  </div>`;
}

/* ربط أزرار الكروت (إضافة للسلة / اطلب الآن) */
function bindCards(scope){
  scope.querySelectorAll('.add').forEach(b=>b.onclick=()=>addToCart(+b.dataset.id));
  scope.querySelectorAll('.order').forEach(b=>b.onclick=()=>{addToCart(+b.dataset.id);location.href='checkout.html';});
  scope.querySelectorAll('.favorite').forEach(b=>b.onclick=()=>{
    const favorites=JSON.parse(localStorage.getItem('favorites')||'[]');
    const id=+b.dataset.id;const index=favorites.indexOf(id);
    index<0?(favorites.push(id),b.classList.add('active'),b.textContent='♥'):(favorites.splice(index,1),b.classList.remove('active'),b.textContent='♡');
    localStorage.setItem('favorites',JSON.stringify(favorites));
  });
}

/* تطبيق اللغة المختارة على كل النصوص */
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

/* حقن الهيدر والفوتر وزر الواتساب في الصفحة */
function chrome(){
  const L=getLang();
  /* ----- الشريط العلوي + الهيدر ----- */
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
  /* ----- الفوتر + واتساب + التنبيه ----- */
  document.getElementById('chrome-bottom').innerHTML=`
    <footer class="ftr"><div class="fgrid">
      <div><h4>${I18N[L].brand}</h4><p>${I18N[L].shipNote}</p><p>${I18N[L].phone}</p></div>
      <div><h4>${I18N[L].shopBy}</h4>${CATS.slice(0,5).map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}</div>
      <div><h4>${I18N[L].info}</h4>
        <a href="contact.html">${I18N[L].about}</a><a href="contact.html">${I18N[L].shipPol}</a><a href="contact.html">${I18N[L].ret}</a></div>
      <div><h4>${I18N[L].service}</h4>
        <a href="contact.html">${I18N[L].contact}</a><a href="cart.html">${I18N[L].cartT}</a><a href="contact.html">${I18N[L].track}</a></div>
      <div><h4>${I18N[L].follow}</h4><div class="social">📘 📸 🐦 📌</div>
        <h4>${I18N[L].news}</h4>
        <form id="nForm" class="nform"><input id="nInp" type="email" required data-i18n-ph="emailPh"><button class="btn">${L==='ar'?'اشترك':'Submit'}</button></form></div>
    </div></footer>
    <a class="wa" target="_blank" href="https://wa.me/201107859933">💬 <span>${I18N[L].wa}</span></a>
    <div id="toast" class="toast"></div>`;
  /* ----- أحداث الهيدر والفوتر ----- */
  /* زرار تبديل اللغة: يحفظ الاختيار ويعيد تحميل الصفحة */
  document.getElementById('langBtn').onclick=()=>{
    localStorage.setItem('lang',L==='ar'?'en':'ar');location.reload();
  };
  /* البحث: ينقل لصفحة المتجر مع كلمة البحث */
  document.getElementById('sForm').onsubmit=e=>{
    e.preventDefault();
    const v=document.getElementById('sInp').value.trim();
    location.href='shop.html'+(v?'?q='+encodeURIComponent(v):'');
  };
  /* النشرة البريدية: حفظ الإيميل محليًا */
  document.getElementById('nForm').onsubmit=e=>{
    e.preventDefault();
    localStorage.setItem('news',document.getElementById('nInp').value);
    toast(I18N[getLang()].subbed);e.target.reset();
  };
  syncCart();
}

/* =====================================================
   منطق الصفحة الرئيسية فقط
===================================================== */

/* نصوص الصفحة الرئيسية باللغتين */
Object.assign(I18N.ar,{heroBadge:'اختيارات فاخرة، ببساطة',heroTitle:'الأناقة تبدأ من معصمك',
  heroDesc:'ساعات وإكسسوارات أصلية بخامات مختارة بعناية — أسعار واضحة، جودة مضمونة، وتوصيل سريع لباب البيت.',
    t1:'شحن سريع',t2:'دفع عند الاستلام',t3:'استبدال خلال 14 يوم',slogan:'أناقة. جودة. ثقة.',
  browseEyebrow:'اختار على ذوقك',catsT:'تسوق حسب التصنيف',bestEyebrow:'الأكثر طلبًا',bestT:'الأكثر مبيعًا',lastEyebrow:'لا تفوّت الفرصة',lastT:'القطع الأخيرة',newEyebrow:'وصل حديثًا',newT:'أحدث المنتجات',viewAll:'عرض الكل',
  p1:'شحن مجاني للطلبات فوق 2000 ج.م',p2:'الدفع عند الاستلام',p3:'استبدال خلال 14 يوم'});
Object.assign(I18N.en,{heroBadge:'FINE CHOICES, MADE SIMPLE',heroTitle:'Elegance Starts on Your Wrist',
  heroDesc:'Original watches & accessories with carefully selected materials — clear prices, guaranteed quality, fast home delivery.',
  t1:'Fast shipping',t2:'Cash on delivery',t3:'14-day exchange',slogan:'Style. Quality. Trust.',
  browseEyebrow:'Find your style',catsT:'Shop by Category',bestEyebrow:'Most wanted',bestT:'Best Sellers',lastEyebrow:'Almost gone',lastT:'Last Pieces',newEyebrow:'Just arrived',newT:'New Arrivals',viewAll:'View all',
  p1:'Free shipping over 2000 EGP',p2:'Cash on delivery',p3:'14-day exchange'});

/* بناء الهيدر والفوتر ثم تطبيق اللغة */
chrome();applyLang();

/* عرض شبكة التصنيفات الثمانية */
(function(){
  const L=getLang();
  const categoryGrid=document.getElementById('catGrid');
  const categoryImages={
    women:'assets/images/categories/women.webp',
    organizers:'assets/images/categories/organizers.webp'
  };
  const existingCards=categoryGrid.querySelectorAll('.cat').length;
  CATS.slice(existingCards).forEach(category=>{
    const card=document.createElement('a');
    card.className='cat';
    card.href=`shop.html?cat=${category.id}`;
    const image=categoryImages[category.id];
    const visual=image
      ?`<img src="${image}" alt="${L==='ar'?category.ar:category.en}" decoding="async">`
      :`<span class="cat-placeholder" aria-hidden="true">${category.e}</span>`;
    card.innerHTML=`<span class="cat-visual">${visual}</span><b>${L==='ar'?category.ar:category.en}</b>`;
    categoryGrid.append(card);
  });
  categoryGrid.querySelectorAll('.cat b').forEach((label,index)=>{
    const category=CATS[index];
    if(category)label.textContent=L==='ar'?category.ar:category.en;
  });

})();

/* عرض أقسام المنتجات بنفس مصدر البيانات، بدون تكرار منتجات أو منطق */
(function(){
  const sections={
    bestSellers:PRODUCTS.filter(p=>p.stock).slice(0,6),
    lastPieces:PRODUCTS.filter(p=>p.stock&&p.price<1000).slice(0,6),
    newArrivals:PRODUCTS.filter(p=>p.badge==='new').slice(0,6)
  };
  Object.entries(sections).forEach(([id,items])=>{
    const box=document.getElementById(id);
    const section=box?.closest('.product-section');
    if(!items.length){
      if(section)section.hidden=true;
      return;
    }
    if(section)section.hidden=false;
    box.innerHTML=items.map(cardHTML).join('');
    bindCards(box);
  });
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
