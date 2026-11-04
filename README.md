# जाणता राजा एंटरप्राइजेस — ग्रामपंचायत व संस्थात्मक खरेदी पोर्टल
### Gram Panchayat & Public Institutional Procurement Portal

> **A B2B / B2G Institutional Product Catalogue & Enquiry Portal** built for **Jaanta Raja Enterprises (जाणता राजा एंटरप्राइजेस)**, Lonar, District Buldhana, Maharashtra.  
> *Authorised GeM (Government e-Marketplace) Registered Seller.*

---

## 🏛️ १. प्रकल्पाची मूळ संकल्पना (Project Essence)

हे कोणतेही सर्वसामान्य ई-कॉमर्स (Amazon / Flipkart) संकेतस्थळ नाही. ग्रामपंचायती आणि शासकीय संस्थांची खरेदी प्रक्रिया सामान्य ग्राहकांपेक्षा पूर्णपणे वेगळी असते:
1. **थेट ऑनलाइन पेमेंट नसते:** ग्रामपंचायतींना आधी मंजुरीसाठी अधिकृत **दरपत्रक (Quotation)** लागते, त्यानंतर GeM पोर्टल किंवा शासकीय प्रक्रियेद्वारे बिलिंग होते.
2. **सुलभ व मोठा UI (Accessible for 30–60 Age Group):** १६ ते १८px मोठा व सुवाच्य फॉन्ट, उच्च कॉन्ट्रास्ट, आणि किमान ४४–४८px चे मोठे टच टार्गेट्स, जेणेकरून सरपंच, ग्रामसेवक आणि ग्रामीण प्रशासकीय कर्मचारी मोबाईलवरही सहज वापरू शकतील.
3. **द्विभाषिक सुविधा (Bilingual Interface):** एका क्लिकवर संपूर्ण पोर्टल **मराठी ⇋ English** मध्ये बदलण्याची सोय.
4. **स्थानिक डेटा साठवणूक (Zero Backend / Local Persistence):** बॅकएंड किंवा डेटाबेसची गरज नसून ब्राऊझरचे `localStorage` वापरून कार्ट (`jr_cart`), सबमिट केलेले खरेदी अर्ज (`jr_enquiries`), आणि निवडलेली भाषा (`jr_language`) सुरक्षित राहते.
5. **पारदर्शक व अधिकृत माहिती:** खोटे डिस्काउंट्स (उदा. ९३% ऑफ), बनावट रेटिंग्ज किंवा पेमेंट गेटवे नसून, **"दर चौकशीवर उपलब्ध (Contact for Price)"** असा प्रामाणिक संस्थात्मक दृष्टिकोन.

---

## 📦 २. कॅटलॉगमधील अधिकृत वर्गवारी व उत्पादने (Verified Catalogue Categories)

ब्रोशरमधील व्हिज्युअल कॅटलॉग पानांवर (PDF Pages 10–13) दाखवल्यानुसार सर्व **२३ अधिकृत उत्पादने** ४ मुख्य विभागांत अचूक विभागली आहेत:
1. **पाणीपुरवठा साहित्य (Water Systems - ६ उत्पादने):** RO प्लांट (५००/१००० LPH), वॉटर सॉफ्टनर, वॉटर प्युरिफायर, SS वॉटर कुलर, HDPE ३-लेअर पाणी टाकी, सबमर्सिबल पंप.
2. **खेळ व ओपन जिम साहित्य (Playground & Open Gym - ५ उत्पादने):** मुलांची घसरगुंडी (Slide), २-सीटर मेटल झोपाळा (Swing), सी-सॉ (See-Saw), मेरी गो राउंड (Merry-Go-Round), ओपन जिम फिटनेस उपकरणे.
3. **ग्रामपंचायत नागरी सुविधा (Village Infrastructure & Civic Products - ६ उत्पादने):** ग्लास लॉक सूचना फलक, रेडियम दिशादर्शक फलक, SS ३०४ स्टील रेलिंग, हेवी ड्युटी मॅनहोल कव्हर, ड्रेनेज कव्हर, शासकीय ध्वजस्तंभ (Flag Pole).
4. **पॉवर, सोलर व सुरक्षा (Power, Solar & Safety - ६ उत्पादने):** सायलेंट जनरेटर, होम/सोलर इन्व्हर्टर, ट्युब्युलर बॅटरी, अग्निशामक यंत्र (Fire Extinguisher), फर्स्ट एड किट, सोलर उपकरणे (Solar Panels & Street Lights).

---

## 🛠️ ३. वापरलेले तंत्रज्ञान (Tech Stack)

