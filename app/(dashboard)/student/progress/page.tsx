import {ProgressesTable} from "@/app/ui/student/table";
import {Suspense} from 'react';
import {CoursesTableSkeleton} from '@/app/ui/skeletons';

export default function Page() {
    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-4">Progresses</h1>
            <div className="container mx-auto mt-6">
                <ProgressesTable/>
            </div>
        </>
    );
}