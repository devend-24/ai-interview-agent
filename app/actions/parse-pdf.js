"use server";

export async function parsePdf(formData) {
  try {
    const file = formData.get("file");
    if (!file) throw new Error("No file uploaded");

    const arrayBuffer = await file.arrayBuffer();
    const { extractText } = await import("unpdf");
    const { text } = await extractText(new Uint8Array(arrayBuffer));

    return { success: true, text };
  } catch (error) {
    console.error("PDF parse error:", error);
    return { success: false, error: "Failed to parse PDF" };
  }
}