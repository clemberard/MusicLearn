import {fetchCourseById} from "@/app/lib/data";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from "@/app/ui/layout/navbar";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const course = await fetchCourseById(id);

    if (!course) {
        notFound();
    }
    return (
        <>
            <Navbar />
            <main className={"container mx-auto mt-6"}>
                <h1 className="text-4xl font-bold text-center mt-4">{course.title}</h1>
                <p className="text-lg mt-2">Description:<br />{course.description}</p>
                <div className="mt-4">
                    <span className="font-semibold">Instrument: </span>{course.instrument}
                </div>
                <div className="mt-2">
                    <span className="font-semibold">Level: </span>{course.level}
                </div>
                <div className="mt-2">
                    <span className="font-semibold">Schedule: </span>{course.schedule}
                </div>
                <div className="mt-2 mb-6">
                    <span className="font-semibold">Capacity: </span>{course.capacity}
                </div>
                <Link
                    href="/student/courses"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                >
                    Go Back
                </Link>
            </main>
        </>
    ); 
}