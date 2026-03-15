import { useEffect, useState } from "react";
import axios from "axios";

export default function PizzaBuilder() {
  const [ingredients, setIngredients] = useState([]);

  const [selectedBase, setSelectedBase] = useState(null);
  const [selectedSauce, setSelectedSauce] = useState(null);
  const [selectedCheese, setSelectedCheese] = useState(null);
  const [selectedVeggies, setSelectedVeggies] = useState([]);
  const [selectedMeat, setSelectedMeat] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch ingredients from backend
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/ingredients");
        setIngredients(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIngredients();
  }, []);

  // Calculate total price dynamically
  useEffect(() => {
    let price = 0;

    const allIngredients = [
      ...(ingredients.bases || []),
      ...(ingredients.sauces || []),
      ...(ingredients.cheese || []),
      ...(ingredients.veggies || []),
      ...(ingredients.meat || []),
    ];

    const selected = [
      selectedBase,
      selectedSauce,
      selectedCheese,
      ...selectedVeggies,
      ...selectedMeat,
    ];

    selected.forEach((id) => {
      const item = allIngredients.find((i) => i._id === id);

      if (item) {
        price += item.price;
      }
    });

    setTotalPrice(price);
  }, [
    selectedBase,
    selectedSauce,
    selectedCheese,
    selectedVeggies,
    selectedMeat,
    ingredients,
  ]);

  // Filter ingredients by type
  const bases = ingredients.bases || [];
  const sauces = ingredients.sauces || [];
  const cheese = ingredients.cheese || [];
  const veggies = ingredients.veggies || [];
  const meat = ingredients.meat || [];

  // Handle veggie selection
  const handleVeggies = (id) => {
    if (selectedVeggies.includes(id)) {
      setSelectedVeggies(selectedVeggies.filter((v) => v !== id));
    } else {
      setSelectedVeggies([...selectedVeggies, id]);
    }
  };

  // Handle meat selection
  const handleMeat = (id) => {
    if (selectedMeat.includes(id)) {
      setSelectedMeat(selectedMeat.filter((m) => m !== id));
    } else {
      setSelectedMeat([...selectedMeat, id]);
    }
  };

  const placeOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // STEP 1: Create pizza
      const pizzaRes = await axios.post(
        "http://localhost:5000/api/pizza/create",
        {
          base: selectedBase,
          sauce: selectedSauce,
          cheese: selectedCheese,
          veggies: selectedVeggies,
          meat: selectedMeat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const pizzaId = pizzaRes.data._id;

      // STEP 2: Place order
      const orderRes = await axios.post(
        "http://localhost:5000/api/orders/place-order",
        {
          pizzaId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSuccess(true);

      // Reset pizza builder
      setSelectedBase(null);
      setSelectedSauce(null);
      setSelectedCheese(null);
      setSelectedVeggies([]);
      setSelectedMeat([]);
      setTotalPrice(0);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // VALIDATION
  const isOrderValid = selectedBase && selectedSauce && selectedCheese;

  const getIngredientName = (id) => {
    const allIngredients = [
      ...(ingredients.bases || []),
      ...(ingredients.sauces || []),
      ...(ingredients.cheese || []),
      ...(ingredients.veggies || []),
      ...(ingredients.meat || []),
    ];

    const item = allIngredients.find((i) => i._id === id);

    return item ? item.name : "";
  };

  return (
    <div className="container page-container mt-4">
      <h2 className="title">Customize Your Pizza 🍕</h2>
      {/* success message */}
      {success && (
        <div className="alert alert-success mt-3">
          Order placed successfully
        </div>
      )}

      {/* Base */}
      <h4 className="mt-4 section-title">🍞 Choose Base</h4>

      <div className="row">
        {bases.map((item) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 pizza-card-col mb-3"
            key={item._id}>
            <div
              className={`card ingredients-card mt-4 p-4 shadow-sm ${selectedBase === item._id ? "border border-success" : ""}`}>
              <input
                type="radio"
                name="base"
                checked={selectedBase === item._id}
                onChange={() => setSelectedBase(item._id)}/>

              <img
                src={`/images/${item.name.toLowerCase().replace(/\s/g, "-")}.png`}
                alt={item.name}
                className="ingredient-img"/>

              <h6 className="mt-2">{item.name}</h6>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sauce */}

      <h4 className="mt-4 section-title">🍅 Choose Sauce</h4>

      <div className="row">
        {sauces.map((item) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
            key={item._id}>
            <div
              className={`card ingredients-card mt-4 p-3 shadow-sm ${selectedSauce === item.id ? "border border-success" : ""}`}>
              <input
                type="radio"
                name="sauce"
                checked={selectedSauce === item._id}
                onChange={() => setSelectedSauce(item._id)}/>

              <img
                src={`/images/${item.name.toLowerCase().replace(/\s/g, "-")}.png`}
                alt={item.name}
                className="ingredient-img"/>
              <h6 className="mt-2">{item.name}</h6>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* cheese */}
      <h4 className="mt-4 section-title">🧀 Choose Cheese</h4>

      <div className="row">
        {cheese.map((item) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
            key={item._id} >
            <div
              className={`card ingredients-card mt-4 p-3 shadow-sm ${selectedCheese === item.id ? "border border-success" : ""}`}>
              <input
                type="radio"
                name="cheese"
                checked={selectedCheese === item._id}
                onChange={() => setSelectedCheese(item._id)} />

              <img
                src={`/images/${item.name.toLowerCase().replace(/\s/g, "-")}.png`}
                alt={item.name}
                className="ingredient-img" />

              <h6 className="mt-2">{item.name}</h6>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Veggies */}
      <h4 className="mt-4 section-title">🥦 Choose Veggies</h4>

      <div className="row">
        {veggies.map((item) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
            key={item._id} >
            <div
              className={`card ingredients-card mt-4 p-3 shadow-sm ${selectedVeggies === item.id ? "border border-success" : ""}`} >
              <input
                type="checkbox"
                checked={selectedVeggies.includes(item._id)}
                onChange={() => handleVeggies(item._id)}/>

              <img
                src={`/images/${item.name.toLowerCase().replace(/\s/g, "-")}.png`}
                alt={item.name}
                className="ingredient-img"/>

              <h6 className="mt-2">{item.name}</h6>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Meat */}
      <h4 className="mt-4 section-title">🥩 Choose Meat</h4>

      <div className="row">
        {meat.map((item) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
            key={item._id} >
            <div
              className={`card ingredients-card mt-4 p-3 shadow-sm ${selectedMeat === item.id ? "border border-success" : ""}`} >
              <input
                type="checkbox"
                checked={selectedMeat.includes(item._id)}
                onChange={() => handleMeat(item._id)}/>

              <img
                src={`/images/${item.name.toLowerCase().replace(/\s/g, "-")}.png`}
                alt={item.name}
                className="ingredient-img"/>

              <h6 className="mt-2">{item.name}</h6>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4 p-3 mb-2 bg-light">
        <h4>Your Pizza 🍕</h4>

        <p>
          <strong>Base: </strong> {getIngredientName(selectedBase)}
        </p>

        <p>
          <strong>Sauce: </strong> {getIngredientName(selectedSauce)}
        </p>

        <p>
          <strong>Cheese: </strong> {getIngredientName(selectedCheese)}
        </p>

        <p>
          <strong>Veggies: </strong>
          {selectedVeggies.map((id) => getIngredientName(id)).join(", ")}
        </p>

        <p>
          <strong>Meat: </strong>
          {selectedMeat.map((id) => getIngredientName(id)).join(", ")}
        </p>
      </div>

      <div className="mt-4 p-3 bg-light rounded">
        <h4>Total Price: ₹{totalPrice}</h4>

        <button
          className="btn btn-success mt-2"
          onClick={placeOrder}
          disabled={!isOrderValid || loading} >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
