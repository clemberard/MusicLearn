import { UsersTable } from "@/app/ui/admin/usertable";
import Navbar from "@/app/ui/layout/navbar";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      
      <h1 className="text-3xl font-semibold">Users</h1>
      <UsersTable />
    </>
  );
}