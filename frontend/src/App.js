import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState([]);

  // Filtres
  const [filterType, setFilterType] = useState("all");
  const [filterSport, setFilterSport] = useState("all");
  const [filterSigned, setFilterSigned] = useState("all");

  // UI / Panier / Détails
  const [orderMessage, setOrderMessage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modal panier + formulaire commande
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Formulaire client
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerZip, setCustomerZip] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const productsRef = useRef(null);

  // Slider basket
  const sliderItems = [
    {
      id: 1,
      title: "LeBron James – Vibe NBA",
      subtitle: "Inspire-toi des plus grands pour choisir ton jersey.",
      tag: "Basket",
      image:
        "https://forbesafrique.com/wp-content/uploads/2022/06/Lebron-JAMES-%C2%A9Getty-Images.jpg",
    },
    {
      id: 2,
      title: "Stephen Curry – Game Changer",
      subtitle:
        "Pour les fans de shoots longue distance et de maillots iconiques.",
      tag: "Basket",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/stephen-curry-of-the-golden-state-warriors-poses-for-the-news-photo-1741984248.pjpeg?crop=0.930xw:0.621xh;0,0.0760xh&resize=1400:*",
    },
    {
      id: 3,
      title: "Ambiance maillot de basket",
      subtitle: "NBA, joueurs iconiques & franchises légendaires 🏀",
      tag: "Basket",
      image:
        "https://www.franceinfo.fr/pictures/Intd_8UiEXtffDF9vSpwrPiL83U/0x184:3147x1955/1024x576/filters:format(avif):quality(50)/2022/10/05/php9mIF2S.jpg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Défilement auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderItems.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Chargement des produits depuis le backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur API");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Ajouter au panier
  const addToCart = (product) => {
    const stockProduct = products.find((p) => p.id === product.id);
    if (!stockProduct || stockProduct.stock <= 0) {
      alert("Stock épuisé !");
      return;
    }

    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // décrémente le stock visible
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - 1 } : p
      )
    );
    setOrderMessage("");
  };

  // Retirer un exemplaire du panier
  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );

    // ré-augmente le stock visible
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, stock: p.stock + 1 } : p
      )
    );
  };

  const cartTotal = cart.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const openCheckout = () => {
    if (cart.length > 0) setShowCheckout(true);
  };

  const confirmOrder = (e) => {
    e.preventDefault();

    if (!customerName || !customerEmail) {
      alert("Nom et email obligatoires.");
      return;
    }

    const summary = `Commande validée !
Client : ${customerName}
Email : ${customerEmail}
Adresse : ${customerAddress}, ${customerZip} ${customerCity}
Total : ${cartTotal.toFixed(2)} €
Paiement : ${paymentMethod}`;

    setOrderMessage(summary);
    setCart([]);
    setShowCheckout(false);
  };

  // Filtrage produits
  const filteredProducts = products.filter((p) => {
    if (filterType !== "all" && p.type !== filterType) return false;
    if (filterSport !== "all" && p.sport !== filterSport) return false;
    if (filterSigned === "signed" && !p.signed) return false;
    if (filterSigned === "unsigned" && p.signed) return false;
    return true;
  });

  if (loading) return <div className="App">Chargement...</div>;
  if (error) return <div className="App">Erreur : {error}</div>;

  return (
    <div className="App">
      <div className="page-container">
        {/* HEADER avec Filtres + Panier */}
        <header className="header">
          <div className="brand">
            <div className="logo" aria-hidden="true">
              CJS
            </div>
            <div>
              <h1>Cap Jersey Store</h1>
              <p className="muted">
                Maillots & Casquettes — Football • Basketball
              </p>
            </div>
          </div>

          {/* Filtres déplacés dans le header */}
          <div className="header-filters">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Type : Tous</option>
              <option value="casquette">Casquettes</option>
              <option value="maillot">Maillots</option>
            </select>

            <select
              value={filterSport}
              onChange={(e) => setFilterSport(e.target.value)}
            >
              <option value="all">Sport : Tous</option>
              <option value="foot">Football</option>
              <option value="basket">Basket</option>
            </select>

            <select
              value={filterSigned}
              onChange={(e) => setFilterSigned(e.target.value)}
            >
              <option value="all">Signature : Tous</option>
              <option value="signed">Signés</option>
              <option value="unsigned">Non signés</option>
            </select>
          </div>

          {/* Bouton Panier unique dans le header */}
          <button
            className="btn cart-btn"
            onClick={() => {
              setShowCart(true);
              setShowCheckout(false);
            }}
          >
            🛒 Panier · {cartCount} article(s) · {cartTotal.toFixed(2)} €
          </button>
        </header>

        {/* HERO + SLIDER */}
        <section className="hero">
          <div className="hero-left">
            <span className="hero-badge">Collection 2025</span>
            <h2>Maillots. Caps. Style.</h2>
            <p>
              Sélection inspirée des plus grands joueurs, équipes et franchises
              emblématiques.
            </p>
            <button className="btn-hero" onClick={scrollToProducts}>
              Voir les articles
            </button>
          </div>

          <div className="hero-right">
            <div className="slider">
              {sliderItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`slide ${
                    index === currentSlide ? "active" : "inactive"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="slide-image"
                  />
                  <div className="slide-overlay">
                    <span className="slide-tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              ))}

              <button
                className="slider-btn prev"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === 0 ? sliderItems.length - 1 : prev - 1
                  )
                }
              >
                ‹
              </button>
              <button
                className="slider-btn next"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev === sliderItems.length - 1 ? 0 : prev + 1
                  )
                }
              >
                ›
              </button>
            </div>
          </div>
        </section>

        {/* PRODUITS */}
        <main ref={productsRef} className="products-container">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              )}

              <h2 className="product-name">{product.name}</h2>
              <p className="product-team">
                {product.team} {product.sport && `(${product.sport})`}
              </p>

              {product.signed && <p>⭐ Produit signé</p>}

              <p className="product-price">{product.price} €</p>
              <p className="product-stock">Stock : {product.stock}</p>

              <div className="product-actions">
                <button
                  className="btn-details"
                  onClick={() => setSelectedProduct(product)}
                >
                  Détails
                </button>

                <button
                  className="btn-add"
                  onClick={() => addToCart(product)}
                >
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <p>
            Maillots & Casquettes — Football • Basketball • Collections Exclusives
          </p>
        </footer>
      </div>

      {/* MODAL PANIER (détail + formulaire) */}
      {showCart && (
        <div
          className="modal-backdrop"
          onClick={() => {
            setShowCart(false);
            setShowCheckout(false);
          }}
        >
          <div
            className="modal-content cart-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Panier</h2>
            <p>
              <strong>Articles :</strong> {cartCount}
            </p>
            <p>
              <strong>Total :</strong> {cartTotal.toFixed(2)} €
            </p>

            {cart.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <>
                <ul className="cart-list">
                  {cart.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>

                {!showCheckout && (
                  <button className="btn-validate" onClick={openCheckout}>
                    Valider la commande
                  </button>
                )}
              </>
            )}

            {showCheckout && (
              <div className="checkout">
                <h3>Finaliser ma commande</h3>
                <form onSubmit={confirmOrder}>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Adresse"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Ville"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Code postal"
                    value={customerZip}
                    onChange={(e) => setCustomerZip(e.target.value)}
                  />
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="card">Carte bancaire</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Paiement à la livraison</option>
                  </select>
                  <button type="submit" className="btn-validate">
                    Confirmer ma commande
                  </button>
                </form>
              </div>
            )}

            {orderMessage && (
              <div className="order-message">
                {orderMessage.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}

            <button
              className="btn-close"
              onClick={() => {
                setShowCart(false);
                setShowCheckout(false);
              }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* MODAL DÉTAIL PRODUIT */}
      {selectedProduct && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              className="modal-image"
            />
            <h2>{selectedProduct.name}</h2>
            <p>
              {selectedProduct.team} ({selectedProduct.sport})
            </p>
            {selectedProduct.player && (
              <p>Joueur : {selectedProduct.player}</p>
            )}
            <p>Prix : {selectedProduct.price} €</p>
            <button
              className="btn-close"
              onClick={() => setSelectedProduct(null)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
