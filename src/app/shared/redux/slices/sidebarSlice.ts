// Redux slice for Pages
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageNode } from "../../routes/routes";

interface SidebarState {
  pagesTree: PageNode[];
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  pagesTree: [],
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setPagesTree(state, action: PayloadAction<PageNode[]>) {
      state.pagesTree = action.payload;
    },
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setPagesTree, toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
