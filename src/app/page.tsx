import { Octokit } from "octokit";

const { NEXT_PUBLIC_OWNER, NEXT_PUBLIC_REPO } = process.env;

export default async function Home() {
  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_PAT,
  });

  const response = await octokit.request(
    `GET /repos/${NEXT_PUBLIC_OWNER}/${NEXT_PUBLIC_REPO}/issues`
  );
  console.log(response);

  return <h1 className="text-3xl">헬로 월드</h1>;
}
