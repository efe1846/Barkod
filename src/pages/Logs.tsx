import { useContext } from "react";
import { CartContext } from "./CartContext";
import { MdDelete } from "react-icons/md";

export default function Raporlar() {
  const context = useContext(CartContext);
  if (!context) return null;

  const { loglar, logSil } = context;

  return (
    <div className="logs-container">
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Satın Alma Logları / Raporlar
      </h2>

     
        <div className="log-list">
          {loglar.map((log, index) => (
            <div key={index} className="log-card">
              <div className="log-header">
                <span className="log-tarih">📅 {log.tarih}</span>
                <span className="log-ip">🌐 IP: {log.ip}</span>
                <MdDelete
                  className="copkutusu"
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => logSil(index)}
                  title="Logu Sil"
                />
              </div>

              <div className="log-details">
                <p>
                  <strong>Cihaz:</strong> {log.agent}
                </p>
                <p>
                  <strong>Satın Alınan Ürünler:</strong>
                </p>
                <ul>
                  {log.satinAlinanUrunler.map((urun, uIndex) => (
                    <li key={uIndex}>
                      {urun.ad} - {urun.fiyat} ₺ (Barkod: {urun.barkod})
                    </li>
                  ))}
                </ul>
                <h4 style={{ color: "yellow", marginTop: "10px" }}>
                  Toplam Tutar: {log.toplamFiyat.toFixed(2)} ₺
                </h4>
              </div>
            </div>
          ))}
        </div>
      
    </div>
  );
}
