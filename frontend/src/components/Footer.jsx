import React from "react"

function Footer() {

return (

<footer className="bg-dark text-light text-center py-2 ">

<div className="container">

<p className="mb-1">
🍕 PizzaCraft — Build Your Perfect Pizza
</p>

<p className="mb-0">
© {new Date().getFullYear()} PizzaCraft | MERN Stack Project
</p>

</div>

</footer>

)

}

export default Footer