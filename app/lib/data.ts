import { CoursesTable } from "./definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchCourses() {
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
