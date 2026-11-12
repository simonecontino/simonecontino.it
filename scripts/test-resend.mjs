// Manual delivery probe, never imported by the app. No patient data or secrets in output.
if (process.argv.includes("--env-local")) process.loadEnvFile(".env.local");
const required = ["RESEND_API_KEY", "APPOINTMENT_FROM_EMAIL", "APPOINTMENT_TO_EMAIL"];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error(`Variabili mancanti: ${missing.join(", ")}`);
  process.exitCode = 1;
} else if (!process.argv.includes("--send")) {
  console.log("Configurazione presente. Nessuna email inviata. Aggiungere --send per inviare una sola email tecnica al destinatario configurato.");
} else {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.APPOINTMENT_FROM_EMAIL,
        to: [process.env.APPOINTMENT_TO_EMAIL],
        subject: "Prova tecnica invio sito — Dr. Simone Contino",
        text: "Messaggio di prova tecnica del sito. Non contiene dati di pazienti e non costituisce una richiesta di appuntamento. Verificare la ricezione anche nella cartella spam.",
      }),
      signal: AbortSignal.timeout(15_000),
    });
    console.log(response.ok ? "Resend ha accettato il messaggio. Verificare inbox/spam: accettazione non equivale a consegna." : `Invio non riuscito (HTTP ${response.status}). Verificare i log in Resend.`);
    if (!response.ok) process.exitCode = 1;
  } catch {
    console.error("Esito non verificabile per errore di rete. Controllare Resend prima di ripetere la prova per evitare duplicati.");
    process.exitCode = 1;
  }
}
