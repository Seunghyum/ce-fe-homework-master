import { fetchRepoIssues, repoIssuesKey } from "@/query/repoIssues";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import BoardList from "@/app/service-board/_containers/BoardList";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: repoIssuesKey.list(1),
    queryFn: () => fetchRepoIssues({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BoardList />
    </HydrationBoundary>
  );
}
