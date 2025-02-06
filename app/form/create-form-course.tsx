'use server'

import Link from "next/link";

import Form from '@/app/ui/teacher/create-form';
import { auth } from "@/auth";
import { getUser } from "@/app/lib/actions";

export default async function createformCourse() {
  const session = await auth()
  const user = await getUser(session?.user?.email);

  return (
        <Form teacherid={user.id}  />
    )
}
