import { VPSideBarGroup } from "../VPSideBarGroup/VPSideBarGroup";
import "./VPSideBar.css";

export const VPSideBar = () => {
  return (
    <aside className="VPSiderbar">
      <div className="curtain"></div>
      <nav className="nav">
        <span className="visually-hidden" id="sidebar-aria-label">
          Sidebar Navigation
        </span>

        <VPSideBarGroup></VPSideBarGroup>
      </nav>
    </aside>
  );
};
