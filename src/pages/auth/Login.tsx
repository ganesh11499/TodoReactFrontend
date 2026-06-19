import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../service/authService";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email : "",
    password : ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    });

    console.log(formData, "formData");

  };

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginUser(formData);

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response)
      );

      navigate("/dashboard");
      
    } catch (error : any) {
      alert(
         error?.response?.data?.message ||
          "Login Failed"
      )
    }finally{
      setLoading(false);
    }
  }





  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-slate-500 mt-2">
            Sign in to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name = "email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
           {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-indigo-600 font-semibold ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}