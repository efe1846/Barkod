import { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface Urun {
  barkod: string;
  ad: string;
  fiyat: number;
  stok: number;
}

export interface SonucModel {
  ad: string;
  fiyat: number;
  stok: number;
  barkod: string;
}

export interface LogModel {
  tarih: string;
  ip: string;
  agent: string;
  satinAlinanUrunler: SonucModel[];
  toplamFiyat: number;
}

export interface CartContextType {
  liste: SonucModel[];
  urunler: Urun[];
  loglar: LogModel[];
  value: string;
  hata: string;
  satinAl: () => void;
  setValue: (val: string) => void;
  barkodEkle: (value: string) => void;
  sil: (index: number) => void;
  logSil: (index: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);


export default function CartProvider({ children }: { children: ReactNode }) {
  const [urunler, setUrunler] = useState<Urun[]>([
    { barkod: "8690504123456", ad: "Permatik banyo", fiyat: 35.5, stok: 40 },
    { barkod: "8690123456789", ad: "Kaşar 500g", fiyat: 120.0, stok: 15 },
    { barkod: "8699999999999", ad: "Beypazarı Maden Suyu 200ml", fiyat: 8.0, stok: 100 },
    { barkod: "8690504012347", ad: "Ülker Çikolatalı Gofret", fiyat: 6.5, stok: 150 },
    { barkod: "8690606060606", ad: "Eti Burçak Bisküvi", fiyat: 15.0, stok: 80 },
    { barkod: "8690707070707", ad: "Sütaş Ayran 1L", fiyat: 32.5, stok: 45 },
    { barkod: "8690808080808", ad: "Lipton Doğu Karadeniz 500g", fiyat: 95.0, stok: 25 },
    { barkod: "8690909090909", ad: "Fairy Bulaşık Deterjanı 1L", fiyat: 85.0, stok: 60 },
    { barkod: "8691111111111", ad: "Selpak Kağıt Havlu 6'lı", fiyat: 110.0, stok: 30 },
    { barkod: "8692222222222", ad: "Pınar Tam Yağlı Süt 1L", fiyat: 34.0, stok: 50 },
    { barkod: "8693333333333", ad: "Coca Cola 2.5L", fiyat: 45.0, stok: 120 },
    { barkod: "8694444444444", ad: "Torku Toz Şeker 1Kg", fiyat: 38.0, stok: 200 },
    { barkod: "8695555555555", ad: "Nuh'un Ankara Burgu Makarna", fiyat: 18.5, stok: 90 },
    { barkod: "8696666666666", ad: "Dardanel Ton Balığı 3x75g", fiyat: 145.0, stok: 20 },
    { barkod: "8697777777777", ad: "Kızılay Mandalinalı 6'lı", fiyat: 48.0, stok: 65 }
  ]);
  
  const [liste, setListe] = useState<SonucModel[]>([]);
  const [loglar, setLoglar] = useState<LogModel[]>([]);
  const [value, setValue] = useState("");
  const [hata, sethata] = useState("");

  function sil(index: number) {
    setListe((prev) => prev.filter((_, i) => i !== index));
  }

  function logSil(index: number) {
    setLoglar((prev) => prev.filter((_, i) => i !== index));
  }

  function barkodEkle(value: string) {
    const bulunan = urunler.find((u) => u.barkod === value.trim());
    if (bulunan && bulunan.stok > 0) {
      setListe((prev) => [
        ...prev,
        {
          ad: bulunan.ad,
          fiyat: bulunan.fiyat,
          stok: bulunan.stok - 1,
          barkod: bulunan.barkod,
        },
      ]);
      setUrunler((prev) =>
        prev.map((u) =>
          u.barkod === bulunan.barkod ? { ...u, stok: u.stok - 1 } : u,
        ),
      );
      setValue("");
    } else {
      sethata("Ürün Bulunamadı! Barkod Yanlış!");
      setTimeout(() => {
        sethata("");
      }, 5000);
    }
  }

  async function satinAl() {
    if (liste.length === 0) return; 

    let ipAdresi = "Bilinmiyor";
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      ipAdresi = data.ip;
    } catch (error) {
      console.log("IP adresi alınamadı.");
    }

    const yeniLog: LogModel = {
      tarih: new Date().toLocaleString("tr-TR"),
      ip: ipAdresi,
      agent: navigator.userAgent,
      satinAlinanUrunler: [...liste],
      toplamFiyat: liste.reduce((toplam, urun) => toplam + urun.fiyat, 0)
    };

    setLoglar((prev) => [yeniLog, ...prev]);
    setListe([]);
    
    alert("Satın alma işlemi başarıyla tamamlandı!");
  }


  return (
    <CartContext.Provider value={{ liste, urunler, loglar, value, hata, setValue, barkodEkle, sil, satinAl, logSil }}>
      {children}
    </CartContext.Provider>
  );
}