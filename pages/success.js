import React, { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import SuccessCheck from "../components/SuccessCheck";
import Link from 'next/link'

export default function Success() {
  const router = useRouter();
  const [payment, setPaymentIntent] = useState(null);
  const { payment_intent } = router.query;
  const { session_id } = router.query;
  const { data, error } = useSWR(
    router.query.payment_intent
      ? `/api/success_confirmation/${router.query.payment_intent}`
      : `/api/success_confirmation/${router.query.session_id}`,
    (url) => fetch(url).then((res) => res.json())
  );
  return (
    <div className="main-div">
      <div className="success-card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <SuccessCheck />
        </div>
        <h1 className="success-h1">Success</h1>
        <p className="success-p">
          We received your purchase request;
          <br /> we`&apos;`ll be in touch shortly!
        </p>
        <br />
        <br />
        <Link href="/" >
          <button className="contBtn">Back to Index</button>
          
        </Link>
      </div>
      <div>
        <h2>Object retrieved from Stripe</h2>
        <pre
          className="success-scroll"
          style={{
            borderRadius: "20px",
            padding: "10px",
            backgroundColor: "#F8FAF5",
            maxWidth: "100%",
            overflow: "scroll",
          }}
        >
          {data ? JSON.stringify(data, null, 2) : "Loading Data..."}
        </pre>
      </div>
    </div>
  );
}
