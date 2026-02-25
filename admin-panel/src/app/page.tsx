import { redirect } from "next/navigation";

import { requireAuth } from "@/lib/auth";
import DashboardApp from "@/components/DashboardApp";

export default async function Home() {
  const session = await requireAuth();
  if (!session) {
    redirect("/login");
  }

  return <DashboardApp />;
}
