"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ConfirmPasswordInput = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mb-2">
      <Input
        id="confirmPassword"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
        className="pr-10"
      />

      <Button
        type="button"
        onClick={() => setShowPassword((p) => !p)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        tabIndex={-1}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
};

export default ConfirmPasswordInput;
