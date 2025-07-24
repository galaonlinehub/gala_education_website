import {  getStudent, getStudents } from "@/src/features/admin";
import { useQuery } from "@tanstack/react-query";

export const useStudents = (page)=>{
    return useQuery({
        queryKey: ["students",page],
        queryFn: ()=>getStudents(page),
    });

}

export const useStudent = (studentId)=>{
    return useQuery({
        queryKey:['student'],
        queryFn:()=>getStudent(studentId)
    })
}