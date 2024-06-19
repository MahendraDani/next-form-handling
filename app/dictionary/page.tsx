import { Container } from "@/components/containers/Container";
import { DictionaryPageClient } from "./page-client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Dictionary() {
  return (
    <Container className="pt-2 px-4 sm:px-12">
      <DictionaryPageClient />
    </Container>
  );
}
