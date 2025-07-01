import octokit from "@/lib/octokit";
import { useQuery } from "@tanstack/react-query";

const { NEXT_PUBLIC_OWNER, NEXT_PUBLIC_REPO } = process.env;

const PREFIX = "repoIssues";

export const repoIssuesKey = {
  list: (page: number) => [PREFIX, page],
};

interface RepoIssuesParams {
  page: number;
  per_page?: number;
}

export const fetchRepoIssues = async ({
  page,
  per_page = 10,
}: RepoIssuesParams) => {
  const response = (await octokit.request(
    `GET /repos/${NEXT_PUBLIC_OWNER}/${NEXT_PUBLIC_REPO}/issues`,
    { per_page, page }
  )) as RepoIssuesResponse;

  return response.data;
};

export const useRepoIssuesQuery = ({ page, per_page }: RepoIssuesParams) => {
  return useQuery({
    queryKey: repoIssuesKey.list(page),
    queryFn: () => fetchRepoIssues({ page, per_page }),
  });
};

export interface RepoIssuesResponse {
  url: string;
  status: number;
  data: Datum[];
}

export interface Datum {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: any[];
  state: string;
  locked: boolean;
  assignee: null;
  assignees: any[];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: string;
  active_lock_reason: null;
  sub_issues_summary: SubIssuesSummary;
  body: null | string;
  closed_by: null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null;
}

export interface Reactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface SubIssuesSummary {
  total: number;
  completed: number;
  percent_completed: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}
