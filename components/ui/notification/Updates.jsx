import { Drawer, List, Typography, Badge } from "antd";
import clsx from "clsx";
import { useState } from "react";
import { LuBell, LuBellRing } from "react-icons/lu";

const notifications = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  message: `Update ${index + 1}: ${
    index % 2 === 0 ? "New feature released!" : "Action required."
  }`,
  time: `2025-04-18 10:${index < 10 ? "0" + index : index}:00`,
  unread: index % 3 === 0,
}));

export default function Updates({ children }) {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const updates = [];

  return (
    <>
      <div onClick={showDrawer}>{children}</div>

      <Drawer
        title={
          <div className="flex items-center justify-between">
            <Typography.Text className="font-semibold text-lg text-gray-900">
              Notifications
            </Typography.Text>
            <Typography.Link
              className={clsx(
                "!text-sm",
                updates.length > 0
                  ? "!text-blue-600 hover:!text-blue-800"
                  : "!text-gray-400 !cursor-not-allowed"
              )}
              onClick={() => console.log("Clear All clicked")}
            >
              Clear All
            </Typography.Link>
          </div>
        }
        placement="right"
        width={600}
        onClose={closeDrawer}
        open={open}
        closable={true}
        className="rounded-r-lg"
        styles={{
          header: { background: "#f8fafc", borderBottom: "1px solid #e5e7eb" },
          body: { background: "#ffffff" },
        }}
      >
        {updates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <style>
              {`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
                20%, 40%, 60%, 80% { transform: translateX(2px); }
              }
              .bell-icon {
                animation: shake 0.8s ease-in-out;
              }
              .fade-in {
                animation: fadeIn 0.5s ease-in;
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
            </style>
            <div className="rounded-lg p-8 max-w-sm w-full flex flex-col items-center justify-center">
              <LuBell className="text-7xl text-gray-400 mb-4 bell-icon" />
              <Typography.Text className="text-xl font-semibold text-gray-700 block mb-2 fade-in">
                No notifications yet
              </Typography.Text>
              <Typography.Text className="text-xs md:text-sm text-gray-500 fade-in">
                Your notifications will appear here.
              </Typography.Text>
            </div>
          </div>
        ) : (
          <List
            dataSource={updates}
            renderItem={(item) => (
              <List.Item
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer !px-6 ${
                  item.unread ? "bg-blue-50" : "bg-white"
                }`}
                onClick={() => console.log(`Clicked notification ${item.id}`)}
              >
                <div className="flex items-start space-x-3">
                  <LuBellRing className="text-lg text-blue-600 mt-1" />
                  <div className="flex-1">
                    <Typography.Text
                      className={`text-sm ${
                        item.unread
                          ? "font-medium text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {item.message}
                    </Typography.Text>
                    <Typography.Text className="block text-xs text-gray-500 mt-1">
                      {item.time}
                    </Typography.Text>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Drawer>
    </>
  );
}
