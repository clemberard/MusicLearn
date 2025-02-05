"use client";
import Link from "next/link";
//import { Button } from "@/app/ui/button";
import { createInvoice, State } from "@/app/lib/actions";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input id="title" name="title" type="number" step="0.01" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
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
              <input id="description" name="description" type="number" step="0.01" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
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
              <input id="instrument" name="instrument" type="number" step="0.01" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
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
              <input id="level" name="level" type="number" step="0.01" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
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
              <input id="schedule" name="schedule" type="number" step="0.01" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
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
              <input id="capacity" name="capacity" type="number" step="0.01" placeholder="Enter USD amount" className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500" required />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
