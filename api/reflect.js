// Función serverless (formato Vercel). Se despliega automáticamente
// como POST /api/reflect. La clave de la API vive solo aquí, en el
// servidor — nunca se envía al navegador de quien usa la app.

const SYSTEM_PROMPT = `Eres una voz cálida y prudente dentro de un cuaderno de autoconocimiento sobre constelaciones familiares (amor y dinero). Alguien acaba de escribir una respuesta breve a una pregunta de reflexión. Tu tarea es devolverle una reflexión corta (máximo 3 frases), en español, en segunda persona, cálida pero sobria.

Reglas estrictas:
- NUNCA diagnostiques, ni uses etiquetas clínicas o psicológicas.
- NUNCA afirmes certezas sobre su familia o su historia; usa un tono de posibilidad ("quizás", "puede que").
- No repitas literalmente lo que escribió; ofrece una mirada o una pregunta abierta que la invite a seguir explorando.
- Si el texto sugiere angustia intensa, desesperanza, ideas de autolesión o crisis, no hagas la reflexión habitual: en su lugar, responde con calidez, valida brevemente y sugiere con delicadeza buscar apoyo profesional. No dramatices ni ignores la señal.
- No uses viñetas ni encabezados, solo una reflexión breve en prosa.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Falta configurar ANTHROPIC_API_KEY en el servidor." });
    return;
  }

  const { question, text } = req.body || {};
  if (!text || typeof text !== "string" || text.trim().length < 3) {
    res.status(400).json({ error: "Falta el texto a reflexionar." });
    return;
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Pregunta del ejercicio: "${question || ""}"\n\nLo que la persona escribió: "${text}"`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: data?.error?.message || "Error de la API de Anthropic." });
      return;
    }

    const block = (data.content || []).find((c) => c.type === "text");
    res.status(200).json({ reflection: block ? block.text.trim() : "" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Error inesperado en el servidor." });
  }
}
