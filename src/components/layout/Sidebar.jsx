import {sideBarItems} from "@/src/utils/data/utils";

const Sidebar = () => {
  return ( <aside className="flex flex-col items-start justify-center gap-3 py-8 pl-12 text-[#49454F] text-[16px] font-black">
      {
          sideBarItems.map((item,i) => (
              <div className="flex justify-center items-center leading-[30px] gap-3" key={i}>
                  <i>{item.icon}</i>
                  <span>{item.name}</span>
              </div>
          ))
      }
    </aside>)
}

export default Sidebar;
