import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { variant?: "primary" | "secondary" | "text" };

export function ButtonLink({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`button button--${variant} ${className}`} {...props} />;
}