- **Frontend Core:** React 18 (Functional Components, Hooks)
- **Language:** TypeScript (कडक टाईप-सेफ्टी, Zero `any`)
- **Styling & Design System:** Tailwind CSS (GeM Navy `#0B2545`, Muted Saffron, Restrained Green)
- **Icons:** Lucide React
- **Build Tool:** Vite 6
- **Persistence:** Browser `localStorage` (सुरक्षित try/catch सह `jr_cart`, `jr_enquiries`, `jr_language`)
- **Typography:** Google Fonts (Inter + Noto Sans Devanagari)

---

## 📁 ४. फोल्डर रचना (Project Structure)

```text
Gram_panchayat/
├── public/
│   ├── favicon.svg              # 'R' ब्रँड लोगो फेविकॉन
│   └── images/
│       └── products/            # २३ अस्सल ब्रोशर PNG पॅकशॉट्स + ब्रँडिंग इमेजेस
├── src/
│   ├── components/              # Reusable UI घटक
│   │   ├── Header.tsx           # GeM बॅज, कॉल लिंक्स, भाषा स्विच व कार्ट काऊंटर
│   │   ├── Footer.tsx           # पत्ता, फोन, कॅटेगरी लिंक्स व वैधानिक स्पष्टीकरण
│   │   ├── Hero.tsx             # संस्थात्मक हेरो बॅनर, प्रो. सचिन गायकवाड ब्रँडिंग व ८-क्षेत्र ओव्हरव्ह्यू
│   │   ├── SearchBar.tsx        # इन्स्टंट सर्च बार
│   │   ├── CategoryTiles.tsx    # कॅटेगरीजचे इंटरॅक्टिव्ह टाइल्स
│   │   ├── ProductCard.tsx      # GeM स्टाईल प्रॉडक्ट कार्ड
│   │   ├── ProductImage.tsx     # १:१ स्केल्ड पॅकशॉट व फॉलबॅक
│   │   └── Toast.tsx            # कार्ट फीडबॅक मेसेज
│   ├── context/                 # State Management
│   │   ├── CartContext.tsx      # कार्ट ॲड, रीमूव्ह, संख्या नियंत्रण व `jr_cart` सिंक
│   │   ├── LanguageContext.tsx  # मराठी ⇋ इंग्रजी भाषांतर व `jr_language` सिंक
│   │   └── EnquiryContext.tsx   # कोटेशन नोंदणी, `jr_enquiries` व WhatsApp लिंक
│   ├── data/                    # Single Source of Truth
│   │   ├── categories.ts        # ४ मुख्य वर्गवारीची माहिती व आयकॉन्स
│   │   └── products.ts          # २३ प्रमाणित ब्रोशर उत्पादने व तांत्रिक तपशील
│   ├── pages/                   # मुख्य पेजेस (Section 4 नुसार)
│   │   ├── Home.tsx             # मुख्य पृष्ठ (Hero, Search, Categories, Horizontal Product Rows)
│   │   ├── Products.tsx         # सर्व उत्पादने, कॅटेगरी साइडबार व सॉर्टिंग
│   │   ├── ProductDetails.tsx   # स्वतंत्र उत्पादन तपशील पेज (Image 4 लेआउट, Accordions, Related Products)
│   │   ├── Cart.tsx             # निवडलेली उत्पादने व संख्या नियंत्रण (3-Step Indicator)
│   │   ├── Enquiry.tsx          # ग्रामपंचायत खरेदी अर्ज व अधिकृत पावती
│   │   ├── About.tsx            # व्यवसाय परिचय व ध्येय
│   │   └── Contact.tsx          # संपर्क, पत्ता व थेट कॉल लिंक्स
│   ├── types/
│   │   └── index.ts             # TypeScript मॉडेल्स (Product, Category, Enquiry)
│   ├── utils/
│   │   ├── storage.ts           # सुरक्षित localStorage हेल्पर (jr_cart, jr_enquiries, jr_language)
│   │   └── validation.ts        # १०-अंकी भारतीय मोबाईल व फॉर्म व्हॅलिडेशन
│   ├── styles/
│   │   └── index.css            # Tailwind बेस, मोठा फॉन्ट व 44px टार्गेट्स
│   ├── App.tsx                  # मुख्य राऊटिंग व लेआउट
│   └── main.tsx                 # React DOM Root
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
│   ├── App.tsx                  # मुख्य राऊटिंग व लेआउट
│   └── main.tsx                 # React DOM Root
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 ५. लोकल मशीनवर प्रोजेक्ट कसा चालवायचा? (Setup & Run Instructions)

### १. आवश्यकता (Prerequisites)
- [Node.js](https://nodejs.org/) (आवृत्ती 18 किंवा नवीन)
- Git

### २. क्लोन करा (Clone Repository)
```bash
git clone https://github.com/chendkapure-vansh/gram_panchayat_requirement_portal.git
cd gram_panchayat_requirement_portal
```

### ३. डिपेंडन्सीज इन्स्टॉल करा (Install Dependencies)
```bash
npm install
```

### ४. डेव्हलपमेंट सर्व्हर सुरू करा (Start Dev Server)
```bash
npm run dev
```
टर्मिनलमध्ये दिलेल्या लिंकवर (उदा. **`http://localhost:3000`** किंवा **`http://localhost:3001`**) ब्राऊझरमध्ये उघडा.

