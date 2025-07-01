import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_PAT,
});

export default octokit;

export function getTotalPagesFromLinkHeader(linkHeader: string) {
  if (!linkHeader) {
    return 1;
  }

  let nextPage = null;
  let lastPage = null;
  let prevPage = null;

  const parts = linkHeader.split(",");
  for (const part of parts) {
    const urlMatch = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (urlMatch) {
      const url = new URL(urlMatch[1]);
      const rel = urlMatch[2];
      const pageParam = url.searchParams.get("page");
      if (rel === "next") {
        nextPage = Number(pageParam);
      } else if (rel === "last") {
        lastPage = Number(pageParam);
      } else if (rel === "prev") {
        prevPage = Number(pageParam) + 1;
      }
    }
  }

  if (lastPage) {
    return lastPage;
  } else if (nextPage) {
    return nextPage;
  } else if (prevPage) {
    return prevPage;
  } else {
    return 1;
  }
}
