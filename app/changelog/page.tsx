import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

// This page will be static
export const dynamic = "force-static";

async function getChangelogContent() {
  const filePath = path.join(process.cwd(), "CHANGELOG.md");
  const content = fs.readFileSync(filePath, "utf8");
  return content;
}

export default async function ChangelogPage() {
  const content = await getChangelogContent();

  return (
    <main className="container py-8">
      <div className="max-w-[700px]">
        <div className="prose prose-sm prose-gray max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </main>
  );
}
