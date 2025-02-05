import Image from 'next/image';
import { UpdateCourse, DeleteCourse } from '@/app/ui/teacher/buttons';
import { fetchCourses, fetchFilteredCourses } from '@/app/lib/data';

export async function CoursesTableFiltre({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const courses = await fetchFilteredCourses(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  instrument
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  level
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  schedule
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  capacity
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courses?.map((courses) => (
                <tr
                  key={courses.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {courses.title}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {courses.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {courses.instrument}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {courses.level}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {courses.schedule}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {courses.capacity}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCourse id={courses.id} />
                      <DeleteCourse id={courses.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
