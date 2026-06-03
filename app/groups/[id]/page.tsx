"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function GroupPage() {
  const params = useParams();

  const [expenses, setExpenses] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/expenses?groupId=${params.id}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data));

    fetch(`/api/group-members?groupId=${params.id}`)
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, [params.id]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-black">
            Group Details
          </h1>

          <Link
            href={`/groups/${params.id}/expense`}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Add Expense
          </Link>
        </div>

        {/* Expenses */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-black mb-4">
            Expenses
          </h2>

          {expenses.length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="border border-gray-300 rounded-lg p-4 mb-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-black">
                    {expense.description}
                  </p>
                </div>

                <div className="text-xl font-bold text-green-600">
                  ₹{expense.amount}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Members */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-black mb-4">
            Members
          </h2>

          {members.length === 0 ? (
            <p>No members found</p>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="border border-gray-300 rounded-lg p-3 mb-2"
              >
                {member.user.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}