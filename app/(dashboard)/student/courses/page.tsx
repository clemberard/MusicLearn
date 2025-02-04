import CoursesTable from "@/app/ui/student/table";

export default function Page() {
    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-4">Courses</h1>
            <div className="container mx-auto mt-6">
                <CoursesTable />
            </div>
        </>
    );
}