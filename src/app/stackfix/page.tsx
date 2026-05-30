import { StackfixLanding } from "@/components/stackfix/stackfix-landing";
import { buildStackfixMetadata } from "@/lib/seo";
import { stackfixStructuredDataGraph } from "@/lib/schema";

export const metadata = buildStackfixMetadata();

export default function StackfixPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stackfixStructuredDataGraph()) }}
      />
      <StackfixLanding />
    </>
  );
}
