import { useMutation, useQueryClient } from '@tanstack/react-query'

import { FormValues } from '@/app/service-board/_containers/PostForm'

import { repoIssues } from '.'

export const useUpdateRepoIssueMutation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormValues) => repoIssues.api.updateRepoIssue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssues.key.all })
    },
  })
}

export const useCreateRepoIssuesMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: repoIssues.api.createRepoIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssues.key.all })
    },
  })
}

export const useDeleteRepoIssueMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: repoIssues.api.deleteRepoIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssues.key.all })
    },
  })
}
