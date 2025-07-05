import { FormValues } from '@/app/service-board/_containers/PostForm'
import octokit from '@/lib/octokit'

import { Issue } from './types'

export interface RepoIssuesParams {
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
