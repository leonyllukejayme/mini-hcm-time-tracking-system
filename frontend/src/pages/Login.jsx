import { useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);


  // Handles input changes for email, password, and remember fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  // Update form state based on input type (checkbox vs text)
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const userDoc = await getDoc(doc(db, "users", credential.user.uid));

      if (userDoc.exists() && userDoc.data().role === "admin") {
        navigate("/dashboard/admin");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-110 bg-white dark:bg-slate-900 shadow-xl rounded-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 text-primary mb-6">
              <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="size-6 text-primary"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    clipRule="evenodd"
                    d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                Mini HCM
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 text-center">
              Welcome
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 text-center">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                value={form.email}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {/* <button
                  type="button"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </button> */}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            {/* <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label className="text-sm text-slate-600 dark:text-slate-400 select-none">
                Remember this device
              </label>
            </div> */}

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 mt-2"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">
                Trusted Access Only
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?
            <span className="text-primary font-semibold ml-1">
              Contact HR Dept
            </span>
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="flex size-2 rounded-full bg-green-500"></span>
            System Operational
          </div>
          <p className="text-xs text-slate-400">
            © 2024 Mini HCM. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
