import SubHeader from "@/layout/SubHeader";
import { fetchRepoIssueById, repoIssuesKey } from "@/query/repoIssues";
import { QueryClient } from "@tanstack/react-query";
import PostDetail from "./_containers/PostDetail";

export default async function IssueDetailPage({
  params: { issueId },
}: {
  params: { issueId: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.detail(issueId),
    queryFn: () => fetchRepoIssueById(issueId),
  });
  return (
    <SubHeader title="서비스 게시판">
      <PostDetail issueId={issueId} />
    </SubHeader>
  );
}
