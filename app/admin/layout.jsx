import AdminMain from "@/src/components/admin/AdminMain";

export default function AdminLayout({ children }) {
  return (
        <AdminMain>
          {children}
        </AdminMain>);
}
