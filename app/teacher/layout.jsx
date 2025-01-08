import TeacherMain from "@/src/components/teacher/TeacherMain";
import "../globals.css";

export default function RootLayout({ children}) {
  

  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col`}>
       <TeacherMain>
        {children}  
       </TeacherMain>
      </body>
    </html>
  );
}