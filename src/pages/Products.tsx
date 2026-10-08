import { useState, useContext } from "react";
import { IoAddCircle } from "react-icons/io5";
import { FaBasketShopping } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { CartContext } from "./CartContext";

export default function Urunler() {
  const [showCart, setShowCart] = useState(false);
  const context = useContext(CartContext);
  if (!context) return null;
  const { liste, urunler, value, hata, setValue, barkodEkle, sil, satinAl } = context;

  return (
    <div className="container">
      <div className="toolbar">
        <input
          className="Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Barkod giriniz"
        />
        <IoAddCircle
          className="addicon"
          size={30}
          onClick={() => barkodEkle(value)}
        />
        <FaBasketShopping
          size={30}
          className="basket-icon"
          onClick={() => setShowCart((prev) => !prev)}
        />
      </div>

      {hata && <p className="hata-mesaji">{hata}</p>}

      {showCart && (
        <>
          {liste.map((sonuc, index) => (
            <div key={index} className="cart-item">
              <h3>Ad: {sonuc.ad}</h3>
              <h3>Fiyat: {sonuc.fiyat}</h3>
              <MdDelete className="copkutusu" onClick={() => sil(index)} />
            </div>
          ))}
          {liste.length > 0 && (
            <>  {/* KAPSAYICI FRAGMENT BURADA BAŞLIYOR */}
              <h3 style={{ color: "yellow" }}>
                Kalan stok:{" "}
                {urunler
                  .filter((u) => liste.some((l) => l.barkod === u.barkod))
                  .map((u) => `${u.ad}: ${u.stok}`)
                  .join(", ")}
                <br />
                Toplam:{" "}
                {liste
                  .reduce((toplam, urun) => toplam + urun.fiyat, 0)
                  .toFixed(2)}{" "}
                ₺
              </h3>
              <button 
                 onClick={satinAl} 
                 style={{ backgroundColor: "green", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px", width: "100%", fontSize: "16px", fontWeight: "bold" }}
              >
                Satın Al
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}



