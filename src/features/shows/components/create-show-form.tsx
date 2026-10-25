"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Path } from "react-hook-form";
import { createShowSchema } from "@/features/shows/schemas";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIFFICULTY_VALUES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { startTransition, useActionState, useEffect } from "react";
import { createShowAction } from "@/features/shows/actions";

export default function CreateShowForm() {
  const [ state, submitAction, isPending ] = useActionState(createShowAction, null)

  const form = useForm<z.infer<typeof createShowSchema>>({
    resolver: zodResolver(createShowSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      difficulty: undefined,
      price: 0.00,
      duration: {
        minutes: 0,
        seconds: 0,
      },
      description: "",
    },
  });

  useEffect(() => {
    if (state?.fieldErrors) {
      for (const [name, messages] of Object.entries(state.fieldErrors)) {
        if (messages) {
          form.setError(name as Path<z.infer<typeof createShowSchema>>, {
            type: "server",
            message: messages[0],
          });
        }
      }
    }
  }, [state, form.setError])

  return (
    <form
      onSubmit={form.handleSubmit((data) => {
        startTransition(() => submitAction(data));
      })}
      className="w-full sm:max-w-md"
    >
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>Create New Show</h1>
          </CardTitle>
          <CardDescription>
            Give us some details about the show you want to sell.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">
                    Show Title <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="The Uninvited"
                    autoComplete="off"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="difficulty"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="difficulty">
                      Difficulty <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      required
                    >
                      <SelectTrigger
                        id="difficulty"
                        aria-invalid={fieldState.invalid}
                        className="capitalize"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {DIFFICULTY_VALUES.map((diff) => (
                          <SelectItem
                            key={diff}
                            value={diff}
                            className="capitalize"
                          >
                            {diff}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="price">
                      Price <span className="text-destructive">*</span>
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>$</InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id="price"
                        type="number"
                        inputMode="numeric"
                        min={0}
                        step={0.01}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        value={isNaN(field.value) ? "" : field.value.toString()}
                        onChange={(e) => {
                          const output = parseFloat(e.target.value);
                          field.onChange(isNaN(output) ? 0 : output);
                        }}
                        required
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <FieldSet>
              <div className="flex items-center gap-4">
                <FieldLegend variant="label" className="flex-0 text-nowrap">
                  Show Duration <span className="text-destructive">*</span>
                </FieldLegend>
                <div className="flex flex-1 items-center justify-between gap-2">
                  <Controller
                    name="duration.minutes"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="sr-only">Duration</FieldLabel>
                        <Input
                          {...field}
                          id="duration-minutes"
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={59}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          value={
                            isNaN(field.value) ? "" : field.value.toString()
                          }
                          onChange={(e) => {
                            const output = parseInt(e.target.value);
                            field.onChange(isNaN(output) ? 0 : output);
                          }}
                          required
                        />
                      </Field>
                    )}
                  />
                  <span className="text-muted-foreground">:</span>
                  <Controller
                    name="duration.seconds"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="sr-only">Seconds</FieldLabel>
                        <Input
                          {...field}
                          id="duration-seconds"
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={59}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          value={
                            isNaN(field.value)
                              ? ""
                              : field.value.toString().length < 2
                                ? `0${field.value.toString()}`
                                : field.value.toString()
                          }
                          onChange={(e) => {
                            const output = parseInt(e.target.value);
                            field.onChange(isNaN(output) ? 0 : output);
                          }}
                          required
                        />
                      </Field>
                    )}
                  />
                </div>
              </div>
              {form.formState.errors.duration?.message ? (
                <FieldError errors={[form.formState.errors.duration]} />
              ) : form.formState.errors.duration?.seconds?.message ? (
                <FieldError errors={[form.formState.errors.duration.seconds]} />
              ) : form.formState.errors.duration?.minutes?.message ? (
                <FieldError errors={[form.formState.errors.duration.minutes]} />
              ) : null}
            </FieldSet>

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    rows={4}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" disabled={isPending}>
              Create
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </form>
  );
}
