import { CoursesTable, Course } from "./definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchCourses(userId = 0) {
  try {
      const courses = await sql<CoursesTable[]>`
    SELECT
      courses.id,
      courses.title,
      courses.description,
      courses.instrument,
      courses.teacherId,
      courses.level,
      courses.schedule,
      courses.capacity
    FROM courses
  `;
      if (userId) {
        await Promise.all(courses.map(async (course: any) => {
            const enrollment = await fetchEnrollmentByCourseIdAndUserId(course.id.toString(), userId.toString());
            course.enrollment = (enrollment.length > 0) ? enrollment[0] : null;
        }));
      }

      return courses;
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch courses.');
  }
}


const ITEMS_PER_PAGE = 6;

export async function fetchFilteredCourses(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const courses = await sql<CoursesTable[]>`
      SELECT
        id,
        title,
        description,
        instrument,
        level,
        schedule,
        capacity
      FROM courses
      WHERE
        title ILIKE ${'%' + query + '%'} OR
        description ILIKE ${'%' + query + '%'} OR
        instrument::text ILIKE ${'%' + query + '%'} OR
        level::text ILIKE ${'%' + query + '%'} OR
        schedule::text ILIKE ${'%' + query + '%'} OR
        capacity::text ILIKE ${'%' + query + '%'}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return courses;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch courses.");
  }
}

export async function fetchCoursesPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM courses
      WHERE
        title ILIKE ${'%' + query + '%'} OR
        description ILIKE ${'%' + query + '%'} OR
        instrument::text ILIKE ${'%' + query + '%'} OR
        level::text ILIKE ${'%' + query + '%'} OR
        schedule::text ILIKE ${'%' + query + '%'} OR
        capacity::text ILIKE ${'%' + query + '%'}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of courses.");
  }
}

export async function fetchCourseById(id: string) {
    try {
        const course = await sql<Course[]>`
      SELECT
        courses.id,
        courses.title,
        courses.description,
        courses.instrument,
        courses.teacherId,
        courses.level,
        courses.schedule,
        courses.capacity
      FROM courses
      WHERE courses.id = ${id}
    `;

        return course[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch course.');
    }
}

export async function fetchProgresses() {
    try {
        const progresses = await sql`
      SELECT
        progresses.id,
        progresses.courseId,
        progresses.studentId,
        progresses.date,
        progresses.evaluation,
        progresses.comments
      FROM progresses
    `;

        progresses.forEach((progress: any) => {
            progress.date = new Date(progress.date);
            progress.courseName = fetchCourseById(progress.courseid).then((course) => course.title);
        });

        return progresses;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch progress.');
    }
}

export async function fetchProgressesByStudent(studentId : string) {
    try {
        const progresses = await sql`
      SELECT
        progresses.id,
        progresses.courseId,
        progresses.studentId,
        progresses.date,
        progresses.evaluation,
        progresses.comments
      FROM progresses
      WHERE studentId = ${studentId}
    `;

        progresses.forEach((progress: any) => {
            progress.date = new Date(progress.date);
            progress.courseName = fetchCourseById(progress.courseid).then((course) => course.title);
        });

        return progresses;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch progress.');
    }
}

export async function fetchEnrollmentByCourseIdAndUserId(courseId: string, userId: string) {
    try {
        const enrollment = await sql`
      SELECT
        *
      FROM enrollments
      WHERE courseId = ${courseId} AND studentId = ${userId}
    `;

        return enrollment;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch enrollment.');
    }
}
