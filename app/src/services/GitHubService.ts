import { HttpClient } from "../configuration/HttpConfiguration";
import { GitHubUser } from "../domain/GitHub";

type GetUserDetailsResponse = GitHubUser;

export async function getUserDetails(username: string) {
  return HttpClient.get<GetUserDetailsResponse>(`/users/${username}`);
}

export async function getUserRepos(username: string) {
  return HttpClient.get(`/users/${username}/repos`);
}