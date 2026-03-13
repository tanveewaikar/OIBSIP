import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function AdminDashboard(){

const navigate = useNavigate()

const [orders,setOrders] = useState([])

const handleLogout = ()=>{
localStorage.removeItem("token")
navigate("/login")
}

// FETCH ORDERS
const fetchOrders = async ()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
"http://localhost:5000/api/orders/admin-orders",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setOrders(res.data)

}catch(error){
console.log(error)
}

}

useEffect(()=>{
fetchOrders()
},[])

const updateStatus = async(orderId,newStatus)=>{
  try{
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:5000/api/orders/update-status/${orderId}`,
      {orderStatus:newStatus},
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    )

    //update UI
    setOrders(prev=>
      prev.map(order=>(
        order._id === orderId
        ? {...order,orderStatus:newStatus}
        : order
      ))
    )
  }catch(error){
    console.log(error)
  }
}

const getPaymentColor = (paymentStatus) => {
    if (paymentStatus === "Paid") return "success";
    if (paymentStatus === "Pending") return "danger";
    return "secondary";
  };

return (

<div className="container mt-5">

<h2 className="mb-4">Admin Dashboard</h2>

<table className="table table-bordered">

<thead>

<tr>
<th>Order ID</th>
<th>User</th>
<th>Price</th>
<th>Payment</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{orders.map(order=>(
<tr key={order._id}>

<td>{order._id}</td>

<td>
{order.user?.name}
<br/>
<small>{order.user?.email}</small>
</td>

<td>₹{order.totalPrice}</td>

<td><span className={`badge bg-${getPaymentColor(order.paymentStatus)}`}>{order.paymentStatus}</span></td>

<td>

<select value={order.orderStatus} onChange={(e) => updateStatus(order._id, e.target.value)} className="form-select">
<option value="Order Received">Order Received</option>
<option value="In Kitchen">In Kitchen</option>
<option value="Sent to Delivery">Sent to Delivery</option>
<option value="Delivered">Delivered</option>
</select>
</td>

</tr>
))}

</tbody>

</table>

<button className="btn btn-danger mb-4" onClick={handleLogout}>
Logout
</button>

</div>

)

}