"use client";

import { useId, useState, type ReactNode } from "react";
import { Info } from "lucide-react";

export function ServiceInformation({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return <>
    <button type="button" className="booking-information-toggle" aria-label={`Informazioni: ${title}`} aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(value => !value)}>
      <Info size={18} aria-hidden="true" />
    </button>
    <div id={panelId} className="booking-information-panel" hidden={!open}>{children}</div>
  </>;
}
