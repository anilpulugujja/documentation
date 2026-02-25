import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await requireAuth();
  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
