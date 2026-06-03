"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-6">
          Dashboard
        </h1>

        <Link
          href="/groups/new"
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Create Group
        </Link>

        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            My Groups
          </h2>

          {groups.length === 0 ? (
            <p>No Groups Found</p>
          ) : (
           groups.map((group) => (
  <Link
    key={group.id}
    href={`/groups/${group.id}`}
    className="block border p-3 rounded mb-3 hover:bg-gray-100"
  >
    {group.name}
  </Link>
))
          )}
        </div>
      </div>
    </div>
  );
}