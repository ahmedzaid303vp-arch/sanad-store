/* ===== القسم المشترك: بيانات + سلة + لغة + هيدر/فوتر ===== */
const CATS=[{id:'watches',ar:'ساعات',en:'Watches',e:'⌚'},{id:'glasses',ar:'نظارات',en:'Glasses',e:'🕶️'},{id:'perfumes',ar:'عطور',en:'Perfumes',e:'🌸'},{id:'wallets',ar:'محافظ',en:'Wallets',e:'👛'},{id:'cardholders',ar:'حوافظ كروت',en:'Card Holders',e:'💳'},{id:'handbags',ar:'شنط يد',en:'Hand Bags',e:'👜'},{id:'crossbags',ar:'شنط كروس',en:'Cross Bags',e:'🎒'},{id:'belts',ar:'أحزمة',en:'Belts',e:'🪢'},{id:'women',ar:'حريمي',en:'Women',e:'💎'},{id:'organizers',ar:'منظمات وحافظات',en:'Organizers & Cases',e:'🗃️'}];
const PRODUCTS=[{id:1,cat:'watches',ar:'ساعة أوتوماتيك فضية 41مم',en:'Automatic Silver Watch 41mm',price:4000,old:6000,badge:'sale',stock:1,colors:['#c8c8c8']},{id:2,cat:'watches',ar:'ساعة رويال أوك',en:'Royal Oak Watch',price:899,old:1200,badge:'sale',stock:1,colors:['#c8c8c8']},{id:3,cat:'watches',ar:'ساعة كلاسيك جلد بني',en:'Classic Brown Leather Watch',price:1500,old:0,badge:'new',stock:1,colors:['#6b4a2f']},{id:4,cat:'watches',ar:'ساعة رياضية سوداء',en:'Black Sport Watch',price:2500,old:0,badge:'new',stock:0,colors:['#2b2b2b']},{id:5,cat:'watches',ar:'ساعة نسائية ذهبية',en:'Gold Women Watch',price:3200,old:3800,badge:'sale',stock:1,colors:['#d9b64a']},{id:6,cat:'watches',ar:'ساعة ميناء أزرق',en:'Blue Dial Watch',price:4000,old:6000,badge:'sale',stock:1,colors:['#1e3d5c']},{id:7,cat:'glasses',ar:'نظارة شمس أفيتور',en:'Aviator Sunglasses',price:650,old:850,badge:'sale',stock:1,colors:['#d9b64a']},{id:8,cat:'glasses',ar:'نظارة طبية إطار أسود',en:'Black Frame Optical Glasses',price:450,old:0,badge:'new',stock:1,colors:['#2b2b2b']},{id:9,cat:'perfumes',ar:'عطر عود ملكي 50مل',en:'Royal Oud Perfume 50ml',price:1200,old:1500,badge:'sale',stock:1,colors:['#6b4a2f']},{id:10,cat:'perfumes',ar:'عطر زهور الصباح',en:'Morning Flowers Perfume',price:780,old:0,badge:'new',stock:1,colors:['#cfdcb4']},{id:11,cat:'wallets',ar:'محفظة جلد طبيعي',en:'Genuine Leather Wallet',price:550,old:700,badge:'sale',stock:1,colors:['#6b4a2f']},{id:12,cat:'wallets',ar:'محفظة جلد صناعي',en:'Faux Leather Wallet',price:480,old:0,badge:'new',stock:1,colors:['#2b2b2b']},{id:13,cat:'cardholders',ar:'حافظة كروت معدنية',en:'Metal Card Holder',price:350,old:0,badge:'new',stock:1,colors:['#c8c8c8']},{id:14,cat:'cardholders',ar:'حافظة كروت جلد',en:'Leather Card Holder',price:250,old:400,badge:'sale',stock:1,colors:['#6b4a2f']},{id:15,cat:'handbags',ar:'شنطة يد جلد أسود',en:'Black Leather Hand Bag',price:1800,old:2200,badge:'sale',stock:1,colors:['#2b2b2b']},{id:16,cat:'handbags',ar:'شنطة يد سواريه',en:'Evening Hand Bag',price:950,old:0,badge:'new',stock:1,colors:['#d9b64a']},{id:17,cat:'crossbags',ar:'شنطة كروس جلد',en:'Leather Cross Bag',price:850,old:1100,badge:'sale',stock:1,colors:['#6b4a2f']},{id:18,cat:'crossbags',ar:'شنطة كروس قماش',en:'Canvas Cross Bag',price:600,old:0,badge:'new',stock:1,colors:['#efe8d8']},{id:19,cat:'belts',ar:'حزام جلد كلاسيكي',en:'Classic Leather Belt',price:450,old:600,badge:'sale',stock:1,colors:['#6b4a2f']},{id:20,cat:'belts',ar:'حزام كاجوال',en:'Casual Belt',price:300,old:0,badge:'new',stock:1,colors:['#2b2b2b']}];
const I18N={ar:{brand:'SANAD',ship:'شحن ثابت 100 ج.م لكل طلب',home:'الرئيسية',searchPh:'ابحث هنا...',shipNote:'الشحن لكل محافظات مصر، وطلبك بيوصل خلال ٤-٧ أيام.',phone:'للطلبات والاستفسار: 01107859933',shopBy:'تسوق حسب',info:'معلومات',service:'خدمة العملاء',follow:'تابعنا',news:'النشرة البريدية',emailPh:'اكتب بريدك الإلكتروني',subbed:'تم الاشتراك بنجاح ✓',wa:'اطلب عبر واتساب',add:'أضف للسلة',order:'اطلب الآن',sale:'خصم',new:'جديد',out:'نفدت',added:'تمت الإضافة للسلة ✓',about:'من نحن',shipPol:'سياسة الشحن',ret:'الاستبدال والإرجاع',cartT:'السلة',track:'متابعة الطلب',contact:'تواصل معنا'},en:{brand:'SANAD',ship:'Fixed shipping: 100 EGP per order',home:'Home',searchPh:'Search...',shipNote:'Shipping to all Egypt governorates, delivery in 4-7 days.',phone:'Orders & inquiries: 01107859933',shopBy:'Shop By',info:'Information',service:'Customer Service',follow:'Follow Us',news:'Newsletter',emailPh:'Enter your email',subbed:'Subscribed ✓',wa:'Order on WhatsApp',add:'Add To Cart',order:'Order Now',sale:'Sale',new:'New',out:'Sold out',added:'Added to cart ✓',about:'About Us',shipPol:'Shipping Policy',ret:'Returns & Exchange',cartT:'Cart',track:'Track Order',contact:'Contact Us'}};
PRODUCTS.length=0;
const appwriteProducts=window.SanadAppwrite?.cachedProducts||[];
PRODUCTS.push(...(appwriteProducts.length?appwriteProducts:SanadSafety.products()),...(appwriteProducts.length?[]:SanadSafety.demoProducts()));
const getLang=()=>localStorage.getItem('lang')||'en';
const fmt=n=>getLang()==='ar'?n.toLocaleString('en-US')+' ج.م':'LE '+n.toLocaleString('en-US');
const getCart=()=>SanadSafety.cart();
const setCart=c=>{SanadSafety.saveCart(c);syncCart();};
const cartQty=()=>getCart().reduce((s,x)=>s+x.q,0);
function addToCart(id,qty=1,variant=''){const c=getCart();const f=c.find(x=>x.id===id&&x.variant===variant);f?f.q+=qty:c.push({id,q:qty,variant});setCart(c);toast(I18N[getLang()].added);}
function syncCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cartQty();}
function toast(m){let t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1600);}
const emojiOf=p=>CATS.find(c=>c.id===p.cat).e;
function applyLang(){const L=getLang();document.documentElement.lang=L;document.documentElement.dir=L==='ar'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(el=>{if(I18N[L][el.dataset.i18n]!=null)el.textContent=I18N[L][el.dataset.i18n];});document.querySelectorAll('[data-i18n-ph]').forEach(el=>{if(I18N[L][el.dataset.i18nPh]!=null)el.placeholder=I18N[L][el.dataset.i18nPh];});}
function chrome(){const L=getLang();document.getElementById('chrome-top').innerHTML=`<div class="topbar"><div class="mtrack" dir="ltr">${('<span>'+I18N[L].ship+'</span>').repeat(6)}</div></div><header class="hdr"><a class="logo" href="index.html"><b>${I18N[L].brand}</b></a><nav class="nav"><a href="index.html">${I18N[L].home}</a>${CATS.map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}</nav><div class="acts"><form id="sForm" class="sform"><input id="sInp" data-i18n-ph="searchPh"><button>🔍</button></form><button id="langBtn" class="ibtn">${L==='ar'?'EN':'عربي'}</button><a class="ibtn" href="cart.html">🛒<span id="cartCount" class="count">0</span></a></div></header>`;document.getElementById('chrome-bottom').innerHTML=`<footer class="ftr"><div class="fgrid"><div><h4>${I18N[L].brand}</h4><p>${I18N[L].shipNote}</p><p>${I18N[L].phone}</p></div><div><h4>${I18N[L].shopBy}</h4>${CATS.slice(0,5).map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}</div><div><h4>${I18N[L].info}</h4><a href="contact.html">${I18N[L].about}</a><a href="contact.html">${I18N[L].shipPol}</a><a href="contact.html">${I18N[L].ret}</a></div><div><h4>${I18N[L].service}</h4><a href="contact.html">${I18N[L].contact}</a><a href="cart.html">${I18N[L].cartT}</a><a href="contact.html">${I18N[L].track}</a></div><div><h4>${I18N[L].follow}</h4><div class="social">📘 📸 🐦 📌</div><h4>${I18N[L].news}</h4><form id="nForm" class="nform"><input id="nInp" type="email" required data-i18n-ph="emailPh"><button class="btn">${L==='ar'?'اشترك':'Submit'}</button></form></div></div></footer><a class="wa" target="_blank" href="https://wa.me/201107859933">💬 <span>${I18N[L].wa}</span></a><div id="toast" class="toast"></div>`;document.getElementById('langBtn').onclick=()=>{localStorage.setItem('lang',L==='ar'?'en':'ar');location.reload();};document.getElementById('sForm').onsubmit=e=>{e.preventDefault();const v=document.getElementById('sInp').value.trim();location.href='shop.html'+(v?'?q='+encodeURIComponent(v):'');};document.getElementById('nForm').onsubmit=e=>{e.preventDefault();localStorage.setItem('news',document.getElementById('nInp').value);toast(I18N[getLang()].subbed);e.target.reset();};syncCart();}

