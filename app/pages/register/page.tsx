"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Register} from "@/component/signUp"

interface formData{
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}

interface registerResponse{
  message: string,
  status: number
}

 const RegistationForm = () => {
  const [formData, setformData]= useState<formData>({} as formData)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
        setformData({name, email, password, confirmPassword})
        console.log(formData)
        const data = {name, email, password, confirmPassword}
        await Register(data.name, data.email, data.password).then((response : registerResponse)=>{
          console.log(response)
          if (response.status === 200){
            console.log("success")
            setSuccess(true);
            setError(null);
            setLoading(false);
            const Interval = setInterval(() => {
              setSuccess(false);
              setError(null);
              clearInterval(Interval);
              router.push("/pages/login");
        },5000)
    }
    else{
      console.log("error")
      setError(response.message);
      setLoading(false);
      const Interval = setInterval(() => {
        setError(null);
        clearInterval(Interval);
        }, 3000);

    }
    
  });
}
catch (error) { 
  console.log(error)
  setError("Failed to Register, please try again")
}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white text-black">
        <h1 className="text-3xl font-semibold flex items-center justify-center mb-6">
          <FaUserPlus className="mr-2" />
          Register
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 border border-red-400 rounded-md p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              required
              onChange={(e) => {setConfirmPassword('')
                            setPassword(e.target.value)}}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="confirmpassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmpassword"
              type="password"
              placeholder="Enter your password"
              value={confirmPassword}
              required
              onChange={(e) => {setConfirmPassword(e.target.value)
                                setConfirmPasswordError(e.target.value === password)
              }}
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!confirmPasswordError && <p className="text-red-500">Passwords do not match</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() => signIn("github")}
            className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition"
          >
            <FaGithub />
            <span>Sign up with GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-800 transition"
          >
            <FaGoogle />
            <span>Sign up with Google</span>
          </button>
        </form>

        {success && (
          <p className="text-green-600 text-center mt-4 text-sm">
            Account created successfully! Redirecting to login page...
          </p>
        )}

        <div className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/pages/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistationForm;
