import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Documentation",
  description: "Integrate shipco into your app. REST API for authentication, creating and tracking shipments, and webhooks.",
};

export default function ApiDocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
