"use client";

import { useEffect } from "react";
import { useGitHubRepositoriesContext } from "../../context/GitHubRepositoriesContext";
import { Repository } from "../../domain/GitHub";
import { StarIcon } from "lucide-react";
import { generateRandomRepo } from "../../utils";
import { useGitHubUserContext } from "../../context/GitHubUserContext";

function useRandomRepositoryInterval() {
  const {
    state: { user },
  } = useGitHubUserContext();

  const {
    dispatch,
    state: { repositories },
  } = useGitHubRepositoriesContext();

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const newRepo = generateRandomRepo();
      dispatch({
        type: "SET_REPOSITORIES",
        payload: [...repositories, newRepo],
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch, repositories, user]);
}

function RepositoryItem({ repo }: { repo: Repository }) {
  return (
    <div
      key={repo.id}
      className="border rounded border-gray-200 dark:border-gray-700 py-2 w-full p-4"
    >
      <div className="flex iems-center justify-between mb-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          {repo.name}
        </a>

        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {repo.language}
        </p>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {repo.description}
      </p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-2">
          <StarIcon className="w-4 h-4 mr-1" />
          {repo.stargazers_count}
        </span>
        <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center mt-2">
          Ultima atualização:{" "}
          {new Date(repo.updated_at).toLocaleDateString("pt-BR")}
        </span>
      </div>
    </div>
  );
}

export function RepositoryList() {
  useRandomRepositoryInterval();
  const {
    state: { repositories },
  } = useGitHubRepositoriesContext();

  if (repositories.length === 0) return;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center flex-col gap-4 mt-4">
      <p className="dark:text-white">Repos</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {repositories.map((repo) => (
          <RepositoryItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
