import { getArchiveEntries } from "@lib/archive";
import { toDateInput } from "@lib/date";

export async function GET() {
  const entries = await getArchiveEntries();

  return new Response(
    JSON.stringify(
      entries.map((entry) => ({
        id: entry.id,
        type: entry.type,
        title: entry.title,
        date: toDateInput(entry.date),
        href: entry.href,
        text: entry.type === "Story" ? `${entry.title} ${entry.excerpt} ${entry.body}` : `${entry.title} ${entry.excerpt} ${entry.caption}`
      }))
    ),
    {
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    }
  );
}
