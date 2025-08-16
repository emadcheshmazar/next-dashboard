"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/app/shared/redux/store";

export const useSideBar = () => {
  const isSideBarOpen = useSelector(
    (state: RootState) => state.withoutPersist.sidebar.isSidebarOpen
  );
  return {
    isSideBarOpen,
  };
};
