import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { auth, db } from '../firebase';
import toast from 'react-hot-toast';

const Register = () => {
const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
	shiftStart: "09:00",
	shiftEnd: "18:00",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
	  setForm({ ...form, [e.target.name]: e.target.value });
	};
	
	const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        role: "employee",
        timezone: "Asia/Manila",
        schedule: {
          start: form.shiftStart,
          end: form.shiftEnd,
        },
        createdAt: new Date(),
      });

      toast.success("Registration successful!",{position: "top-right"});
      setForm({ name: "", email: "", password: "", shiftStart: "09:00", shiftEnd: "18:00"});
	  navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  };

	return (
		<main className="flex-1 flex items-center justify-center p-6 sm:p-12">
			<div className="w-full max-w-130 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
				<div className="p-8">
					<div className="flex items-center gap-3 text-primary mb-6">
						<div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
							<svg
								className="size-6 text-primary"
								fill="none"
								viewBox="0 0 48 48">
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
					{/* Header */}
					<div className="mb-8">
						<h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
							Create your account
						</h1>
						<p className="text-slate-500 dark:text-slate-400 mt-2">
							Enter your details to set up your professional time tracking
							profile.
						</p>
					</div>

					<form onSubmit={handleRegister} className="space-y-5">
						{/* Full Name */}
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
								Full Name
							</label>
							<input
								type="text"
								name="name"
								value={form.name}
								onChange={handleChange}
								placeholder="e.g. John Doe"
								required
								className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
							/>
						</div>

						{/* Email */}
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
								Email Address
							</label>
							<input
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								placeholder="name@company.com"
								required
								className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
							/>
						</div>

						{/* Password */}
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
								Password
							</label>

							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									name="password"
									value={form.password}
									onChange={handleChange}
									placeholder="••••••••"
									required
									className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
									{showPassword ? '🙈' : '👁'}
								</button>
							</div>
						</div>

						{/* Role & Timezone */}
						<div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
							<div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
									Role
								</label>
								<select
									name="role"
									value={form.role}
									onChange={handleChange}
									className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
									<option value="employee">Employee</option>
									<option value="admin">Admin</option>
								</select>
							</div>

							{/* <div className="space-y-1.5">
								<label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
									Timezone
								</label>
								<select
									name="timezone"
									value={form.timezone}
									onChange={handleChange}
									className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800">
									<option value="UTC-8">(UTC-08:00) Pacific Time</option>
									<option value="UTC-5">(UTC-05:00) Eastern Time</option>
									<option value="UTC+0">(UTC+00:00) London</option>
									<option value="UTC+1">(UTC+01:00) Paris</option>
								</select>
							</div> */}
						</div>

						{/* Shift Schedule */}
						<div className="space-y-1.5">
							<label className="text-sm font-semibold text-slate-900 dark:text-slate-100">
								Shift Schedule
							</label>

							<div className="grid grid-cols-2 gap-4">
								<input
									type="time"
									name="shiftStart"
									value={form.shiftStart}
									onChange={handleChange}
									className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
								/>
								<input
									type="time"
									name="shiftEnd"
									value={form.shiftEnd}
									onChange={handleChange}
									className="w-full h-12 px-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
								/>
							</div>
						</div>

						{/* Submit */}
						<div className="pt-4">
							<button
								type="submit"
								className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md transition-all">
								Create My Account
							</button>
						</div>
					</form>
					<p className="text-center text-[13px] text-slate-400 dark:text-slate-500 mt-6 px-4">
						Already have an account?{' '}
						<NavLink className="text-primary hover:underline" to="/">
							Sign In
						</NavLink>
						.
					</p>
				</div>
				<div className="h-1.5 w-full bg-linear-to-r from-primary/40 via-primary to-primary/40"></div>
			</div>
		</main>
	);
};

export default Register;
