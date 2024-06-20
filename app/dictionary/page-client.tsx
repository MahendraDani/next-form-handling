"use client";
import { useState } from "react";
import { DictionaryForm } from "./form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MultiTabCodeBlock } from "@/components/codeblock/multi-tab-codeblock";
import { dictionaryExample } from "@/lib/examples/dictionary";
export const DictionaryPageClient = () => {
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  return (
    <main className="flex justify-between items-start gap-8">
      {/* For desktop screens */}
      <section className="hidden md:block w-[48rem] h-[50vh]">
        <MultiTabCodeBlock
          files={dictionaryExample.files}
          editorStyles={{
            maxWidth: "38rem",
            maxHeight: "80vh",
          }}
        />
      </section>

      <div className="w-full lg:w-auto">
        <div className="lg:hidden w-full flex justify-between items-center">
          <h2>Dictionary for you</h2>
          <Button
            variant={"secondary"}
            onClick={() => {
              showCodeBlock ? setShowCodeBlock(false) : setShowCodeBlock(true);
            }}
          >
            {showCodeBlock ? "Preview" : "Source"}
          </Button>
        </div>
        <main
          className={`lg:hidden ${showCodeBlock ? "block" : "hidden"} pt-2`}
        >
          <MultiTabCodeBlock
            files={dictionaryExample.files}
            editorStyles={{
              maxHeight: "80vh",
            }}
          />
        </main>
        <main
          className={cn("block w-full", {
            "hidden lg:block": showCodeBlock,
          })}
        >
          <DictionaryForm />
        </main>
      </div>
    </main>
  );
};
