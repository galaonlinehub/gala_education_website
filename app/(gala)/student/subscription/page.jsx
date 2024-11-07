import Link from "next/link";
import React from "react";

const StudentSubscription = () => {
  const subjects = [
    { name: "English Grade 1", classSize: 10, days: 30 },
    { name: "Mathematics Grade 7", classSize: 10, days: 30 },
    { name: "Physics Form 1", classSize: 10, days: 30 },
    { name: "Chemistry Form 4", classSize: 10, days: 30 },
  ];

  return (
    <div className="flex flex-col px-12 w-full">
      <div className="flex flex-col">
        <div className="flex justify-between md:flex-row flex-col items-center">
          <span className="font-bold self-center">Subscription Management System</span>
          <div className="flex flex-col md:flex-row mt-2 gap-4">
            <select name="" id="" className="p-2 text-xs border border-blue-500">
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
            <button className="p-2 bg-[#030DFE] text-white font-bold text-xs">+ Add Subscription</button>
          </div>
        </div>
        <div className="flex mt-6 justify-between gap-4  items-center flex-wrap">
          <div className="p-4 rounded bg-[#001840] text-xs text-white h-36 w-full sm:w-72">
            <div className="font-semibold">6</div>
            <div className="font-semibold">Active subscriptions</div>
            <div className="py-3">Manage all active subscriptions efficiently. Click below to view all subscriptions.</div>
            <Link href="#" className="text-blue-600 font-semibold">
              See all subscriptions
            </Link>
          </div>
          <div className="p-4 rounded bg-[#001840] text-xs text-white h-36 w-full sm:w-72">
            <div className="font-semibold">10</div>
            <div className="font-semibold">Expired subscriptions</div>
            <div className="py-3">Expired subscriptions need attention. Renew or remove to avoid disruptions.</div>
            <Link href="#" className="text-blue-600 font-semibold">
              See all subscriptions
            </Link>
          </div>
          <div className="p-4 rounded bg-[#001840] text-xs text-white h-36 w-full sm:w-72">
            <div className="font-semibold">1</div>
            <div className="font-semibold">Upcoming renewals</div>
            <div className="py-3">Prepare for renewals to avoid interruptions. Renew subscriptions on time</div>
            <Link href="#" className="text-blue-600 font-semibold">
              See all subscriptions
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-2 justify-between  mt-8 mb-4 items-center">
          <span className="font-bold">All Subscriptions</span>
          <div className="flex gap-4">
            <button className="p-2 border border-black font-bold text-xs">+ Add Reminder</button>
          </div>
        </div>
        <div>
          <div className="w-full overflow-x-auto">
            <div className="flex flex-col gap-3 min-w-[600px]">
              <div className="bg-blue-950 w-full flex justify-between items-center font-bold text-xs text-white rounded-md p-2">
                {["Name", "Billing", "Renewal Date", "Cost", "Payment", "Status"].map((header, index) => (
                  <span key={index} className="w-1/6 text-center py-2">
                    {header}
                  </span>
                ))}
              </div>
              {["Gala subscription", "Gala subscription", "Gala subscription", "Gala subscription"].map((name, index) => (
                <div key={index} className="border-2 border-blue-600 flex items-center justify-between font-bold text-xs rounded-md w-full p-2">
                  <span className="w-1/6 text-center py-2">{name}</span>
                  <span className="w-1/6 text-center py-2">Monthly</span>
                  <span className="w-1/6 text-center py-2">June 3, 2024</span>
                  <span className="w-1/6 text-center py-2">10,000/=</span>
                  <span className="w-1/6 text-center py-2">Mobile</span>
                  <button className={`w-1/6 text-center py-2 px-4 rounded-md font-bold ${index === 0 ? "bg-red-500 text-white" : "bg-green-300 text-white"}`}>{index === 0 ? "Renew" : "Active"}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubscription;
