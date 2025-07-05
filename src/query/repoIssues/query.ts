import { useSuspenseQuery } from '@tanstack/react-query'

import { RepoIssuesParams } from './api'

import { repoIssues } from '.'

export const useRepoIssuesQuery = ({ page, per_page, search }: RepoIssuesParams) => {
  return useSuspenseQuery({
    queryKey: repoIssues.key.list(page, search),
    queryFn: () => repoIssues.api.fetchRepoIssues({ page, per_page, search }),
  })
}

export const useRepoIssueByIdQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: repoIssues.key.detail(id),
    queryFn: () => repoIssues.api.fetchRepoIssueById(id),
  })
}
