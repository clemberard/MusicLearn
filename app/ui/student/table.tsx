import { fetchCourses } from '@/app/lib/data';

export default async function CoursesTable() {
    const courses = await fetchCourses();

    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Instrument</th>
                    <th>Level</th>
                    <th>Schedule</th>
                    <th>Capacity</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course) => (
                    <tr key={course.id}>
                        <td>{course.title}</td>
                        <td>{course.instrument}</td>
                        <td>{course.level}</td>
                        <td>{course.schedule}</td>
                        <td>{course.capacity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}