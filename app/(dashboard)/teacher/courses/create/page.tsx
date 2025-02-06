import { getUser } from '@/app/lib/actions';
import CreateFormCourse from '@/app/form/create-form-course'
import { auth } from "@/auth"
import Navbar from "@/app/ui/layout/navbar";
 
export default async function Page() {
  return (
    <>
      <Navbar />
      <CreateFormCourse />
    </>
  );
}