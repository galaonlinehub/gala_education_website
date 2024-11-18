
import StudentMain from "@/src/components/student/StudentMain";
import "../globals.css";

export default function RootLayout({ children}) {
  

  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col`}>
       <StudentMain>
        {children}
       </StudentMain>
      </body>
    </html>
  );
}