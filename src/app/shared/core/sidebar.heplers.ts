import AppReduxStore from "../redux/store";
import {
  setPagesTree,
  toggleSidebar as toggleSidebarAction,
} from "../redux/slices/sidebarSlice";
import { PageNode } from "../routes/routes";

export const setPagesTreeToStore = ({
  pagesTree,
}: {
  pagesTree: PageNode[];
}) => {
  AppReduxStore.dispatch(setPagesTree(pagesTree));
};

export const getPagesTree = (): PageNode[] => {
  const state = AppReduxStore.getState();
  return state.withoutPersist.sidebar.pagesTree ?? [];
};

export const toggleSidebar = (isOpen: boolean) => {
  AppReduxStore.dispatch(toggleSidebarAction(isOpen));
};

export const getSidebarStatus = (): boolean => {
  const state = AppReduxStore.getState();
  return state.withoutPersist.sidebar.isSidebarOpen ?? false;
};
