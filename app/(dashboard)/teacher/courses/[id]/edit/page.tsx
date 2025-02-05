import Form from '@/app/ui/teacher/edit-form';
import { fetchCourseById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [course] = await Promise.all([
    fetchCourseById(id),
  ]);
  
  if (!course) {
    notFound();
  }
  return (
    <main>
      <Form course={course} />
    </main>
  );
}