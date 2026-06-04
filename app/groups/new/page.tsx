"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewGroupPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const handleCreateGroup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/groups",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          creatorId:
            "cmpyaqdj70003tvtnnlj0g1gs",
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    if (response.ok) {
      alert("Group Created");
      router.push("/dashboard");
    } else {
      alert("Failed to create group");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-3xl font-bold mb-6">
          Create Group
        </h1>

        <form
          onSubmit={handleCreateGroup}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 border-2 border-gray-400 rounded-lg text-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}