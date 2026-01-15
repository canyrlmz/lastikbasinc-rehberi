import { GoogleGenAI } from "@google/genai";

// API Key kontrolünü fonksiyon içine alarak güvenli başlatma sağlıyoruz
const getAIClient = () => {
  // Hem process.env hem de Vite env kontrolü
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("API Key bulunamadı! AI fonksiyonları devre dışı kalabilir.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBlogContent = async (topic: string): Promise<string> => {
  try {
    const ai = getAIClient();
    if (!ai) return "API Anahtarı eksik, içerik üretilemiyor.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', 
      contents: `Otomotiv uzmanı olarak, "${topic}" hakkında SEO uyumlu, bilgilendirici ve kullanıcı dostu bir blog yazısı içeriği (HTML formatında değil, düz metin veya markdown) yaz. Türkçe olsun. Yaklaşık 200 kelime.`,
    });
    return response.text || "İçerik üretilemedi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Yapay zeka servisine şu an ulaşılamıyor.";
  }
};

export const generateVehicleDescription = async (make: string, model: string, year: number): Promise<string> => {
  try {
    const ai = getAIClient();
    if (!ai) return `${year} ${make} ${model} lastik basınç değerleri.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Bir araç veritabanı için ${year} ${make} ${model} modelinin lastik basıncı önemini vurgulayan, SEO uyumlu kısa bir meta açıklama (description) yaz. 1-2 cümle. Türkçe.`,
    });
    return response.text || `${year} ${make} ${model} lastik basınç değerleri.`;
  } catch (error) {
    // Hata durumunda varsayılan metin dön
    console.error("Gemini API Error:", error);
    return `${year} ${make} ${model} lastik basınç değerleri.`;
  }
};
