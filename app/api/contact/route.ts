const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const DEFAULT_CONTACT_EMAIL = "nuarprofissional@gmail.com";
const DEFAULT_SITE_URL = "https://nuar-zm8e.vercel.app";

const allowedInterests = new Set([
  "Estratégia e posicionamento",
  "Identidade e branding",
  "Site e tecnologia",
  "Automação",
  "Projeto integrado",
]);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function emailLayout(content: string, siteUrl: string) {
  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;background:#080808;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#080808;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;border:1px solid #29282f;border-radius:20px;overflow:hidden;background:#101010;">
            <tr>
              <td style="padding:30px 34px;border-bottom:1px solid #29282f;">
                <div style="font-size:22px;font-weight:700;letter-spacing:.22em;color:#ffffff;">NUAR</div>
                <div style="margin-top:8px;font-size:10px;letter-spacing:.24em;color:#9d91ff;text-transform:uppercase;">Tecnologia · Design · Resultados</div>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 34px;">${content}</td>
            </tr>
            <tr>
              <td style="padding:24px 34px;border-top:1px solid #29282f;color:#777780;font-size:12px;line-height:1.6;">
                NUAR — negócios tradicionais em marcas digitais de sucesso.<br>
                <a href="${siteUrl}" style="color:#aa9fff;text-decoration:none;">Visitar nosso site</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL ?? DEFAULT_CONTACT_EMAIL;
  const contactEmail = process.env.CONTACT_TO_EMAIL ?? DEFAULT_CONTACT_EMAIL;
  const siteUrl = process.env.SITE_URL ?? DEFAULT_SITE_URL;

  if (!apiKey) {
    return Response.json({ error: "Serviço de e-mail ainda não configurado." }, { status: 503 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: "Origem não autorizada." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dados inválidos." }, { status: 400 });
  }

  if (body.website) {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const interest = typeof body.interest === "string" ? body.interest.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    name.length < 2 ||
    name.length > 100 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    !allowedInterests.has(interest) ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return Response.json({ error: "Revise os campos e tente novamente." }, { status: 400 });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeInterest = escapeHtml(interest);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  const notificationHtml = emailLayout(
    `<div style="display:inline-block;padding:7px 11px;border-radius:999px;background:#1b1730;color:#aa9fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Novo projeto</div>
    <h1 style="margin:22px 0 12px;font-size:30px;line-height:1.2;">Uma nova oportunidade chegou.</h1>
    <p style="margin:0 0 28px;color:#a7a7ae;font-size:15px;line-height:1.7;">O formulário do site recebeu um novo contato.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 10px;">
      <tr><td style="color:#777780;font-size:12px;width:110px;">Nome</td><td style="color:#ffffff;font-size:14px;">${safeName}</td></tr>
      <tr><td style="color:#777780;font-size:12px;">E-mail</td><td style="font-size:14px;"><a href="mailto:${safeEmail}" style="color:#aa9fff;text-decoration:none;">${safeEmail}</a></td></tr>
      <tr><td style="color:#777780;font-size:12px;">Interesse</td><td style="color:#ffffff;font-size:14px;">${safeInterest}</td></tr>
    </table>
    <div style="margin-top:24px;padding:22px;border:1px solid #29282f;border-radius:14px;background:#0b0b0b;">
      <div style="margin-bottom:10px;color:#777780;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">Mensagem</div>
      <div style="color:#dddddf;font-size:14px;line-height:1.7;">${safeMessage}</div>
    </div>
    <p style="margin:26px 0 0;color:#a7a7ae;font-size:13px;line-height:1.6;">Responda diretamente a este e-mail para falar com ${safeName}.</p>`,
    siteUrl,
  );

  const confirmationHtml = emailLayout(
    `<div style="display:inline-block;padding:7px 11px;border-radius:999px;background:#1b1730;color:#aa9fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">Projeto recebido</div>
    <h1 style="margin:22px 0 14px;font-size:30px;line-height:1.2;">Olá, ${safeName}.<br>Seu próximo movimento começou.</h1>
    <p style="margin:0;color:#b0b0b6;font-size:15px;line-height:1.75;">Recebemos sua mensagem sobre <strong style="color:#ffffff;">${safeInterest}</strong>. Nosso time vai analisar o cenário apresentado e responder em até 1 dia útil.</p>
    <div style="margin:28px 0;padding:22px;border-left:2px solid #8f83ed;border-radius:0 14px 14px 0;background:#0b0b0b;color:#d5d5d8;font-size:14px;line-height:1.7;">${safeMessage}</div>
    <p style="margin:0;color:#b0b0b6;font-size:14px;line-height:1.7;">Enquanto isso, você pode responder a este e-mail se quiser acrescentar alguma informação.</p>
    <p style="margin:28px 0 0;color:#ffffff;font-size:14px;line-height:1.6;">Até breve,<br><strong style="color:#aa9fff;">Time NUAR</strong></p>`,
    siteUrl,
  );

  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "NUAR", email: senderEmail },
      subject: "Recebemos seu projeto — NUAR",
      htmlContent: confirmationHtml,
      messageVersions: [
        {
          to: [{ email: contactEmail, name: "NUAR" }],
          replyTo: { email, name },
          subject: `Novo projeto — ${interest} — ${name}`,
          htmlContent: notificationHtml,
        },
        {
          to: [{ email, name }],
          replyTo: { email: contactEmail, name: "NUAR" },
          subject: "Recebemos seu projeto — NUAR",
          htmlContent: confirmationHtml,
        },
      ],
      tags: ["site-contato"],
    }),
  });

  if (!response.ok) {
    console.error("Brevo contact error", response.status, await response.text());
    return Response.json({ error: "Não foi possível enviar agora. Tente novamente em instantes." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