/* =====================================================
   منطق صفحة إتمام الطلب: نموذج الشحن + حفظ الطلب
===================================================== */
/* نصوص صفحة إتمام الطلب */
Object.assign(I18N.ar,{chkTitle:'إتمام الطلب',shipInfo:'بيانات الشحن',fName:'الاسم بالكامل',fPhone:'رقم الموبايل',fGov:'المحافظة',fCity:'المدينة / المركز',fAddr:'العنوان بالتفصيل',fNotes:'ملاحظات (اختياري)',payMeth:'طريقة الدفع',cod:'الدفع عند الاستلام',placeOrder:'تأكيد الطلب',orderSum:'ملخص الطلب',subtotal:'المجموع الفرعي',shipping:'الشحن',freeShip:'مجاني',total:'الإجمالي',success:'تم استلام طلبك بنجاح! سيتم التواصل معك قريبًا.',orderError:'تعذر تسجيل الطلب الآن. حاول مرة أخرى.',empty:'السلة فاضية، يرجى إضافة منتجات أولًا.'});
Object.assign(I18N.en,{chkTitle:'Checkout',shipInfo:'Shipping Information',fName:'Full Name',fPhone:'Phone Number',fGov:'Governorate',fCity:'City / District',fAddr:'Detailed Address',fNotes:'Notes (Optional)',payMeth:'Payment Method',cod:'Cash on Delivery',placeOrder:'Place Order',orderSum:'Order Summary',subtotal:'Subtotal',shipping:'Shipping',freeShip:'Free',total:'Total',success:'Order placed successfully! We will contact you soon.',orderError:'We could not place your order. Please try again.',empty:'Cart is empty, please add products first.'});

