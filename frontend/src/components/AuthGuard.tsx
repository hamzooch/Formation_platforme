"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, UserRole } from "../lib/auth";

type AuthGuardProps = {
  role: UserRole;
  children: React.ReactNode;
};

export function AuthGuard({ role, children }: AuthGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace(`/login?role=${role}`);
      return;
    }
    if (session.user.role !== role) {
      router.replace(`/login?role=${role}`);
    }
  }, [role, router]);

  return <>{children}</>;
}
