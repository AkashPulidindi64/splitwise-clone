"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function AddExpensePage() {
  const params = useParams();

  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/expenses",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          description,
          amount,
          groupId: params.id,
          payerId:
            "cmpyaqdj70003tvtnnlj0g1gs",
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    alert("Expense Added");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-3xl font-bold text-black mb-6">
          Add Expense
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="w-full p-3 border-2 border-gray-400 rounded-lg text-black"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full p-3 border-2 border-gray-400 rounded-lg text-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}