export type GitHubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  company: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  updated_at: string;
  owner: {
    login: string;
    id: number;
  };
};
