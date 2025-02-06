import CreateFormCourse from '@/app/form/create-form-course'
import Navbar from "@/app/ui/layout/navbar";
 
export default async function Page() {
  return (
    <>
      <Navbar />
      <CreateFormCourse />
    </>
  );
}