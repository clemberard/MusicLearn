import Search from "@/app/ui/search";
import { CreateCourses } from "@/app/ui/teacher/buttons";
import { CoursesTableSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";
import { CoursesTableFiltre } from "@/app/ui/teacher/table";
import Navbar from "@/app/ui/layout/navbar";

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
    <>
      <Navbar />

      <div className="w-full container mx-auto mt-4">
          <h1 className={`text-2xl`}>Courses</h1>
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
    </>
  );
}
