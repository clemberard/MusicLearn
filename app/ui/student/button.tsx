"use client";

import {enrollStudent} from "@/app/lib/actions";

interface EnrollmentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    userId: string; // Add userId prop
    courseId: string; // Add courseId prop
}

export function EnrollmentButton({ userId, courseId }: EnrollmentButtonProps) {
    const handleClick = () => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("courseId", courseId);
        enrollStudent({}, formData);
    };

    return (
        <button
            onClick={handleClick}
            className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
            Enrollment
        </button>
    );
}
    