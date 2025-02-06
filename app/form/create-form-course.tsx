'use server'

import Form from '@/app/ui/teacher/create-form';
import { auth } from "@/auth";
import { getUser } from "@/app/lib/actions";

export default async function createformCourse() {
  const session = await auth()
  const user = session?.user?.email ? await getUser(session.user.email) : null;

  return (
        <Form teacherid={user?.id}  />
    )
}
