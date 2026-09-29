/* Shared client-side guardrails. These protect rendering and local data shape;
   they are not a replacement for server-side validation after Appwrite is added. */
(function(){
  const productKey='sanadProducts';
  const categories=new Set(['watches','glasses','perfumes','wallets','cardholders','handbags','crossbags','belts','women','organizers']);
  const imagePattern=/^(?:assets\/images\/[A-Za-z0-9_./-]+|\/?uploads\/[a-f0-9-]{36}\.webp|https:\/\/[a-z0-9-]+\.cloud\.appwrite\.io\/v1\/storage\/buckets\/[^/]+\/files\/[^/]+\/(?:view|download)(?:\?[^\s]*)?|data:image\/(?:webp|png|jpeg|gif);base64,[A-Za-z0-9+/=]+)$/i;
  const colorPattern=/^#[0-9a-f]{3,8}$/i;

  const read=(key,fallback)=>{
    try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));}
    catch{return fallback;}
  };
  const text=(value,max=160)=>String(value??'')
    .replace(/[\u0000-\u001F\u007F]/g,'')
    .replace(/[<>&"']/g,'')
    .trim()
    .slice(0,max);
  const whole=(value,min,max)=>{
    const number=Number(value);
    return Number.isInteger(number)&&number>=min&&number<=max?number:null;
  };
  const amount=(value,max=1000000)=>{
    const number=Number(value);
    return Number.isFinite(number)&&number>=0&&number<=max?Math.round(number*100)/100:null;
  };
  const image=value=>typeof value==='string'&&imagePattern.test(value)?value:'';
  const color=value=>typeof value==='string'&&colorPattern.test(value)?value:'#000000';
  const variant=value=>{
    if(!value||typeof value!=='object')return null;
    const id=text(value.id,60);
    const label=text(value.label||value.id,60);
    const imageUrl=image(value.image);
    return id&&label&&imageUrl?{id,label,image:imageUrl}:null;
  };

  const product=value=>{
    if(!value||typeof value!=='object')return null;
    const id=whole(value.id,1,Number.MAX_SAFE_INTEGER);
    const price=amount(value.price);
    const cat=categories.has(value.cat)?value.cat:null;
    const ar=text(value.ar);
    const en=text(value.en);
    if(!id||price===null||!cat||!ar||!en)return null;
    const images=(Array.isArray(value.images)?value.images:[value.image]).map(image).filter(Boolean).slice(0,15);
    return {
      id,cat,ar,en,price,
      old:amount(value.old)??0,
      badge:value.badge==='sale'||value.badge==='new'?value.badge:'',
      stock:value.stock!==false,
      variants:(Array.isArray(value.variants)?value.variants:[]).map(variant).filter(Boolean).slice(0,12),
      colors:[...new Set((Array.isArray(value.colors)?value.colors:[]).map(color))].slice(0,12),
      images,image:images[0]||''
    };
  };
  const products=()=>{
    const ids=new Set();
    return read(productKey,[]).map(product).filter(item=>item&&!ids.has(item.id)&&ids.add(item.id));
  };
  /* منتج عرض مؤقت لمعاينة اختيار أكثر من لون. لا يُحفظ ضمن بيانات المتجر. */
  const demoProducts=()=>[product({
    id:900001,cat:'watches',ar:'ساعة تجريبية متعددة الألوان',en:'Demo Watch — Multiple Colors',
    price:1299,old:1599,badge:'new',stock:true,
    image:'assets/images/products/watches/product-01-green/cover.png',
    variants:[
      {id:'black',label:'الأسود',image:'assets/images/products/watches/product-01-green/cover.png'},
      {id:'gold',label:'الذهبي',image:'assets/images/products/watches/product-01-green/gallery-01.jpg'},
      {id:'green',label:'الأخضر',image:'assets/images/products/watches/product-01-green/gallery-02.jpg'}
    ]
  })].filter(Boolean);
  const saveProducts=items=>localStorage.setItem(productKey,JSON.stringify((Array.isArray(items)?items:[]).map(product).filter(Boolean)));
  const cart=()=>{
    const items=new Map();
    read('cart',[]).forEach(value=>{
      const id=whole(value?.id,1,Number.MAX_SAFE_INTEGER);
      const quantity=whole(value?.q,1,99);
      const selectedVariant=text(value?.variant,60);
      const key=`${id}:${selectedVariant}`;
      if(id&&quantity){
        const item=items.get(key)||{id,q:0,variant:selectedVariant};
        item.q=Math.min(99,item.q+quantity);
        items.set(key,item);
      }
    });
    return [...items.values()];
  };
  const saveCart=items=>localStorage.setItem('cart',JSON.stringify((Array.isArray(items)?items:[]).map(value=>({id:value?.id,q:value?.q,variant:text(value?.variant,60)}))));

  window.SanadSafety=Object.freeze({product,products,demoProducts,saveProducts,cart,saveCart,text});
})();
