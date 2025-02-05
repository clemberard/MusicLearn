"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import z from "zod";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export async function createCourses(prevState: StateCourses, formData: FormData): Promise<StateCourses> {
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
