"use client"

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { useCallback, useEffect, useState, useTransition } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";



function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams()
    const token = searchParams.get("token")
    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token")
            return
        }
        newVerification(token)
            .then((data) => {
                setSuccess(data.success)
                setError(data.error)
            }).catch((err) => {
                setError("Somthing went wrong!")
            })
    }, [token])
    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    return (
        <CardWrapper
            headerTitle="Confiring your verification"
            headerSubTitle=""
            backButtonHref=""
            backButtonLabel="">
            {!error && !success && <div className="text-center">loading...</div>}

            <FormError message={error} />
            <FormSuccess message={success} />

        </CardWrapper>
    );
}

export default NewVerificationForm;