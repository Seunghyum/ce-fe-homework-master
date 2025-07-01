"use client";

import { VIEW_TYPE } from "@/constants/viewType";

import BoardTable from "./BoardTable";
import BoardCardList from "./BoardCardList";
import { useViewTypeStore } from "./useViewTypeStore";

export default function BoardView() {
  const viewType = useViewTypeStore((state) => state.viewType);
  console.log(viewType);
  return viewType === VIEW_TYPE.LIST ? <BoardTable /> : <BoardCardList />;
}
