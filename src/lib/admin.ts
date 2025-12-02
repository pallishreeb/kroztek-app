// lib/admin.ts
import { SUPER_ADMIN_EMAILS } from "./firebase";

/**
 * Check if a user email is a super admin
 */
export function isSuperAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return SUPER_ADMIN_EMAILS.includes(email);
}

/**
 * Validate admin access - throws error if not admin
 */
export function requireAdmin(email: string | null | undefined): void {
  if (!isSuperAdmin(email)) {
    throw new Error("Unauthorized: Admin access required");
  }
}

