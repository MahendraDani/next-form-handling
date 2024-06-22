export const code = ` "use client"
// imports //
export const FormComponent = () => {
  return (
    <Card className="w-[21rem] md:w-[26rem]">
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
`;
