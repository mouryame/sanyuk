import { getPages } from "@/services/getPages";

async function GET() {
  const pages = await getPages();
  return new Response(JSON.stringify(pages));
}

export { GET };
