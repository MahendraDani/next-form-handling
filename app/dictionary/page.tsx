import { Container } from "@/components/containers/Container";
import { DictionaryPageClient } from "./page-client";

export default function Dictionary() {
  return (
    <Container className="pt-2 px-4" size={"lg"}>
      <DictionaryPageClient />
    </Container>
  );
}
