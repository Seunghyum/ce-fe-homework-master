import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { FormValues } from '@/app/service-board/_containers/PostForm'
import octokit from '@/lib/octokit'

const PREFIX = 'repoIssues'

export const repoIssuesKey = {
  all: [PREFIX],
  list: (page: number, search?: string) => [PREFIX, page, search],
  detail: (id: string) => [PREFIX, 'detail', id],
}

interface RepoIssuesParams {
  search?: string
  page: number
  per_page?: number
}

export const fetchRepoIssues = async ({ page, per_page = 10, search }: RepoIssuesParams) => {
  let query = `repo:${process.env.NEXT_PUBLIC_OWNER}/${process.env.NEXT_PUBLIC_REPO} is:issue state:open`
  if (search) query += ` in:title ${search}`
  const response = await octokit.request('GET /search/issues', {
    q: query,
    page,
    per_page,
  })

  return {
    data: response.data.items as unknown as Issue[],
    total_pages: Math.ceil(response.data.total_count / per_page),
  }
}

export const fetchRepoIssueById = async (id: string) => {
  const response = await octokit.rest.issues.get({
    owner: process.env.NEXT_PUBLIC_OWNER ?? '',
    repo: process.env.NEXT_PUBLIC_REPO ?? '',
    issue_number: parseInt(id),
  })
  return response.data
}

export const deleteRepoIssue = async (id: string) => {
  const response = await octokit.rest.issues.update({
    owner: process.env.NEXT_PUBLIC_OWNER ?? '',
    repo: process.env.NEXT_PUBLIC_REPO ?? '',
    issue_number: parseInt(id),
    state: 'closed',
  })

  return response.data
}

export const createRepoIssue = async (data: FormValues) => {
  const response = await octokit.rest.issues.create({
    owner: process.env.NEXT_PUBLIC_OWNER ?? '',
    repo: process.env.NEXT_PUBLIC_REPO ?? '',
    title: data.title,
    body: data.content,
  })

  return response.data
}

export const updateRepoIssue = async (id: string, data: FormValues) => {
  const response = await octokit.request(`PATCH /repos/{owner}/{repo}/issues/{issue_number}`, {
    owner: process.env.NEXT_PUBLIC_OWNER ?? '',
    repo: process.env.NEXT_PUBLIC_REPO ?? '',
    issue_number: parseInt(id),
    title: data.title,
    body: data.content,
  })
  return response.data
}

export const useUpdateRepoIssueMutation = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormValues) => updateRepoIssue(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssuesKey.all })
    },
  })
}

export const useCreateRepoIssuesMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createRepoIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssuesKey.all })
    },
  })
}

export const useDeleteRepoIssueMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteRepoIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: repoIssuesKey.all })
    },
  })
}

export const useRepoIssuesQuery = ({ page, per_page, search }: RepoIssuesParams) => {
  return useQuery({
    queryKey: repoIssuesKey.list(page, search),
    queryFn: () => fetchRepoIssues({ page, per_page, search }),
  })
}

export const useRepoIssueByIdQuery = (id: string) => {
  return useQuery({
    queryKey: repoIssuesKey.detail(id),
    queryFn: () => fetchRepoIssueById(id),
  })
}

export interface RepoIssuesResponse {
  url: string
  status: number
  headers: Headers
  data: Data
}

export interface Data {
  total_count: number
  incomplete_results: boolean
  items: Issue[]
}

export interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  locked: boolean
  assignee: null
  milestone: null
  comments: number
  created_at: Date
  updated_at: Date
  closed_at: null
  active_lock_reason: null
  sub_issues_summary: SubIssuesSummary
  body: string
  reactions: Reactions
  timeline_url: string
  performed_via_github_app: null
  state_reason: null
  score: number
}

export interface Reactions {
  url: string
  total_count: number
  '+1': number
  '-1': number
  laugh: number
  hooray: number
  confused: number
  heart: number
  rocket: number
  eyes: number
}

export interface SubIssuesSummary {
  total: number
  completed: number
  percent_completed: number
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  user_view_type: string
  site_admin: boolean
}
