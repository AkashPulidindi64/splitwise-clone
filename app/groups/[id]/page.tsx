"use client";

import { useEffect, useMemo, useState } from "react";
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

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
  }, [expenses]);

  const perMemberShare =
    members.length > 0
      ? totalExpense / members.length
      : 0;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-black">
            Trip To Goa
          </h1>

          <div className="flex gap-3">
            <Link
              href={`/groups/${params.id}/expense`}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Add Expense
            </Link>

            <Link
              href={`/groups/${params.id}/settle`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Record Payment
            </Link>
          </div>
        </div>

        {/* Summary */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Expenses
            </h3>

            <p className="text-3xl font-bold text-green-600">
              ₹{totalExpense}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Members
            </h3>

            <p className="text-3xl font-bold text-blue-600">
              {members.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Share Per Member
            </h3>

            <p className="text-3xl font-bold text-purple-600">
              ₹{perMemberShare.toFixed(2)}
            </p>
          </div>

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

                  <p className="text-sm text-gray-500">
                    {expense.splitType}
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
                <p className="text-black font-medium">
                  {member.user.name}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Balance Summary */}

        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-black mb-4">
            Balance Summary
          </h2>

          {members.length > 1 ? (
            members
              .filter(
                (member) =>
                  member.user.name
                    .toLowerCase()
                    .trim() !==
                  "akash pulidindi"
              )
              .map((member) => (
                <div
                  key={member.id}
                  className="border border-gray-300 rounded-lg p-3 mb-2"
                >
                  <p className="font-semibold text-black">
                    {member.user.name}
                  </p>

                  <p className="text-red-600">
                    owes Akash ₹
                    {perMemberShare.toFixed(2)}
                  </p>
                </div>
              ))
          ) : (
            <p>
              Add more members to calculate balances
            </p>
          )}
        </div>

      </div>
    </div>
  );
}