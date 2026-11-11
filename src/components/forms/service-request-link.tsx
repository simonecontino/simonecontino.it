"use client";

export const SELECT_SERVICE_EVENT = "appointment:select-service";

export function ServiceRequestLink({ serviceId }: { serviceId: string }) {
  return <a className="button button--primary" href="#richiedi-appuntamento" onClick={() => {
    window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }));
  }}>Prenota</a>;
}
