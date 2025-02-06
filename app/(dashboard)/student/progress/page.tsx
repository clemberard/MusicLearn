import {ProgressesTable} from "@/app/ui/student/table";
import {Suspense} from 'react';
import {ProgressesTableSkeleton} from '@/app/ui/skeletons';
import Navbar from "@/app/ui/layout/navbar";

export default function Page() {
    return (
        <>
            <Navbar/>
            <h1 className="text-4xl font-bold text-center mt-4">Progresses</h1>
            <div className="container mx-auto mt-6">
                <Suspense fallback={<ProgressesTableSkeleton />}>
                    <ProgressesTable/>
                </Suspense>
            </div>
        </>
    );
}