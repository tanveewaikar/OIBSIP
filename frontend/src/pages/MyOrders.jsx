import { useEffect, useState } from "react"
import axios from "axios"

export default function MyOrders(){

const [orders,setOrders] = useState([])

useEffect(()=>{

const fetchOrders = async ()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/orders/my-orders",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setOrders(res.data)

}
catch(error){
console.log(error)
}

}

fetchOrders()

},[])

const handlePayment = async (orderId)=>{
    try{
        const token = localStorage.getItem("token");

        await axios.post(
            "http://localhost:5000/api/orders/verify-Payment",
            {orderId},
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )

        //Update UI after payment
        setOrders(prev=>(
            prev.map(order=>(
                order._id === orderId ?
                {...order,paymentStatus : "Paid"}
                :order
            ))
        ))
    }
    catch(error){
        console.log(error);
    }
}

return(

<div className="container mt-4">

<h2>My Orders</h2>

{orders.length === 0 ? (
<p>No orders found</p>
) : (

orders.map(order => (

<div className="card mt-3 p-3" key={order._id}>

<h5>Order ID: {order._id}</h5>

<p>
<strong>Base:</strong> {order.pizza.base.name}
</p>

<p>
<strong>Sauce:</strong> {order.pizza.sauce.name}
</p>

<p>
<strong>Cheese:</strong> {order.pizza.cheese.name}
</p>

<p>
<strong>Status:</strong> {order.orderStatus}
</p>

<p>
<strong>Payment:</strong> {order.paymentStatus}
</p>

{order.paymentStatus !=="Paid" &&(
    <button className="btn btn-primary mt-2" onClick={()=>handlePayment(order._id)}>Pay Now</button>
)}
</div>

))

)}

</div>

)

}