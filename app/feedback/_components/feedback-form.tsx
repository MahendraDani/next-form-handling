"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZFeedbackFormSchema } from "@/lib/zod";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";

interface IFormStage {
  prev: number;
  current: number;
  next: number;
}
export const FeedbackForm = () => {
  const form = useForm<z.infer<typeof ZFeedbackFormSchema>>({
    resolver: zodResolver(ZFeedbackFormSchema),
    defaultValues: {
      name: "",
      feedback: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
    },
  });
  function onSubmit(values: z.infer<typeof ZFeedbackFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [formStage, setFormStage] = useState<IFormStage>({
    prev: -1,
    current: 0,
    next: 1,
  });
  console.log(formStage);
  return (
    <Card className="max-w-[25rem]">
      <CardHeader className="-mb-2">
        <CardTitle>Give Feedback</CardTitle>
        <CardDescription>
          {"Let us know what you liked about this project"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Textarea placeholder="I am amazed by ...." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Github Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/johndoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter handle</FormLabel>
                  <FormControl>
                    <Input placeholder="https://x.com/@johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin Profile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/john-doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form> */}
        {/* <ContentDemo formStage={formStage} setFormStage={setFormStage} /> */}
        {formStage.current === 0 && (
          <PersonalDetailsForm
            formStage={formStage}
            setFormStage={setFormStage}
          />
        )}
        {formStage.current === 1 && (
          <Form2 formStage={formStage} setFormStage={setFormStage} />
        )}
        {formStage.current === 2 && (
          <Form3 formStage={formStage} setFormStage={setFormStage} />
        )}
        {/* <div className="w-full flex justify-between items-center">
          {formStage.current > 0 && (
            <Button
              variant={"outline"}
              onClick={() => {
                setFormStage({
                  prev: formStage.prev > 0 ? formStage.prev - 1 : -1,
                  current: formStage.prev,
                  next: formStage.current,
                });
              }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              setFormStage({
                prev: formStage.current,
                current: formStage.next,
                next: formStage.next + 1,
              });
            }}
          >
            next
          </Button>
        </div> */}
      </CardContent>
    </Card>
  );
};

function ContentDemo({
  formStage,
  setFormStage,
}: {
  formStage: IFormStage;
  setFormStage: React.Dispatch<React.SetStateAction<IFormStage>>;
}) {
  console.log(formStage);
  return (
    <>
      <div>{`I am step ${formStage.current}`}</div>
      <div className="w-full flex justify-between items-center">
        {formStage.current > 0 && (
          <Button
            variant={"outline"}
            onClick={() => {
              setFormStage({
                prev: formStage.prev > 0 ? formStage.prev - 1 : -1,
                current: formStage.prev,
                next: formStage.current,
              });
            }}
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            setFormStage({
              prev: formStage.current,
              current: formStage.next,
              next: formStage.next + 1,
            });
          }}
        >
          next
        </Button>
      </div>
    </>
  );
}

function PersonalDetailsForm({
  formStage,
  setFormStage,
}: {
  formStage: IFormStage;
  setFormStage: React.Dispatch<React.SetStateAction<IFormStage>>;
}) {
  const [age, setAge] = useState("");
  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("age", age);
    setFormStage({
      prev: formStage.current,
      current: formStage.next,
      next: formStage.next + 1,
    });
  };
  return (
    <form onSubmit={hanldeFormSubmit}>
      <div>Form 1</div>
      <Input
        name="age"
        placeholder="18"
        onChange={(e) => setAge(e.target.value)}
      />
      {formStage.current > 0 && (
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            setFormStage({
              prev: formStage.prev > 0 ? formStage.prev - 1 : -1,
              current: formStage.prev,
              next: formStage.current,
            });
          }}
        >
          Back
        </Button>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}

function Form2({
  formStage,
  setFormStage,
}: {
  formStage: IFormStage;
  setFormStage: React.Dispatch<React.SetStateAction<IFormStage>>;
}) {
  const [role, setRole] = useState("");
  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("role", role);
    setFormStage({
      prev: formStage.current,
      current: formStage.next,
      next: formStage.next + 1,
    });
  };
  return (
    <>
      <form onSubmit={hanldeFormSubmit}>
        <div>Form 2</div>
        <Input
          name="role"
          placeholder="abc"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        {formStage.current > 0 && (
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              setFormStage({
                prev: formStage.prev > 0 ? formStage.prev - 1 : -1,
                current: formStage.prev,
                next: formStage.current,
              });
            }}
          >
            Back
          </Button>
        )}

        <Button type="submit">Submit 2</Button>
      </form>
      <Button
        onClick={() => {
          setFormStage({
            prev: formStage.current,
            current: formStage.next,
            next: formStage.next + 1,
          });
        }}
      >
        Skip
      </Button>
    </>
  );
}
function Form3({
  formStage,
  setFormStage,
}: {
  formStage: IFormStage;
  setFormStage: React.Dispatch<React.SetStateAction<IFormStage>>;
}) {
  const [name, setName] = useState("");
  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    setFormStage({
      prev: formStage.current,
      current: formStage.next,
      next: formStage.next + 1,
    });
  };
  return (
    <form onSubmit={hanldeFormSubmit}>
      <div>Form 3</div>
      <Input
        name="name"
        placeholder="Jhon"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {formStage.current > 0 && (
        <Button
          type="button"
          variant={"outline"}
          onClick={() => {
            setFormStage({
              prev: formStage.prev > 0 ? formStage.prev - 1 : -1,
              current: formStage.prev,
              next: formStage.current,
            });
          }}
        >
          Back
        </Button>
      )}
      <Button type="submit">Submit 3</Button>
    </form>
  );
}
