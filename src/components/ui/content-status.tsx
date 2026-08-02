import { FileWarning } from "lucide-react";

export function ContentStatus() {
  return <aside className="content-status"><FileWarning aria-hidden="true" /><div><strong>Contenuto in revisione</strong><p>Testo informativo predisposto per la revisione medica prima della pubblicazione.</p></div></aside>;
}
