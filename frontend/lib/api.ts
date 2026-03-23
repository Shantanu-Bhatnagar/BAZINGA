export async function generateProject(data: {
  project_name: string;
  description: string;
  language: string;
  framework: string;
  provider?: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/generate-project`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        provider: data.provider ?? "gemini",
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}
