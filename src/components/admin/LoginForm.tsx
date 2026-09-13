"use client";

import { useState } from "react";
import { LockKeyhole } from "lucide-react";

interface Props {
  configured: boolean;
  onSuccess: () => void;
}

export const LoginForm = ({ configured, onSuccess }: Props) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Не удалось войти");
        return;
      }
      onSuccess();
    } catch {
      setError("Нет связи с сервером");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-marble flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brandRed/10 text-brandRed flex items-center justify-center">
            <LockKeyhole size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-dark leading-tight">Админка Mr. Gyros</h1>
            <p className="text-xs text-gray-500">Цены, стоп-лист, фото и составы</p>
          </div>
        </div>

        {!configured && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            Пароль ещё не задан. Добавьте переменную окружения <code>ADMIN_PASSWORD</code> (минимум 6 символов)
            и перезапустите приложение.
          </p>
        )}

        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-600">Пароль</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className="h-11 rounded-lg border border-gray-300 px-3 text-base focus:outline-none focus:border-brandRed"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={busy || !password || !configured}
          className="h-11 rounded-lg bg-brandRed text-white font-semibold active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {busy ? "Проверяем…" : "Войти"}
        </button>
      </form>
    </main>
  );
};
