import LoginForm from '@/app/ui/login/login-form';
import { Suspense } from 'react';
import LoginSkeleton from '@/app/ui/loading/skeleton';

export default async function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <div className="w-full flex items-center justify-center h-screen">
        <LoginForm />
      </div>
    </Suspense>
  );
}