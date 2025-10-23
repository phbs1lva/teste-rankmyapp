import { HttpClient } from "../configuration/HttpConfiguration";
import { GitHubUser, Repository } from "../domain/GitHub";

type GetUserDetailsResponse = GitHubUser;

type GetUserReposResponse = Repository[];

export async function getUserDetails(username: string) {
  return HttpClient.get<GetUserDetailsResponse>(`/users/${username}`);
}

export async function getUserRepos(username: string) {
  return HttpClient.get<GetUserReposResponse>(`/users/${username}/repos`);
}
