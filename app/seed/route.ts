import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import {users, courses, enrollments, progresses} from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
    `;

    const insertedUsers = await Promise.all(
        users.map(async (user: { id: string; name: string; email: string; password: string, role: string, createdAt: string }) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, name, email, password, role, createdAt)
                VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.createdAt})
            `;
        }),
    );

    return insertedUsers;
}

async function seedCourses() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS courses (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            instrument TEXT NOT NULL,
            teacherId TEXT NOT NULL,
            level TEXT NOT NULL,
            schedule TEXT NOT NULL,
            capacity INT NOT NULL
            );
    `;

    const insertedCourses = await Promise.all(
        courses.map(async (course: { id: string; title: string; description: string; instrument: string, teacherId: string, level: string, schedule: string, capacity: number }) => {
            return sql`
                INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
                VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
            `;
        }),
    )
}

async function seedEnrollments() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS enrollments (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            studentId UUID NOT NULL,
            courseId UUID NOT NULL,
            enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT NOT NULL
            );
    `;

    const insertedEnrollments = await Promise.all(
        enrollments.map(async (enrollment: { id: string; studentId: string; courseId: string, enrollmentDate: string, status: string }) => {
            return sql`
                INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
                VALUES (${enrollment.id}, ${enrollment.studentId}, ${enrollment.courseId}, ${enrollment.enrollmentDate}, ${enrollment.status})
            `;
        }),
    )
}

async function seedProgresses() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
        CREATE TABLE IF NOT EXISTS progresses (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            studentId UUID NOT NULL,
            courseId UUID NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            evaluation TEXT NOT NULL,
            comments TEXT NOT NULL
            );
    `;

    const insertedProgresses = await Promise.all(
        progresses.map(async (progress: { id: string; studentId: string; courseId: string, date: string, evaluation: string, comments: string }) => {
            return sql`
                INSERT INTO progresses (id, studentId, courseId, date, evaluation, comments)
                VALUES (${progress.id}, ${progress.studentId}, ${progress.courseId}, ${progress.date}, ${progress.evaluation}, ${progress.comments})
            `;
        }),
    )
}

export async function GET() {
    try {
        const result = await sql.begin((sql) => [
            seedUsers(),
            seedCourses(),
            seedEnrollments(),
            seedProgresses(),
        ]);

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        console.log(users);
        return Response.json({ error }, { status: 500 });
    }
}
