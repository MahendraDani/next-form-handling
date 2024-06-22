import { Container } from "@/components/containers/Container";
import { JokesPageClient } from "./page-client";

export default function Page() {
  return (
    <Container className="pt-2 px-4" size={"lg"}>
      <JokesPageClient />
    </Container>
  );
}
