import { fetchRepoIssues, repoIssuesKey } from "@/query/repoIssues";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BoardList from "@/app/service-board/_containers/BoardList";
import ToolBar from "./_containers/ToolBar";
import SubHeader from "@/layout/SubHeader";

export default async function ServiceBoardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.list(1),
    queryFn: () => fetchRepoIssues({ page: 1 }),
  });

  return (
    <SubHeader title="서비스 게시판">
      <ToolBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BoardList />
      </HydrationBoundary>
    </SubHeader>
  );
}
