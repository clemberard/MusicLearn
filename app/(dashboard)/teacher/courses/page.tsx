import Search from "@/app/ui/search";
import { CreateCourses } from "@/app/ui/teacher/buttons";
import { fetchCoursesPages } from "@/app/lib/data";
import { CoursesTableSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";
import { CoursesTableFiltre } from "@/app/ui/teacher/table";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  //const totalPages = await fetchCoursesPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Courses</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Courses..." />
        <CreateCourses />
      </div>
      <div>
        <Suspense key={query + currentPage} fallback={<CoursesTableSkeleton />}>
          <CoursesTableFiltre query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </div>
  );
}
