export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Login
        </h1>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border-2 border-gray-400 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black"
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border-2 border-gray-400 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}