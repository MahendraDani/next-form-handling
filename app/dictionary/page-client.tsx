"use client";
import { useState } from "react";
import { DictionaryForm } from "./form";
import { Button } from "@/components/ui/button";
export const DictionaryPageClient = () => {
  const [showCodeBlock, setShowCodeBlock] = useState(false);
  return (
    <main>
      {/* For mobile screens */}
      <div className="sm:hidden">
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
      </div>
      <div className="hidden sm:flex justify-between items-start">
        <section className="bg-red-700">Editor here</section>
        <section className="">
          <DictionaryForm />
        </section>
      </div>
    </main>
  );
};