### ५. प्रॉडक्शन बिल्ड व टाईप-चेक (Production Build)
```bash
npm run build
```
*(हे कमांड `tsc -b` द्वारे कडक टाईप-चेक करते आणि `dist/` फोल्डरमध्ये ऑप्टिमाइझ्ड प्रॉडक्शन बंडल तयार करते).*

### ६. प्रॉडक्शन प्रिव्ह्यू तपासा (Preview Production Build)
```bash
npm run preview
```

---

## 📱 ६. संपूर्ण वापरकर्ता प्रवास (User Journey Walkthrough)

1. **ब्राउझिंग व शोध:** वापरकर्ता होम पेज उघडतो, सर्च बारमध्ये नाव टाकतो किंवा १० पैकी एका कॅटेगरीवर क्लिक करतो.
2. **उत्पादनाचे तपशील:** उत्पादनावरील *"तपशील पहा"* वर क्लिक केल्यावर GeM स्क्रीनशॉटप्रमाणे मोठा फोटो, विक्रेता माहिती, आणि संपूर्ण **Key-Value तांत्रिक तपशील तक्ता (Specifications Table)** दिसतो.
3. **कार्टमध्ये जोडणे:** *"कार्टमध्ये जोडा"* वर क्लिक करून हवी तितकी संख्या (+/-) निवडतो.
4. **खरेदी चौकशी अर्ज (Enquiry):**
   - ग्रामपंचायतीचे नाव, संपर्क अधिकारी, पद, १०-अंकी मोबाईल नंबर, गाव, तालुका व जिल्हा टाकतो.
   - कार्टमधील वस्तूंची यादी आपोआप अर्जाला जोडली जाते.
5. **अधिकृत पावती व WhatsApp:**
   - अर्ज सबमिट झाल्यावर स्क्रीनवर हिरवी **अधिकृत कोटेशन पावती (Confirmation Slip)** दिसते.
   - नोंदणी क्रमांक (उदा. `JR-ENQ-2026-4821`) मिळतो.
   - **"WhatsApp वर कोटेशन पाठवा"** बटणावर क्लिक करताच जाणता राजा एंटरप्राइजेसच्या अधिकृत नंबरवर (**7059587711**) संपूर्ण कोटेशनचा मेसेज आपोआप तयार होतो.
   - सर्व डेटा ब्राऊझरच्या `localStorage` मध्ये कायम सुरक्षित राहतो.

---

## 🔒 ७. वैधानिक स्पष्टीकरण व मर्यादा (Compliance & Limitations)

1. **सरकारी राजमुद्रा नाही:** भारत सरकारची अधिकृत राजमुद्रा (अशोकस्तंभ) किंवा अधिकृत सरकारी लोगो वापरलेला नाही. हे जाणता राजा एंटरप्राइजेसचे अधिकृत B2B कॅटलॉग आहे.
2. **नो पेमेंट गेटवे:** ग्रामपंचायत व संस्थात्मक खरेदी नियमांनुसार थेट पेमेंट नसते; केवळ अधिकृत कोटेशन मागणी व चौकशी प्रक्रिया आहे.
3. **Frontend Prototype:** हे पूर्णतः क्लायंट-साइड React ॲप्लिकेशन असून `localStorage` द्वारे डेटा जतन करतो.

---

## 📞 ८. अधिकृत व्यावसायिक संपर्क (Business Contact)

* **प्रतिष्ठान:** जाणता राजा एंटरप्राइजेस (Jaanta Raja Enterprises)
* **संचालक:** प्रो. प्रा. सचिन गायकवाड
* **पत्ता:** स्टेट बँक समोर, लोणार, जि. बुलढाणा - ४४३३०२ (महाराष्ट्र)
* **मोबाईल संपर्क:** 7059587711 / 9371301001
* **GeM दर्जा:** GeM नोंदणीकृत अधिकृत विक्रेता (GeM Authorised Seller)
* **ध्येय:** *"गुणवत्ता आमची ओळख... सेवा आमची प्रतिज्ञा... समाधान तुमचे आमचे ध्येय !"*
