"use client";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CodeBlockCopyButton = ({ codeString }: { codeString: string }) => {
  const [showCopyButton, setShowCopytButton] = useState(true);
  return (
    <div className="p-1 px-2 rounded-tr-sm">
      {showCopyButton ? (
        <button
          onClick={() => {
            navigator.clipboard.writeText(codeString);
            toast.success("Coppied to clipboard!");
            setShowCopytButton(false);
            setTimeout(() => {
              setShowCopytButton(true);
            }, 1 * 1000);
          }}
        >
          {<Clipboard size={"14px"} />}
        </button>
      ) : (
        <button disabled>{<Check size={"14px"} />}</button>
      )}
    </div>
  );
};
