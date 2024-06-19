"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sample } from "./sample";
import { Volume1Icon, Volume2Icon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  IfetchWordMeaningActionPrevState,
  fetchWordMeaningAction,
} from "./action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { error } from "console";

export const DictionaryForm = () => {
  const initState: IfetchWordMeaningActionPrevState = {
    errorType: null,
    message: "",
    isError: false,
    response: "",
  };

  const [state, formAction] = useFormState(fetchWordMeaningAction, initState);

  const showErrorToast = () => {
    state.errorType != "validationError" ? toast.error(state.message) : null;
  };
  useEffect(() => {
    state.isError ? showErrorToast() : null;
  }, [state]);
  return (
    <div className="p-1 space-y-2 px-4">
      <form action={formAction}>
        <fieldset>
          <Label className="text-lg">Search any word</Label>
          <div className="flex justify-between items-start gap-2">
            <div className="flex justify-start items-start flex-col">
              <Input placeholder="summmons" name="word" />
              {state.isError && state.errorType === "validationError" && (
                <p className="text-sm text-red-500">{state.message}</p>
              )}
            </div>
            <Button className="py-4" type="submit">
              Find
            </Button>
          </div>
        </fieldset>
      </form>
      {/* Form output response */}
      {!state.isError && state.response && (
        <div>
          <div className="w-full flex justify-start items-center gap-3">
            <div>
              <button>
                <Volume1Icon size={"24px"} />
              </button>
            </div>
            <div className="flex justify-between items-start flex-col">
              <h2 className="text-lg sm:text-xl font-semibold">
                {state.response[0].word}
              </h2>
              <p className="text-[0.7rem] text-gray-500">
                {state.response[0].phonetic}
              </p>
            </div>
          </div>

          <div className="mt-1 flex gap-2 flex-col justify-start items-start">
            {state.response[0].meanings.map((meaning: any, i: number) => (
              <div key={i}>
                <p className="text-sm text-gray-600">
                  <i>{meaning.partOfSpeech}</i>
                </p>
                {meaning.definitions.map((def: any, i: number) => (
                  <p key={i}>{`- ${def.definition}`}</p>
                ))}
                <div className="flex justify-start items-start gap-1 mt-1 flex-col">
                  {meaning.synonyms.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <i>Synonyms</i>
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {meaning.synonyms
                      .slice(0, 5)
                      .map((s: string, i: number) => (
                        <Button
                          key={i}
                          variant={"secondary"}
                          className="rounded-full"
                        >
                          {s}
                        </Button>
                      ))}
                  </div>
                </div>
                <div className="flex justify-start items-start gap-1 mt-1 flex-col">
                  {meaning.antonyms.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <i>Antonyms</i>
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {meaning.antonyms
                      .slice(0, 5)
                      .map((s: string, i: number) => (
                        <Button
                          key={i}
                          variant={"secondary"}
                          className="rounded-full"
                        >
                          {s}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <div>
        <div className="w-full flex justify-start items-center gap-3">
          <div>
            <button>
              <Volume1Icon size={"24px"} />
            </button>
          </div>
          <div className="flex justify-between items-start flex-col">
            <h2 className="text-lg sm:text-xl font-semibold">
              {sample[0].word}
            </h2>
            <p className="text-[0.7rem] text-gray-500">{sample[0].phonetic}</p>
          </div>
        </div>

        <div className="mt-1 flex gap-2 flex-col justify-start items-start">
          {sample[0].meanings.map((meaning, i) => (
            <div key={i}>
              <p className="text-sm text-gray-600">
                <i>{meaning.partOfSpeech}</i>
              </p>
              {meaning.definitions.map((def, i) => (
                <p key={i}>{`- ${def.definition}`}</p>
              ))}
              <div className="flex justify-start items-start gap-1 mt-1 flex-col">
                {meaning.synonyms.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <i>Synonyms</i>
                  </p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {meaning.synonyms.slice(0, 5).map((s, i) => (
                    <Button
                      key={i}
                      variant={"secondary"}
                      className="rounded-full"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-start items-start gap-1 mt-1 flex-col">
                {meaning.antonyms.length > 0 && (
                  <p className="text-sm text-gray-600">
                    <i>Antonyms</i>
                  </p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {meaning.antonyms.slice(0, 5).map((s, i) => (
                    <Button
                      key={i}
                      variant={"secondary"}
                      className="rounded-full"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
