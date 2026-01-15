import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBlogContent = async (topic: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bir araç veritabanı için ${year} ${make} ${model} modelinin lastik basıncı önemini vurgulayan, SEO uyumlu kısa bir meta açıklama (description) yaz. 1-2 cümle. Türkçe.`,
    });
    return response.text || `${year} ${make} ${model} lastik basınç değerleri.`;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `${year} ${make} ${model} lastik basınç değerleri.`;
  }
};