# تنظيم صور SANAD

ضع كل صورة في مكانها حسب النوع، ولا تستخدم أسماء عامة مثل `New folder` أو `1.jpg`.

```text
assets/images/
├── banners/home/                 # بنرات الصفحة الرئيسية فقط
├── categories/                   # صورة واحدة تمثل كل قسم في الصفحة الرئيسية
├── products/
│   ├── watches/
│   ├── glasses/
│   ├── perfumes/
│   ├── wallets/
│   ├── cardholders/
│   ├── handbags/
│   ├── crossbags/
│   ├── belts/
│   ├── women/
│   └── organizers/
└── archive/                      # صور قديمة لا تظهر في الموقع
```

## لكل منتج جديد

أنشئ مجلداً باسم إنجليزي بسيط وفريد داخل قسمه، مثل:

```text
products/watches/casio-a168-black/
├── cover.webp        # الصورة الأساسية التي تظهر في كارت المنتج
├── gallery-01.webp   # صور إضافية داخل صفحة المنتج
├── gallery-02.webp
└── gallery-03.webp
```

- استخدم حروفاً إنجليزية صغيرة وشرطات فقط في اسم المجلد.
- اجعل `cover` هي أوضح صورة للمنتج بخلفية نظيفة.
- يفضّل WebP للصور الجديدة، وبعرض 1200 بكسل تقريباً أو أكثر.
- صور كروت الأقسام الجديدة تُحفظ باسم `categories/women.webp` و`categories/organizers.webp`.
- عند ربط Appwrite: ارفع صور المنتج من هذا المجلد إلى Storage، ثم ضع روابط/معرّفات الصور في بيانات المنتج. لا تضع الصور الجديدة مباشرة داخل ملفات HTML أو JavaScript.
