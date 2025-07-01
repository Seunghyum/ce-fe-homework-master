import { fetchRepoIssues, repoIssuesKey } from "@/query/repoIssues";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BoardList from "@/app/service-board/_containers/BoardList";
import ToolBar from "./_containers/ToolBar";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.list(1),
    queryFn: () => fetchRepoIssues({ page: 1 }),
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">서비스 게시판</h1>
      <ToolBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BoardList />
      </HydrationBoundary>
    </>
  );
}
