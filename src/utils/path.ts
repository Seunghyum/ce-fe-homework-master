import { AllPaths } from '@/constants/path'
import { Primitive } from '@/types/common'

export function parsePath(path: AllPaths, params: Record<string, Primitive | Primitive[]> = {}) {
  let newPath: string = path
  const unMatched: Record<string, Primitive | Primitive[]> = {}
  // 경로 내의 동적 세그먼트를 실제 값으로 대체합니다.
  Object.entries(params).forEach(([key, value]) => {
    if (newPath.includes(`[${key}]`)) newPath = newPath.replace(`[${key}]`, String(value))
    else unMatched[key] = value
  })
  return newPath
}
