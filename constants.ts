import { Vehicle, BlogPost } from './types';

export const INITIAL_VEHICLES: Vehicle[] = [
  // --- TOYOTA ---
  {
    id: 'toyota-corolla-2023',
    make: 'Toyota',
    model: 'Corolla',
    year: 2023,
    trim: '1.5 Vision',
    tireSize: '205/55 R16',
    standardLoad: { front: 33, rear: 32, frontBar: 2.3, rearBar: 2.2 },
    maxLoad: { front: 36, rear: 36, frontBar: 2.5, rearBar: 2.5 },
    description: '2023 Toyota Corolla için ideal lastik basıncı, konfor ve yakıt verimliliği dengesi sunar.'
  },
  {
    id: 'toyota-chr-2023',
    make: 'Toyota',
    model: 'C-HR',
    year: 2023,
    trim: '1.8 Hybrid',
    tireSize: '215/60 R17',
    standardLoad: { front: 33, rear: 33, frontBar: 2.3, rearBar: 2.3 },
    maxLoad: { front: 36, rear: 38, frontBar: 2.5, rearBar: 2.6 }
  },

  // --- HONDA ---
  {
    id: 'honda-civic-2022',
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    trim: '1.5 VTEC',
    tireSize: '215/50 R17',
    standardLoad: { front: 32, rear: 32, frontBar: 2.2, rearBar: 2.2 },
    maxLoad: { front: 35, rear: 35, frontBar: 2.4, rearBar: 2.4 },
    description: 'Honda Civic 2022 model araçlar için önerilen fabrika çıkış basınç değerleri.'
  },

  // --- FIAT ---
  {
    id: 'fiat-egea-2023',
    make: 'Fiat',
    model: 'Egea',
    year: 2023,
    trim: '1.4 Fire',
    tireSize: '205/55 R16',
    standardLoad: { front: 32, rear: 32, frontBar: 2.2, rearBar: 2.2 },
    maxLoad: { front: 36, rear: 39, frontBar: 2.5, rearBar: 2.7 },
    description: 'Türkiye\'nin en çok tercih edilen aracı Fiat Egea için ideal lastik basınçları.'
  },
  {
    id: 'fiat-egea-cross-2023',
    make: 'Fiat',
    model: 'Egea Cross',
    year: 2023,
    trim: '1.6 Multijet',
    tireSize: '215/55 R17',
    standardLoad: { front: 34, rear: 32, frontBar: 2.3, rearBar: 2.2 },
    maxLoad: { front: 36, rear: 38, frontBar: 2.5, rearBar: 2.6 }
  },

  // --- RENAULT ---
  {
    id: 'renault-clio-2023',
    make: 'Renault',
    model: 'Clio',
    year: 2023,
    trim: '1.0 TCe',
    tireSize: '195/55 R16',
    standardLoad: { front: 30, rear: 29, frontBar: 2.1, rearBar: 2.0 },
    maxLoad: { front: 33, rear: 35, frontBar: 2.3, rearBar: 2.4 }
  },
  {
    id: 'renault-megane-2022',
    make: 'Renault',
    model: 'Megane',
    year: 2022,
    trim: '1.3 TCe Joy',
    tireSize: '205/55 R16',
    standardLoad: { front: 33, rear: 30, frontBar: 2.3, rearBar: 2.1 },
    maxLoad: { front: 35, rear: 36, frontBar: 2.4, rearBar: 2.5 }
  },

  // --- FORD ---
  {
    id: 'ford-focus-2021',
    make: 'Ford',
    model: 'Focus',
    year: 2021,
    trim: 'Titanium',
    tireSize: '215/50 R17',
    standardLoad: { front: 34, rear: 34, frontBar: 2.3, rearBar: 2.3 },
    maxLoad: { front: 38, rear: 41, frontBar: 2.6, rearBar: 2.8 }
  },
  {
    id: 'ford-kuga-2023',
    make: 'Ford',
    model: 'Kuga',
    year: 2023,
    trim: '1.5 EcoBlue',
    tireSize: '225/60 R18',
    standardLoad: { front: 35, rear: 35, frontBar: 2.4, rearBar: 2.4 },
    maxLoad: { front: 39, rear: 44, frontBar: 2.7, rearBar: 3.0 }
  },

  // --- VW ---
  {
    id: 'vw-passat-2020',
    make: 'Volkswagen',
    model: 'Passat',
    year: 2020,
    trim: '2.0 TDI',
    tireSize: '235/45 R18',
    standardLoad: { front: 36, rear: 36, frontBar: 2.5, rearBar: 2.5 },
    maxLoad: { front: 39, rear: 44, frontBar: 2.7, rearBar: 3.0 }
  },
  {
    id: 'vw-golf-2021',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2021,
    trim: '1.0 eTSI',
    tireSize: '205/55 R16',
    standardLoad: { front: 32, rear: 32, frontBar: 2.2, rearBar: 2.2 },
    maxLoad: { front: 35, rear: 39, frontBar: 2.4, rearBar: 2.7 }
  },

  // --- BMW ---
  {
    id: 'bmw-320i-2023',
    make: 'BMW',
    model: '3 Serisi',
    year: 2023,
    trim: '320i M Sport',
    tireSize: '225/45 R18',
    standardLoad: { front: 32, rear: 35, frontBar: 2.2, rearBar: 2.4 },
    maxLoad: { front: 39, rear: 46, frontBar: 2.7, rearBar: 3.2 }
  },

  // --- HYUNDAI ---
  {
    id: 'hyundai-i20-2023',
    make: 'Hyundai',
    model: 'i20',
    year: 2023,
    trim: '1.4 MPI',
    tireSize: '195/55 R16',
    standardLoad: { front: 33, rear: 31, frontBar: 2.3, rearBar: 2.1 },
    maxLoad: { front: 36, rear: 36, frontBar: 2.5, rearBar: 2.5 }
  },
  {
    id: 'hyundai-tucson-2023',
    make: 'Hyundai',
    model: 'Tucson',
    year: 2023,
    trim: '1.6 T-GDI',
    tireSize: '235/50 R19',
    standardLoad: { front: 35, rear: 35, frontBar: 2.4, rearBar: 2.4 },
    maxLoad: { front: 38, rear: 42, frontBar: 2.6, rearBar: 2.9 }
  },

  // --- DACIA ---
  {
    id: 'dacia-duster-2022',
    make: 'Dacia',
    model: 'Duster',
    year: 2022,
    trim: '1.3 TCe',
    tireSize: '215/60 R17',
    standardLoad: { front: 32, rear: 32, frontBar: 2.2, rearBar: 2.2 },
    maxLoad: { front: 35, rear: 35, frontBar: 2.4, rearBar: 2.4 }
  },

  // --- NISSAN ---
  {
    id: 'nissan-qashqai-2023',
    make: 'Nissan',
    model: 'Qashqai',
    year: 2023,
    trim: '1.3 DIG-T',
    tireSize: '235/50 R19',
    standardLoad: { front: 33, rear: 30, frontBar: 2.3, rearBar: 2.1 },
    maxLoad: { front: 36, rear: 39, frontBar: 2.5, rearBar: 2.7 }
  },

  // --- TESLA ---
  {
    id: 'tesla-model-y-2023',
    make: 'Tesla',
    model: 'Model Y',
    year: 2023,
    trim: 'Long Range',
    tireSize: '255/45 R19',
    standardLoad: { front: 42, rear: 42, frontBar: 2.9, rearBar: 2.9 },
    maxLoad: { front: 42, rear: 42, frontBar: 2.9, rearBar: 2.9 },
    description: 'Elektrikli araçlarda menzil için lastik basıncı kritiktir. Tesla Model Y için standart 42 PSI.'
  },
  
  // --- PEUGEOT ---
  {
    id: 'peugeot-3008-2022',
    make: 'Peugeot',
    model: '3008',
    year: 2022,
    trim: '1.5 BlueHDi',
    tireSize: '225/55 R18',
    standardLoad: { front: 35, rear: 33, frontBar: 2.4, rearBar: 2.3 },
    maxLoad: { front: 36, rear: 41, frontBar: 2.5, rearBar: 2.8 }
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'kis-lastigi-basinci',
    title: 'Kış Lastiği Basıncı Kaç Olmalı?',
    excerpt: 'Kış aylarında hava sıcaklığının düşmesi lastik basıncını nasıl etkiler? İdeal değerler rehberi.',
    content: 'Soğuk havalarda lastik içindeki hava büzülür ve basınç düşer. Genel kural olarak, kışın lastik basıncınızı üretici önerisinin 2-3 PSI üzerinde tutmanız önerilir. Bu, lastiğin yere daha iyi tutunmasını sağlar ve karlı zeminlerde güvenliği artırır. Ancak basıncı aşırı artırmak da lastiğin orta kısmının aşınmasına neden olabilir, bu yüzden dengeli olmak önemlidir.',
    date: '2023-11-15'
  },
  {
    id: '2',
    slug: 'tpms-uyarisi',
    title: 'TPMS Uyarısı Neden Yanar?',
    excerpt: 'Lastik Basınç İzleme Sistemi (TPMS) ışığı yandığında ne yapmalısınız?',
    content: 'TPMS ışığı genellikle lastik basıncınızın %25 veya daha fazla düştüğünü gösterir. Bu durumda en yakın istasyona gidip tüm lastikleri kontrol etmelisiniz. Bazen sensör arızaları veya ani sıcaklık değişimleri de bu ışığın yanmasına sebep olabilir. Eğer lastiğinizde gözle görülür bir hasar yoksa, havayı tamamlayıp sistemi sıfırlamayı deneyin.',
    date: '2023-10-20'
  },
  {
    id: '3',
    slug: 'dusuk-basinc-yakit',
    title: 'Düşük Lastik Basıncı ve Yakıt Tüketimi',
    excerpt: 'Lastiklerinizin havası inikse cebinizden ne kadar fazla para çıkıyor?',
    content: 'Düşük basınç, yuvarlanma direncini artırır. Her 1 PSI düşüş, yakıt tüketimini %0.3 oranında artırabilir. Düzenli kontrol, yılda bir depo yakıt tasarrufu sağlayabilir. Ayrıca düşük basınç lastiğin yanaklarının ısınmasına ve patlama riskinin artmasına yol açar.',
    date: '2023-09-05'
  },
  {
    id: '4',
    slug: 'azot-mu-hava-mi',
    title: 'Lastiklere Azot Basmak Mantıklı mı?',
    excerpt: 'Normal hava yerine nitrojen (azot) basmanın avantajları ve dezavantajları.',
    content: 'Azot molekülleri oksijen moleküllerinden daha büyüktür, bu nedenle lastikten sızması daha uzun sürer. Bu da basıncın daha uzun süre sabit kalmasını sağlar. Ayrıca azot nemsiz olduğu için jant korozyonunu önler ve sıcaklık değişimlerinde basınç daha az oynar. Ancak günlük kullanım için normal hava da yeterlidir, çünkü havanın zaten %78\'i azottur.',
    date: '2024-01-10'
  },
  {
    id: '5',
    slug: 'lastik-omru-uzatma',
    title: 'Lastik Ömrünü Uzatmanın 5 Yolu',
    excerpt: 'Basit alışkanlıklarla lastiklerinizin kilometre ömrünü nasıl artırabilirsiniz?',
    content: '1. Ayda bir basınç kontrolü yapın.\n2. Her 10.000 km\'de bir rotasyon (ön-arka değişimi) yapın.\n3. Ani fren ve kalkışlardan kaçının.\n4. Rot ayarlarını kontrol ettirin.\n5. Mevsime uygun lastik kullanın.',
    date: '2024-02-15'
  }
];