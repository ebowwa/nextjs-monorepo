// src/components/ui/ButtonNextLink.tsx

import { Button } from "@/components/ui/common/button";
import Link from "next/link";

export function ButtonNextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} passHref>
      <Button>{children}</Button>
    </Link>
  );
}
