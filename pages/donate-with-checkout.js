import React from 'react'
import CheckoutForm from '../components/Checkout/CheckoutForm'
import Layout from '../components/Layout/Layout'

export default function donatewithcheckout() {
  return (
    <Layout title="Donate with Checkout | Next.js + JavaScript">
        <div className="page-container">
            <h1>Donate with Checkout</h1>    
            <p>Donate to our Project ❤</p>
            <CheckoutForm />
        </div>
    </Layout>
  )
}

