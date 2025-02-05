'use client';

import Link from 'next/link';
import { updateCourse, StateCourses } from '@/app/lib/actions';
import { useActionState } from 'react';
import { CoursesTable } from '@/app/lib/definitions';

export default function EditCoursesForm({ course }: { course: CoursesTable }) {
  const initialState: StateCourses = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateCourse, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={course.id} /> 

      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            defaultValue={course.title}
            className="block w-full rounded-md border-gray-200 p-2"
            required
          />
          {state.errors?.title && <p className="text-red-500">{state.errors.title}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Description"
            defaultValue={course.description}
            className="block w-full rounded-md border-gray-200 p-2"
            required
          />
          {state.errors?.description && <p className="text-red-500">{state.errors.description}</p>}
        </div>

        {/* Instrument */}
        <div className="mb-4">
          <label htmlFor="instrument" className="mb-2 block text-sm font-medium">
            Instrument
          </label>
          <input
            id="instrument"
            name="instrument"
            type="text"
            placeholder="Instrument"
            defaultValue={course.instrument}
            className="block w-full rounded-md border-gray-200 p-2"
            required
          />
          {state.errors?.instrument && <p className="text-red-500">{state.errors.instrument}</p>}
        </div>

        {/* Level */}
        <div className="mb-4">
          <label htmlFor="level" className="mb-2 block text-sm font-medium">
            Level
          </label>
          <input
            id="level"
            name="level"
            type="text"
            placeholder="Level"
            defaultValue={course.level}
            className="block w-full rounded-md border-gray-200 p-2"
            required
          />
          {state.errors?.level && <p className="text-red-500">{state.errors.level}</p>}
        </div>

        {/* Schedule */}
        <div className="mb-4">
          <label htmlFor="schedule" className="mb-2 block text-sm font-medium">
            Schedule
          </label>
          <input
            id="schedule"
            name="schedule"
            type="text"
            placeholder="Schedule"
            defaultValue={course.schedule}
            className="block w-full rounded-md border-gray-200 p-2"
            required
          />
          {state.errors?.schedule && <p className="text-red-500">{state.errors.schedule}</p>}
        </div>

        {/* Capacity */}
        <div className="mb-4">
          <label htmlFor="capacity" className="mb-2 block text-sm font-medium">
            Capacity
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            placeholder="Capacity"
            defaultValue={course.capacity}
            className="block w-full rounded-md border-gray-200 p-2"
            required
          />
          {state.errors?.capacity && <p className="text-red-500">{state.errors.capacity}</p>}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/teacher/courses"
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Course
        </button>
      </div>
    </form>
  );
}
