import { Octokit } from 'octokit'

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_PAT,
})

export default octokit
