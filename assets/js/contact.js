/* ===== القسم المشترك: بيانات + سلة + لغة + هيدر/فوتر ===== */
const CATS=[{id:'watches',ar:'ساعات',en:'Watches',e:'⌚'},{id:'glasses',ar:'نظارات',en:'Glasses',e:'🕶️'},{id:'perfumes',ar:'عطور',en:'Perfumes',e:'🌸'},{id:'wallets',ar:'محافظ',en:'Wallets',e:'👛'},{id:'cardholders',ar:'حوافظ كروت',en:'Card Holders',e:'💳'},{id:'handbags',ar:'شنط يد',en:'Hand Bags',e:'👜'},{id:'crossbags',ar:'شنط كروس',en:'Cross Bags',e:'🎒'},{id:'belts',ar:'أحزمة',en:'Belts',e:'🪢'},{id:'women',ar:'حريمي',en:'Women',e:'💎'},{id:'organizers',ar:'منظمات وحافظات',en:'Organizers & Cases',e:'🗃️'}];
const PRODUCTS=[]; /* لا نحتاج المنتجات في صفحة التواصل */
const I18N={ar:{brand:'SANAD',ship:'شحن ثابت 100 ج.م لكل طلب',home:'الرئيسية',searchPh:'ابحث هنا...',shipNote:'الشحن لكل محافظات مصر، وطلبك بيوصل خلال ٤-٧ أيام.',phone:'للطلبات والاستفسار: 01107859933',shopBy:'تسوق حسب',info:'معلومات',service:'خدمة العملاء',follow:'تابعنا',news:'النشرة البريدية',emailPh:'اكتب بريدك الإلكتروني',subbed:'تم الاشتراك بنجاح ✓',wa:'اطلب عبر واتساب',add:'أضف للسلة',order:'اطلب الآن',sale:'خصم',new:'جديد',out:'نفدت',added:'تمت الإضافة للسلة ✓',about:'من نحن',shipPol:'سياسة الشحن',ret:'الاستبدال والإرجاع',cartT:'السلة',track:'متابعة الطلب',contact:'تواصل معنا'},en:{brand:'SANAD',ship:'Fixed shipping: 100 EGP per order',home:'Home',searchPh:'Search...',shipNote:'Shipping to all Egypt governorates, delivery in 4-7 days.',phone:'Orders & inquiries: 01107859933',shopBy:'Shop By',info:'Information',service:'Customer Service',follow:'Follow Us',news:'Newsletter',emailPh:'Enter your email',subbed:'Subscribed ✓',wa:'Order on WhatsApp',add:'Add To Cart',order:'Order Now',sale:'Sale',new:'New',out:'Sold out',added:'Added to cart ✓',about:'About Us',shipPol:'Shipping Policy',ret:'Returns & Exchange',cartT:'Cart',track:'Track Order',contact:'Contact Us'}};
const getLang=()=>localStorage.getItem('lang')||'en';
const fmt=n=>getLang()==='ar'?n.toLocaleString('en-US')+' ج.م':'LE '+n.toLocaleString('en-US');
const getCart=()=>SanadSafety.cart();
const setCart=c=>{SanadSafety.saveCart(c);syncCart();};
const cartQty=()=>getCart().reduce((s,x)=>s+x.q,0);
function addToCart(id,qty=1,variant=''){const c=getCart();const f=c.find(x=>x.id===id&&x.variant===variant);f?f.q+=qty:c.push({id,q:qty,variant});setCart(c);toast(I18N[getLang()].added);}
function syncCart(){const el=document.getElementById('cartCount');if(el)el.textContent=cartQty();}
function toast(m){let t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),1600);}
function applyLang(){const L=getLang();document.documentElement.lang=L;document.documentElement.dir=L==='ar'?'rtl':'ltr';document.querySelectorAll('[data-i18n]').forEach(el=>{if(I18N[L][el.dataset.i18n]!=null)el.textContent=I18N[L][el.dataset.i18n];});document.querySelectorAll('[data-i18n-ph]').forEach(el=>{if(I18N[L][el.dataset.i18nPh]!=null)el.placeholder=I18N[L][el.dataset.i18nPh];});}
function chrome(){const L=getLang();document.getElementById('chrome-top').innerHTML=`<div class="topbar"><div class="mtrack" dir="ltr">${('<span>'+I18N[L].ship+'</span>').repeat(6)}</div></div><header class="hdr"><a class="logo" href="index.html"><b>${I18N[L].brand}</b></a><nav class="nav"><a href="index.html">${I18N[L].home}</a>${CATS.map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}</nav><div class="acts"><form id="sForm" class="sform"><input id="sInp" data-i18n-ph="searchPh"><button>🔍</button></form><button id="langBtn" class="ibtn">${L==='ar'?'EN':'عربي'}</button><a class="ibtn" href="cart.html">🛒<span id="cartCount" class="count">0</span></a></div></header>`;document.getElementById('chrome-bottom').innerHTML=`<footer class="ftr"><div class="fgrid"><div><h4>${I18N[L].brand}</h4><p>${I18N[L].shipNote}</p><p>${I18N[L].phone}</p></div><div><h4>${I18N[L].shopBy}</h4>${CATS.slice(0,5).map(c=>`<a href="shop.html?cat=${c.id}">${L==='ar'?c.ar:c.en}</a>`).join('')}</div><div><h4>${I18N[L].info}</h4><a href="contact.html">${I18N[L].about}</a><a href="contact.html">${I18N[L].shipPol}</a><a href="contact.html">${I18N[L].ret}</a></div><div><h4>${I18N[L].service}</h4><a href="contact.html">${I18N[L].contact}</a><a href="cart.html">${I18N[L].cartT}</a><a href="contact.html">${I18N[L].track}</a></div><div><h4>${I18N[L].follow}</h4><div class="social">📘 📸 🐦 📌</div><h4>${I18N[L].news}</h4><form id="nForm" class="nform"><input id="nInp" type="email" required data-i18n-ph="emailPh"><button class="btn">${L==='ar'?'اشترك':'Submit'}</button></form></div></div></footer><a class="wa" target="_blank" href="https://wa.me/201107859933">💬 <span>${I18N[L].wa}</span></a><div id="toast" class="toast"></div>`;document.getElementById('langBtn').onclick=()=>{localStorage.setItem('lang',L==='ar'?'en':'ar');location.reload();};document.getElementById('sForm').onsubmit=e=>{e.preventDefault();const v=document.getElementById('sInp').value.trim();location.href='shop.html'+(v?'?q='+encodeURIComponent(v):'');};document.getElementById('nForm').onsubmit=e=>{e.preventDefault();localStorage.setItem('news',document.getElementById('nInp').value);toast(I18N[getLang()].subbed);e.target.reset();};syncCart();}

