"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IfetchWordMeaningActionPrevState,
  fetchWordMeaningAction,
} from "./action";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";

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
    <div className="space-y-2 min-h-[48rem] md:min-w-[32rem]">
      <form action={formAction}>
        <FormFields state={state} />
      </form>
      {!state.isError && state.response && (
        <div>
          <div className="w-full flex justify-start items-center gap-3">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold">
                {state.response[0].word}
              </h2>
              <p className="text-[0.7rem] text-gray-500 pr-6">
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
                  <p
                    key={i}
                    className=" text-wrap md:max-w-[32rem] py-1"
                  >{`- ${def.definition}`}</p>
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
    </div>
  );
};

function FormFields({ state }: { state: IfetchWordMeaningActionPrevState }) {
  const { pending } = useFormStatus();
  return (
    <fieldset disabled={pending} className="w-full ">
      <Label className="text-lg">Search any word</Label>
      <div className="w-full flex justify-start items-start gap-2">
        <div className="w-full flex justify-start items-start flex-col">
          <Input placeholder="healthy" name="word" className="sm:w-[23rem]" />
          {state.isError && state.errorType === "validationError" && (
            <p className="text-sm text-red-500">{state.message}</p>
          )}
        </div>
        <Button
          className="py-4 flex justify-center items-center gap-1"
          type="submit"
          disabled={pending}
          variant={"secondary"}
        >
          {pending && <Spinner />}
          <span>Search</span>
        </Button>
      </div>
    </fieldset>
  );
}
