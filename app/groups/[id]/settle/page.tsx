"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function SettlePage() {
  const params = useParams();

  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    const response = await fetch(
      "/api/payments",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          amount,
          payerId:
            "cmpzc6imw0000tv8lbqbfumg4",
          receiverId:
            "cmpyal9ps0001tvtnwdziswdw",
          groupId: params.id,
        }),
      }
    );

    await response.json();

    alert("Payment Recorded");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-3xl font-bold text-black mb-6">
          Record Payment
        </h1>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border p-3 rounded mb-4 text-black"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Save Payment
        </button>
      </div>
    </div>
  );
}