chrome();applyLang();

const L=getLang();
const savedCart=getCart();
const cart=PRODUCTS.length?savedCart.filter(item=>PRODUCTS.some(product=>product.id===item.id)):[];
if(PRODUCTS.length&&cart.length!==savedCart.length)setCart(cart);
const hasOrder=cart.length>0;

/* لو السلة فاضية، يرجع لصفحة السلة */
if(!hasOrder){
  toast(I18N[L].empty);
  setTimeout(()=>location.href='cart.html',1500);
}

/* حساب الإجماليات ورسم الملخص */
let subtotal=0;
const itemsHTML=cart.map(c=>{
  const p=PRODUCTS.find(x=>x.id===c.id);
  if(!p)return '';
  const name=L==='ar'?p.ar:p.en;
  const selectedVariant=(p.variants||[]).find(variant=>variant.id===c.variant);
  subtotal+=p.price*c.q;
  return `<div class="sum-item"><span>${name} × ${c.q}${selectedVariant?` — ${selectedVariant.label}`:''}</span><b>${fmt(p.price*c.q)}</b></div>`;
}).join('');

const ship=hasOrder?100:0;
const total=subtotal+ship;

document.getElementById('chkSummary').innerHTML=hasOrder?`
  <h3>${I18N[L].orderSum}</h3>
  ${itemsHTML}
  <div class="sum-row"><span>${I18N[L].subtotal}</span><b>${fmt(subtotal)}</b></div>
  <div class="sum-row"><span>${I18N[L].shipping}</span><b>${fmt(ship)}</b></div>
  <div class="sum-row total"><span>${I18N[L].total}</span><b>${fmt(total)}</b></div>
`:'';