/* =====================================================
   منطق صفحة تواصل معنا: حفظ الرسائل مؤقتًا حتى ربط Appwrite
===================================================== */
/* نصوص صفحة التواصل */
Object.assign(I18N.ar,{conTitle:'تواصل معنا',sendMsg:'أرسل لنا رسالة',cName:'الاسم',cEmail:'البريد الإلكتروني',cSubj:'الموضوع',cMsg:'الرسالة',sendBtn:'إرسال الرسالة',getInTouch:'تواصل مباشرة',callUs:'اتصل بنا',emailUs:'البريد الإلكتروني',visitUs:'العنوان',addrVal:'القاهرة، مصر',workHrs:'ساعات العمل',hrsVal:'السبت - الخميس: 9 ص - 9 م',msgSent:'تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.'});
Object.assign(I18N.en,{conTitle:'Contact Us',sendMsg:'Send us a message',cName:'Name',cEmail:'Email',cSubj:'Subject',cMsg:'Message',sendBtn:'Send Message',getInTouch:'Get in Touch',callUs:'Call Us',emailUs:'Email Us',visitUs:'Visit Us',addrVal:'Cairo, Egypt',workHrs:'Working Hours',hrsVal:'Sat - Thu: 9 AM - 9 PM',msgSent:'Message sent successfully! We will reply soon.'});

chrome();applyLang();

/* معالجة إرسال نموذج التواصل */
document.getElementById('conForm').onsubmit=e=>{
  e.preventDefault();
  const L=getLang();
  const msg={
    id:Date.now(),
    name:document.getElementById('cName').value,
    email:document.getElementById('cEmail').value,
    subject:document.getElementById('cSubj').value,
    message:document.getElementById('cMsg').value,
    date:new Date().toISOString()
  };
  const messages=JSON.parse(localStorage.getItem('messages')||'[]');
  messages.push(msg);
  localStorage.setItem('messages',JSON.stringify(messages));
  toast(I18N[L].msgSent);
  e.target.reset();
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
