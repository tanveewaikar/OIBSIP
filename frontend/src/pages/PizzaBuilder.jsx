import { useState } from "react"
export default function PizzaBuilder() {
    const[price,setPrice]= useState(200)
  return (
    <div>
      <h1>Customize your pizza</h1>
      {/* Base of pizza */}
      <div>
        <h3>Base</h3>
        <div>
        <input type="radio" className="btn-check" name="base" id="base1" onChange={()=> setPrice(200)} /> 
        <label className="btn btn-outline-primary me-2" htmlFor="base1">Regular</label>
        </div>
        <div>
        <input type="radio" className="btn-check" name="base" id="base2" onChange={()=> setPrice(250)} />
        <label className="btn btn-outline-primary me-2" htmlFor="base2">Cheese Burst</label>
        </div>
      </div>

      {/* Sauce */}
      <div>
        <h3>Sauce</h3>
        <div>
            <input type="radio" className="btn-check" name="sauce" id="sauce1"/>
            <label className="btn btn-outline-success me-2" htmlFor="sauce1">Tomato</label>
        </div>
        <div>
            <input type="radio" className="btn-check" name="sauce" id="sauce2"/>
            <label className="btn btn-outline-success me-2" htmlFor="sauce2">BBQ</label>
        </div>
      </div>

      {/* Toppings */}
      <div>
        <h3>Toppings</h3>
        <div>
            <input type="checkbox" className="btn-check" name="toppings" id="topping1" onChange={(e)=>setPrice(p=>(e.target.checked ? p+30 : p-30))} />
            <label className="btn btn-outline-warning me-2" htmlFor="topping1">Onion</label>
        </div>
        <div>
            <input type="checkbox" className="btn-check" name="toppings" id="topping2" onChange={(e)=>setPrice(p=>(e.target.checked?p+40 : p-40))} />
            <label className="btn btn-outline-warning me-2" htmlFor="topping2">Paneer</label>
        </div>
      </div>
      <h4>Total Amount : {price}</h4>
      <button className="btn btn-success mt-3">Place Order</button>
    </div>
  )
}

