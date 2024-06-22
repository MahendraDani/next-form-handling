"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ZJokeFormSchema, ZJokeType } from "@/lib/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@/components/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchJokeAPI } from "./fetcher";
import { toast } from "sonner";
import { useState } from "react";

export const JokesForm = () => {
  return (
    <Card className="w-[24rem] md:w-[26rem]">
      <CardHeader className="-mb-2">
        <CardTitle className="w-full">bored? interested in a joke?</CardTitle>
      </CardHeader>
      <CardContent>
        <JokeFormFields />
      </CardContent>
    </Card>
  );
};

function JokeFormFields() {
  const [joke, setJoke] = useState<any>();
  const [jokeType, setJokeType] = useState<z.infer<typeof ZJokeType>>();
  const form = useForm<z.infer<typeof ZJokeFormSchema>>({
    defaultValues: {
      jokeType: "single",
      blackListFlags: null,
      category: null,
    },
    resolver: zodResolver(ZJokeFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof ZJokeFormSchema>) => {
    try {
      const { response } = await fetchJokeAPI(values);
      setJoke(response);
      if (values.jokeType === "twopart") {
        setJokeType("twopart");
      } else {
        setJokeType("single");
      }
    } catch (error) {
      toast.error("something went wrong");
      return;
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <fieldset className="space-y-3">
          <JokeTypeField form={form} />
          <JokeCategoryField form={form} />
          <JokeBlackListField form={form} />
        </fieldset>
        <div className="w-full flex justify-center items-center">
          <Button
            variant={"secondary"}
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-3 flex justify-center items-center gap-2
      "
          >
            {isSubmitting && <Spinner />}
            <span>Tell me</span>
          </Button>
        </div>
      </form>
      {joke ? (
        jokeType === "single" ? (
          <Card className="mt-2 text-center text-wrap">
            <CardHeader>
              <p>{joke.joke}</p>
            </CardHeader>
          </Card>
        ) : (
          <Card className="mt-2 text-center text-wrap">
            <CardHeader>
              <p>{joke.setup}</p>
              <p>{joke.delivery}</p>
            </CardHeader>
          </Card>
        )
      ) : null}
    </Form>
  );
}

function JokeTypeField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ZJokeFormSchema>>;
}) {
  return (
    <FormField
      control={form.control}
      name="jokeType"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="single">single</SelectItem>
                  <SelectItem value="twopart">two part</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function JokeCategoryField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ZJokeFormSchema>>;
}) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>
            Category <span className="text-muted">{"(Optional)"}</span>
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Misc">Misc</SelectItem>
                  <SelectItem value="Dark">Dark</SelectItem>
                  <SelectItem value="Pun">Pun</SelectItem>
                  <SelectItem value="Spooky">Spooky</SelectItem>
                  <SelectItem value="Christmas">Christmas</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function JokeBlackListField({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ZJokeFormSchema>>;
}) {
  return (
    <FormField
      control={form.control}
      name="blackListFlags"
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>
            Blacklist <span className="text-muted">{"(Optional)"}</span>
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="blacklist" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="nsfw">nsfw</SelectItem>
                  <SelectItem value="religious">religious</SelectItem>
                  <SelectItem value="political">political</SelectItem>
                  <SelectItem value="racist">racist</SelectItem>
                  <SelectItem value="sexist">sexist</SelectItem>
                  <SelectItem value="explicit">explicit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
