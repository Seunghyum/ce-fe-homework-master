export const PATH = {
  HOME: "/",
  SERVICE_BOARD: "/service-board",
  SERVICE_BOARD_CREATE: "/service-board/create",
  SERVICE_BOARD_EDIT: "/service-board/[issueId]/edit",
};

type PathValues<T> = T extends string
  ? T
  : { [K in keyof T]: PathValues<T[K]> }[keyof T];

export type AllPaths = PathValues<typeof PATH>;
