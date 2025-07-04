'use client'

import { ReactNode, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { QueryErrorResetBoundary } from '@tanstack/react-query'

import Loading from '@/app/components/Loading'

interface PropsType {
  children: React.ReactNode
  errorFallback?: ReactNode
  suspenseFallback?: ReactNode
}

export default function QueryErrorSuspenseBoundary({
  children,
  errorFallback,
  suspenseFallback: SuspenseFallback,
}: PropsType) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={({ resetErrorBoundary }) => (
            <div className="flex flex-col items-center justify-center">
              <div className="font-bol mb-4 text-2xl">에러가 발생했습니다.</div>
              <div className="flex gap-4">
                <button className="cursor-pointer rounded-md border-1 px-4 py-2" onClick={() => resetErrorBoundary()}>
                  다시 시도하기
                </button>
                {errorFallback}
              </div>
            </div>
          )}
        >
          <Suspense fallback={SuspenseFallback ?? <Loading />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
