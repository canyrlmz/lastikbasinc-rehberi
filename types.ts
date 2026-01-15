export interface TirePressure {
  front: number; // PSI
  rear: number;  // PSI
  frontBar: number;
  rearBar: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  trim?: string;
  tireSize: string;
  standardLoad: TirePressure;
  maxLoad: TirePressure;
  description?: string; // AI generated description
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl?: string;
}

export interface SchemaData {
  type: 'Product' | 'Article' | 'FAQPage' | 'WebSite';
  data: any;
}