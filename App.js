import "./App.css";
import { useState, useEffect } from "react";
import bakeryData from "./assets/bakery-data.json";
import { BakeryItem } from "./components/BakeryItem.js";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);
  const items = bakeryData

  useEffect(() => {
    total();
  }, [cart])

  const total = () => {
    let totalVal = 0;
    let totalItems = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price;
      totalItems += 1;
    }
    totalVal = Math.ceil(totalVal * 100) / 100;
    setCartTotal(totalVal);
    setItemTotal(totalItems);
  }

  const addToCart = (el) => {
    setCart([...cart, el]);
  }

  const listItems = items.map((el) => (
    <div key={el.name}>
      <p>{el.name}</p>
      <img src={el.image} alt="bakery item" width = "400"/>
      <p>{el.description}</p>
      <p>${el.price}</p>
      <input type="submit" value="Add to Cart" onClick={() => addToCart(el)}/>
    </div>
  ))

  const cartItems = cart.map((el) => (
    <div key={el.id}>
      {`${el.name}: $${el.price}`}
    </div>
  ))

  return (
    <div className="App">
      <h1>Melllant Bakery</h1> 
      <div>{listItems}</div>

      <div>
        <h2>Cart</h2>
        <div>{cartItems}</div>
        <div>Total Items: {itemTotal}</div>
        <div>Total Price: ${cartTotal}</div>
      </div>
    </div>
  );
}

export default App;