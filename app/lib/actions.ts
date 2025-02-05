"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import z from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const FormSchemaCourses = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string",
  }),
  description: z.string({
    invalid_type_error: "Description must be a string",
  }),
  instrument: z.string({
    invalid_type_error: "Instrument must be a string",
  }),
  level: z.string({
    invalid_type_error: "Level must be a string",
  }),
  schedule: z.string({
    invalid_type_error: "Schedule must be a string",
  }),
  capacity: z.number({
    invalid_type_error: "Capacity must be a number",
  }),
});

const CreateCourses = FormSchemaCourses;
const UpdateCourses = FormSchemaCourses;

export type StateCourses = {
  errors?: {
    title?: string;
    description?: string;
    instrument?: string;
    level?: string;
    schedule?: string;
    capacity?: number;
  };
  message?: string | null;
};

export async function createCourse(prevState: StateCourses, formData: FormData): Promise<StateCourses> {
  const capacityValue = formData.get("capacity");
  const capacityNumber = capacityValue ? Number(capacityValue) : NaN;

  const validatedFields = CreateCourses.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    instrument: formData.get("instrument"),
    level: formData.get("level"),
    schedule: formData.get("schedule"),
    capacity: capacityNumber,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    const formattedErrors = Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]]));

    return {
      message: null,
      errors: formattedErrors,
    };
  }
  const { title, description, instrument, level, schedule } = validatedFields.data;
  console.log(title, description, instrument, level, schedule, capacityNumber);
  try {
    console.log("Inserting course :", title, description, instrument, level, schedule, capacityNumber);
    if (isNaN(capacityNumber)) {
      throw new Error("Capacity must be a valid number");
    }
    await sql`
    INSERT INTO courses (title, description, instrument, teacherId, level, schedule, capacity)
    VALUES (${title}, ${description}, ${instrument}, '410544b2-4001-4271-9855-fec4b6a6442a', ${level}, ${schedule}, ${capacityNumber})
  `;
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/teacher/courses");
  redirect("/teacher/courses");
}

export async function updateCourse(
  prevState: StateCourses,
  formData: FormData
): Promise<StateCourses> {
  const id = formData.get("id") as string;
  const capacityValue = formData.get("capacity");
  const capacityNumber = capacityValue ? Number(capacityValue) : NaN;

  const validatedFields = UpdateCourses.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    instrument: formData.get("instrument"),
    level: formData.get("level"),
    schedule: formData.get("schedule"),
    capacity: capacityNumber,
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const formattedErrors = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
    );

    return {
      message: null,
      errors: formattedErrors,
    };
  }

  const { title, description, instrument, level, schedule } = validatedFields.data;

  try {
    console.log("Updating course:", title, description, instrument, level, schedule, capacityNumber);
    await sql`
      UPDATE courses
      SET title = ${title}, description = ${description}, instrument = ${instrument},
          level = ${level}, schedule = ${schedule}, capacity = ${capacityNumber}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: "Error updating course.", errors: {} };
  }

  revalidatePath("/teacher/courses");
  redirect("/teacher/courses");
}

export async function deleteCourse(id: string) {
  await sql`DELETE FROM courses WHERE id = ${id}`;
  revalidatePath("/teacher/courses");
}


// Users 

const FormSchemaUsers = z.object({
  name: z.string({
    invalid_type_error: "Name must be a string",
  }),
  email: z.string({
    invalid_type_error: "Email must be a string",
  }),
  password: z.string({
    invalid_type_error: "Password must be a string",
  }),
  role: z.string({
    invalid_type_error: "Role must be a string",
  }),
});

const CreateUsers = FormSchemaUsers;

export type StateUsers = {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };
  message?: string | null;
};

export async function createUsers(state: StateUsers, formData: FormData): Promise<StateUsers> {
  const validatedFieldsUsers = CreateUsers.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFieldsUsers.success) {
    const fieldErrors = validatedFieldsUsers.error.flatten().fieldErrors;

    const formattedErrors = Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]]));

    return {
      message: null,
      errors: formattedErrors,
    };
  }
  const { name, email, password, role } = validatedFieldsUsers.data;
  console.log(name, email, password, role);
  try {
    await sql`
    INSERT INTO users (name, email, password, role)
    VALUES (${name}, ${email}, ${bcrypt.hashSync(password, bcrypt.genSaltSync(10))}, ${role})
  `;
  } catch (error) {
    console.error(error);
  }
  redirect("/register");
}


