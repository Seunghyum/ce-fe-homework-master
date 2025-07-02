export const VIEW_TYPE = {
  LIST: 'list',
  CARD: 'card',
} as const

export type ViewType = (typeof VIEW_TYPE)[keyof typeof VIEW_TYPE]
