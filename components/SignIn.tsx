"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { bricolageGrotesque } from "@/app/font";
import { signinSchema } from "@/lib/schemas";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";

export default function SignIn({ loading, setLoading }: { loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();

    React.useEffect(() => {
        if (localStorage.getItem("email")) {
            router.replace("/dashboard")
        }
    }, [])
    const form = useForm({
        defaultValues: {
            email: "abc@gmail.com",
            password: "password123",
        },
        validators: {
            onSubmit: signinSchema,
        },
        onSubmit: async ({ value }) => {
            setLoading(true);
            localStorage.setItem("email", value.email);
            localStorage.setItem("password", value.password);
            router.replace("/dashboard")
            router.refresh();
        },
    });

    return (
        <section className="w-full md:w-[58%] min-h-full flex flex-col justify-evenly items-center gap-5">
            <div
                className={
                    bricolageGrotesque.className +
                    " text-[36px] text-black w-[300px] md:w-[360px] lg:w-[450px] xl:w-[500px] lg:mt-8"
                }
            >
                Zorvyn
            </div>
            <div className={"flex flex-col gap-7 lg:gap-8 " + bricolageGrotesque.className}>
                <div className="text-[26px] text-black">Sign in</div>
                <div>
                    <form
                        id="signin-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="w-[300px] md:w-[360px] lg:w-[450px] xl:w-[500px] flex flex-col gap-8"
                    >
                        <FieldGroup>
                            <div className="shadow-md shadow-white/50 p-3 rounded-3xl text-black">
                                <form.Field name="email">
                                    {(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    className="focus:ring-0 border-none shadow-none focus-visible:ring-0 p-0 text-black"
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        );
                                    }}
                                </form.Field>
                            </div>
                        </FieldGroup>
                        <FieldGroup>
                            <div className="shadow-md shadow-white/50 px-4 py-3 rounded-3xl text-black">
                                <form.Field name="password">
                                    {(field) => {
                                        const isInvalid =
                                            field.state.meta.isTouched && !field.state.meta.isValid;
                                        return (
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                <Input
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.state.value}
                                                    onBlur={field.handleBlur}
                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                    aria-invalid={isInvalid}
                                                    className="focus:ring-0 border-none shadow-none focus-visible:ring-0 p-0 text-black"
                                                    type="password"
                                                />
                                                {isInvalid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </Field>
                                        );
                                    }}
                                </form.Field>
                            </div>
                        </FieldGroup>
                        <div className="flex flex-col mt-4 gap-1">
                            <div>
                                <span className="text-[14px] text-black">New User ?</span>
                                <span
                                    className="text-white font-bold ml-1 text-xs md:text-[14px]"
                                >
                                    Just hit signin, doesn't matter.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 items-center">
                            <Button
                                className="px-8 py-5 bg-[#FFCC00] w-fit rounded-full font-semibold cursor-pointer text-black"
                                type="submit"
                            >
                                {loading ? (
                                    <div className={"flex items-center justify-center "}>
                                        <div className="animate-spin rounded-full border-b-2 border-white h-7 w-7"></div>
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