/* إرسال الطلب إلى وظيفة Appwrite. هي الوحيدة التي تحسب السعر وتحفظ بيانات العميل. */
document.getElementById('chkForm').onsubmit=async e=>{
  e.preventDefault();
  if(!hasOrder)return;
  const submitButton=document.getElementById('placeBtn');
  if(submitButton.disabled)return;
  const info={
    name:document.getElementById('fName').value,
    phone:document.getElementById('fPhone').value,
    gov:document.getElementById('fGov').value,
    city:document.getElementById('fCity').value,
    addr:document.getElementById('fAddr').value,
    notes:document.getElementById('fNotes').value
  };
  const appwrite=window.SanadAppwrite?.config;
  if(!appwrite?.ordersExecutionsUrl){toast(I18N[L].orderError);return;}
  submitButton.disabled=true;
  try{
    const response=await fetch(appwrite.ordersExecutionsUrl,{
      method:'POST',
      headers:{'Content-Type':'application/json','X-Appwrite-Project':appwrite.projectId},
      body:JSON.stringify({
        body:JSON.stringify({items:cart,info}),
        async:false,
        path:'/',
        method:'POST',
        headers:{'content-type':'application/json'}
      })
    });
    const execution=await response.json().catch(()=>null);
    const result=JSON.parse(execution?.responseBody||'null');
    if(!response.ok||execution?.responseStatusCode>=400||!result?.ok)throw new Error('Order request failed');
    localStorage.removeItem('cart');
    syncCart();
    toast(I18N[L].success);
    setTimeout(()=>location.href='index.html',2000);
  }catch{
    toast(I18N[L].orderError);
    submitButton.disabled=false;
  }
};
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
