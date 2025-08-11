import { VPFooter } from "./components/VPFooter/VPFooter";
import { VPNav } from "./components/VPNav/VPNav";
import { VPSideBar } from "./components/VPSideBar/VPSideBar";

export type LayoutProps = {
  top?: React.ReactNode;
  bottom?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const { top, bottom } = props;
  return (
    <div>
      {top}
      <VPNav></VPNav>
      <VPSideBar></VPSideBar>
      <VPFooter></VPFooter>
      {bottom}
    </div>
  );
};
