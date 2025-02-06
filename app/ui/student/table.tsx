import {fetchCourses, fetchProgressesByStudent} from '@/app/lib/data';
import {EnrollmentButton} from "@/app/ui/student/button";
import Link from 'next/link';
import { getUser } from "@/app/lib/actions";
import { auth } from "@/auth"

export async function CoursesTable() {
    const session = await auth()
    const user = session?.user?.email ? await getUser(session.user.email) : null;
    const courses = await fetchCourses(user?.id);

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
                            <th scope="col" className="px-3 py-5 font-medium">Instrument</th>
                            <th scope="col" className="px-3 py-5 font-medium">Level</th>
                            <th scope="col" className="px-3 py-5 font-medium">Schedule</th>
                            <th scope="col" className="px-3 py-5 font-medium">Capacity</th>
                            <th scope="col" className="px-3 py-5 font-medium">Enrollment</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {courses.map((course) => (
                            <tr
                                key={course.id}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <Link href={`/student/courses/${course.id}/show`} className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>
                                        {course.title}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">{course.instrument}</td>
                                <td className="whitespace-nowrap px-3 py-3">{course.level}</td>
                                <td className="whitespace-nowrap px-3 py-3">{course.schedule}</td>
                                <td className="whitespace-nowrap px-3 py-3">{course.capacity}</td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {
                                    course.enrollment ? ( course.enrollment.status ) : 
                                    (
                                    <EnrollmentButton userId={user?.id} courseId={course.id}>
                                        Enroll
                                    </EnrollmentButton>
                                    )}
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

export async function ProgressesTable() {
    const session = await auth()
    const user = session?.user?.email ? await getUser(session.user.email) : null;
    const progresses = await fetchProgressesByStudent(user?.id);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                Course
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">Date</th>
                            <th scope="col" className="px-3 py-5 font-medium">Evaluation</th>
                            <th scope="col" className="px-3 py-5 font-medium">Comments</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {progresses.map((progress) => (
                            <tr
                                key={progress.id}
                                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    <Link target={'_blank'} href={`/student/courses/${progress.courseid}/show`} className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>
                                        {progress.courseName}
                                    </Link>
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">{progress.date.toLocaleDateString()}</td>
                                <td className="whitespace-nowrap px-3 py-3">{progress.evaluation}</td>
                                <td className="whitespace-nowrap px-3 py-3">{progress.comments}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
