"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Check, KeyRound, ShieldCheck, X } from "lucide-react";
import { ApiError, apiRequest } from "@/lib/admin-api";
import { useAdmin } from "@/components/admin/AdminShell";
import type { FieldErrors } from "@/components/admin/format";
import { Badge, Button, Card, Field, Input, PageHeader } from "@/components/admin/ui";

const RULES = [
  { label: "At least 10 characters", test: (p: string) => p.length >= 10 },
  { label: "An uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "A lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "A number", test: (p: string) => /\d/.test(p) },
];

export default function SettingsPage() {
  const { user } = useAdmin();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  const valid = RULES.every((r) => r.test(form.newPassword)) && form.newPassword === form.confirm && form.currentPassword.length > 0;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirm) {
      setErrors({ confirm: "The passwords don't match" });
      return;
    }
    setSaving(true);
    setErrors({});
    try {
      await apiRequest("/auth/change-password", { method: "POST", body: { currentPassword: form.currentPassword, newPassword: form.newPassword } });
      toast.success("Password updated. Other devices have been signed out.");
      setForm({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      const apiErr = err as ApiError;
      setErrors(apiErr.status === 401 ? { currentPassword: apiErr.message } : apiErr.fieldErrors);
      toast.error(apiErr.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader title="Settings" description="Your admin account." />

      <Card className="p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xl font-bold flex items-center justify-center">
            {user.fullName.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="font-semibold text-slate-900 truncate">{user.fullName}</p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
          </div>
          <Badge tone="orange" className="ml-auto">
            <ShieldCheck className="w-3.5 h-3.5" /> {user.role.replace("_", " ").toLowerCase()}
          </Badge>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-orange-500" /> Change password
        </h2>
        <p className="text-sm text-slate-500 mt-1 mb-5">You stay signed in here; every other device is signed out.</p>
        <form onSubmit={submit} className="space-y-4 max-w-md">
          <Field label="Current password" htmlFor="pw-current" error={errors.currentPassword}>
            <Input id="pw-current" type="password" autoComplete="current-password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} invalid={!!errors.currentPassword} />
          </Field>
          <Field label="New password" htmlFor="pw-new" error={errors.newPassword}>
            <Input id="pw-new" type="password" autoComplete="new-password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} invalid={!!errors.newPassword} />
          </Field>
          <ul className="grid grid-cols-2 gap-1.5 text-xs">
            {RULES.map((rule) => {
              const ok = rule.test(form.newPassword);
              return (
                <li key={rule.label} className={ok ? "text-emerald-600 flex items-center gap-1" : "text-slate-400 flex items-center gap-1"}>
                  {ok ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />} {rule.label}
                </li>
              );
            })}
          </ul>
          <Field label="Confirm new password" htmlFor="pw-confirm" error={errors.confirm}>
            <Input id="pw-confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} invalid={!!errors.confirm} />
          </Field>
          <Button type="submit" loading={saving} disabled={!valid}>
            Update password
          </Button>
        </form>
      </Card>
    </div>
  );
}
