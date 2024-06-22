"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MultiTabCodeBlock } from "@/components/codeblock/multi-tab-codeblock";
import { dictionaryExample } from "@/lib/examples/dictionary";
import { JokesForm } from "./form";
export const JokesPageClient = () => {
  const [showCodeBlock, setShowCodeBlock] = useState(true);
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
        <div className="lg:hidden w-full flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Dictionary for you</h2>
          <Button
            variant={"secondary"}
            className="py-[1.1rem]"
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
          className={cn(
            "block justify-center items-center min-h-[45rem] w-full ",
            {
              "hidden lg:flex ": showCodeBlock,
            }
          )}
        >
          <JokesForm />
        </main>
      </div>
    </main>
  );
};
