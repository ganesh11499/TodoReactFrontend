import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Register to get started
          </p>
        </div>

        <form className="space-y-5">

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter phone number"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          Already have an account?
          <Link
            to="/"
            className="text-indigo-600 font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}