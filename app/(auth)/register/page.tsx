import RegisterForm from '@/app/ui/register/form';
import { Suspense } from 'react';
import LoginSkeleton from '@/app/ui/loading/skeleton';
import NavbarPage from "@/app/ui/layout/navbar";


export default async function RegisterPage() {
  return (
    <>
      <NavbarPage />
      <Suspense fallback={<LoginSkeleton />}>
        <div className="w-full flex items-center justify-center h-screen">
          <RegisterForm />
        </div>
      </Suspense>
    </>
  );
}