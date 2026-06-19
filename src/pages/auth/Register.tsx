import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../service/authService";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName : "",
    email : "",
    password : "",
    confirmPassword : "",
    mobileNumber :  ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })

    console.log(formData, "registerPageData");

  };

  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();

    try {
      if(formData.password == formData.confirmPassword){
        setLoading(true);
        const response = await registerUser(formData)
        console.log(response, "response");
        navigate("/");
      }else {
        alert(
          "Password and ConfirmPassword not matched"
        )
      }
      
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

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
          disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
           {loading ? "Loading..." : "Register"}
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