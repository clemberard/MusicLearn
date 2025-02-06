'use client'
import Link from "next/link";
import { createCourse, StateCourses } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form({teacherid} : {teacherid:string}) {
  const initialState: StateCourses = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCourse, initialState);

  return (
  <>
    
    <form action={formAction}>
    <input type="hidden" name="teacherid" id="teacherid" value={teacherid} />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="title" name="title" type="text" placeholder="Title" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
              {state.errors?.title && <p className="text-red-500 text-sm">{state.errors.title}</p>}
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="description" name="description" type="text" placeholder="Description" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
              {state.errors?.description && <p className="text-red-500 text-sm">{state.errors.description}</p>}
            </div>
          </div>
        </div>
        {/* instrument */}
        <div className="mb-4">
          <label htmlFor="instrument" className="mb-2 block text-sm font-medium">
            Instrument
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="instrument" name="instrument" type="text" step="0.01" placeholder="Instrument" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
              {state.errors?.instrument && <p className="text-red-500 text-sm">{state.errors.instrument}</p>}
            </div>
          </div>
        </div>
        {/* level */}
        <div className="mb-4">
          <label htmlFor="level" className="mb-2 block text-sm font-medium">
            Level
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="level" name="level" type="text" placeholder="Level" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
              {state.errors?.level && <p className="text-red-500 text-sm">{state.errors.level}</p>}
            </div>
          </div>
        </div>
        {/* Schedule */}
        <div className="mb-4">
          <label htmlFor="schedule" className="mb-2 block text-sm font-medium">
            Schedule
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="schedule" name="schedule" type="text" placeholder="Schedule" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
              {state.errors?.schedule && <p className="text-red-500 text-sm">{state.errors.schedule}</p>}
            </div>
          </div>
        </div>
        {/* Capacity */}
        <div className="mb-4">
          <label htmlFor="capacity" className="mb-2 block text-sm font-medium">
            Capacity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="capacity" name="capacity" type="number" placeholder="capacity" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
              {state.errors?.capacity && <p className="text-red-500 text-sm">{state.errors.capacity}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/teacher/courses" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <button type="submit" className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600">
          Create Course
        </button>
      </div>
    </form>
  </>
  )
}
