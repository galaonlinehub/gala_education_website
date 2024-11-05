'use client'

import { useState } from "react"
import Image from "next/image"
import ReadMoreContainer from "@/components/layout/ui/ReadMore"
import { Progress } from "antd";
import { Line } from "@ant-design/charts";

export default function Component() {
  const [showSidebar, setShowSidebar] = useState(false)

  const tableItems = [
    {
      subject: "Mathematics",
      file: " Mathematics Report.pdf",
      status: "View",
      members: "10",
      fileSize: "28 MB",
    },
    {
      subject: "Science",
      file: "Science Report.pdf",
      status: "No View",
      members: "10",
      fileSize: "3.5 MB",
    },
    {
      subject: "English",
      file: "English Report.pdf",
      status: "View",
      members: "10",
      fileSize: "15 MB",
    },
  ]

  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ]

  const studentAttendance = [
    {
      image: "/pic1.png",
      name: "Frank Ndagula",
      progress: 90,
    },
    {
      image: "/pic2.png",
      name: "Joseph Shuma",
      progress: 55,
      color: "#ffa500",
    },
    {
      image: "/pic3.png",
      name: "Abdallah Ally",
      progress: 20,
      color: "#4caf50",
    },
    {
      image: "/pic4.png",
      name: "Erick John",
      progress: 75,
      color: "#f5222d",
    },
  ]

  const completedTasks = [
    { name: "Eng - Vocabulary Test", time: "10.06.2024 . Friday" },
    { name: "Eng - Vocabulary Test", time: "14.06.2026 . Wednesday" },
  ]

  const completedLessons = [
    { name: "Math: Introduction to fractions", time: "10.06.2024 . Thursday" },
    { name: "Science: The Water Cycle", time: "14.06.2026 . Tuesday" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-grow">
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Diana Malle!</h2>
                  <ReadMoreContainer />
                </div>
                <div className="flex-shrink-0">
                  <Image
                    className="h-auto w-auto"
                    src="/placeholder.svg"
                    alt="An image of a character sitting on books"
                    width={130}
                    height={130}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="w-full sm:w-1/2 border-2 border-blue-700 rounded-xl p-3">
              <div className="flex justify-between text-xs font-bold mb-2">
                <div>Students Attendance</div>
                <select className="rounded-lg bg-[#0C6667] text-white p-0.5">
                  <option value="">View</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <div className="flex flex-col">
                {studentAttendance.map((item, index) => (
                  <div key={index} className="flex justify-between text-xs items-center p-1">
                    <div className="flex gap-2 items-center">
                      <Image src={item.image} alt={item.name} width={32} height={32} className="w-8 h-8" />
                      <div className="text-[10px]">{item.name}</div>
                    </div>
                    <Progress value={item.progress} className="w-24 sm:w-32 md:w-40" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full sm:w-1/2 border-2 border-blue-700 rounded-xl p-3 mt-3 sm:mt-0">
              <div className="flex justify-between text-xs font-bold mb-2">
                <div>Class Performance</div>
                <select className="rounded-lg bg-[#EA6D67] text-white p-0.5">
                  <option value="Math">Math</option>
                  <option value="English">English</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div className="flex justify-between mt-8 font-bold mb-10 items-center">
                <div>75%</div>
                <div></div>
                <div className="flex flex-col">
                  <span>20%</span>
                  <span>5%</span>
                </div>
              </div>
              <div className="text-xs flex font-bold justify-between p-2">
                <span>Very Good</span>
                <span>Mildly Good</span>
                <span>Bad</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-2 text-left">#</th>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-left">File</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Members</th>
                  <th className="p-2 text-left">File Size</th>
                </tr>
              </thead>
              <tbody>
                {tableItems.map((item, index) => (
                  <tr key={index} className="border-b border-blue-600">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{item.subject}</td>
                    <td className="p-2">{item.file}</td>
                    <td className="p-2">{item.status}</td>
                    <td className="p-2">{item.members}</td>
                    <td className="p-2">{item.fileSize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-[#001840] rounded-lg shadow-md">
            <div className="p-4 sm:p-6">
              <h3 className="text-sm text-white font-bold mb-4">Generate Analytics</h3>
              <form className="space-y-4">
                <div className="text-xs text-white">
                  <label htmlFor="analytics" className="block mb-2 font-semibold text-white">
                    Analytics Type*
                  </label>
                  <select
                    id="analytics"
                    name="analytics"
                    className="mt-1 block w-full bg-[#001840] rounded-md border border-white p-2 text-xs shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">Choose analytics type</option>
                    <option value="Student analytics">Student analytics</option>
                    <option value="Teaching analytics">Teaching analytics</option>
                  </select>
                </div>
                <div className="text-xs text-white">
                  <label htmlFor="subject" className="block mb-2 text-white font-semibold">
                    Subject*
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="mt-1 block w-full bg-[#001840] rounded-md border border-white p-2 text-xs shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option value="">Choose a subject</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
                <div className="text-[10px] text-white italic p-2">
                  &qout;Generate insightful analytics to track student performance and enhance your teaching strategies
                  effortlessly!&quot;.
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="text-[12px] bg-[#001840] border border-white font-semibold text-white px-2 w-32 py-2 rounded-3xl hover:bg-blue-700 transition-colors"
                  >
                    Download/Export
                  </button>
                </div>

                <section className="rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4 text-xs font-bold">
                    <h2 className="text-white">Completed Tasks</h2>
                    <a href="#" className="text-gray-500">
                      See All
                    </a>
                  </div>
                  {completedTasks.map((item, index) => (
                    <div key={index} className="bg-white mb-2 flex justify-between items-center gap-2 rounded-md p-2">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                        <div className="font-semibold">
                          <p className="text-[10px]">{item.name}</p>
                          <p className="text-[8px] text-gray-500">{item.time}</p>
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </div>
                  ))}
                </section>

                <section className="rounded-lg p-4">
                  <div className="flex justify-between items-center text-xs mb-4 font-bold">
                    <h2 className="text-white">Completed Lessons</h2>
                    <a href="#" className="text-gray-500">
                      See All
                    </a>
                  </div>
                  {completedLessons.map((item, index) => (
                    <div key={index} className="bg-white mb-2 flex justify-between items-center gap-2 rounded-md p-2">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                        <div className="font-semibold">
                          <p className="text-[10px]">{item.name}</p>
                          <p className="text-[8px] text-gray-500">{item.time}</p>
                        </div>
                      </div>
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </div>
                  ))}
                </section>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}