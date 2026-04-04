import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  required = false,
  focusBorderClass = "focus:border-sky-400",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = useId();
  const toggleLabel = showPassword ? "Hide password" : "Show password";

  return (
    <div className="block">
      <label htmlFor={inputId} className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type={showPassword ? "text" : "password"}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 pr-14 text-white outline-none transition ${focusBorderClass}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={toggleLabel}
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-white focus:text-white focus:outline-none"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
