import Link from "next/link";

export function CreateCourses() {
  return (
    <Link href="/teacher/courses/create" className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Create Course</span>
    </Link>
  );
}

export function UpdateCourse({ id }: { id: string }) {
  return (
    <Link href={`/teacher/courses/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
      <span className="hidden md:block">Edit</span>
    </Link>
  );
}

// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);

//   return (
//     <form action={deleteInvoiceWithId}>
//       <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//       </button>
//     </form>
//   );
// }
