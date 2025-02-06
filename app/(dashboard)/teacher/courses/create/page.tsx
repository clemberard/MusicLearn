import { getUser } from '@/app/lib/actions';
import Form from '@/app/ui/teacher/create-form';
import { auth } from "@/auth"
import Navbar from "@/app/ui/layout/navbar";
 
export default async function Page() {
  return (
    <>
      <Navbar />
      <Form />
    </>
  );
}