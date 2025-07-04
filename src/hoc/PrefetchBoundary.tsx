import { dehydrate, HydrationBoundary, QueryClient, UsePrefetchQueryOptions } from '@tanstack/react-query'

type Props = {
  prefetchOptions: UsePrefetchQueryOptions[] | UsePrefetchQueryOptions
  children: React.ReactNode
}

export async function PrefetchBoundary({ prefetchOptions, children }: Props) {
  const queryClient = new QueryClient()

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  Array.isArray(prefetchOptions)
    ? await Promise.all(prefetchOptions.map((prefetchOption) => queryClient.prefetchQuery(prefetchOption)))
    : await queryClient.prefetchQuery(prefetchOptions)

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
