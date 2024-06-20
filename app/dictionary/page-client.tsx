"use client";
import { useState } from "react";
import { DictionaryForm } from "./form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export const DictionaryPageClient = () => {
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  return (
    <main className="flex justify-between items-start gap-8">
      {/* For mobile screens */}
      {/* <div className="">
        <div className="w-full flex justify-between items-center">
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
        {showCodeBlock ? (
          <section className="bg-red-700 pt-2">Editor here</section>
        ) : (
          <section className="mt-2">
            <DictionaryForm />
          </section>
        )}
      </div> */}
      {/* <div className="hidden sm:flex justify-between items-start">
        <section className="">
          <DictionaryForm />
        </section>
      </div> */}
      {/* For desktop screens */}
      <section className="hidden md:block w-[48rem] h-[50vh] bg-gray-400">
        Editor here
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
        <main className={`${showCodeBlock ? "block" : "hidden"}`}>
          Editor here
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
