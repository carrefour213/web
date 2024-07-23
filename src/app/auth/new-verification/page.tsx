import NewVerificationForm from "@/components/auth/new-verification-form";
import { Suspense } from "react";



function VerificationPage() {
  return (
    <Suspense>
      <NewVerificationForm />
    </Suspense>
  );
}

export default VerificationPage;