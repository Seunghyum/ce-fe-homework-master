const SERVICE_BOARD = '/service-board'

export const PATH = {
  HOME: '/',
  SERVICE_BOARD,
  SERVICE_BOARD_DETAIL: `${SERVICE_BOARD}/[issueId]`,
  SERVICE_BOARD_CREATE: `${SERVICE_BOARD}/create`,
  SERVICE_BOARD_EDIT: `${SERVICE_BOARD}/[issueId]/edit`,
}

type PathValues<T> = T extends string ? T : { [K in keyof T]: PathValues<T[K]> }[keyof T]

export type AllPaths = PathValues<typeof PATH>
