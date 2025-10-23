"use client";

import Image from "next/image";
import { useGitHubUserContext } from "../../context/GitHubUserContext";
import { BookOpenIcon, UsersIcon } from "lucide-react";

export function UserProfile() {
  const {
    state: { user, loading, error },
  } = useGitHubUserContext();

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 mt-4">
        <p className="dark:text-white">Erro: {error}</p>
      </div>
    );
  }

  if (user === null && loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 mt-4">
        <p className="dark:text-white">Carregando...</p>
      </div>
    );
  }

  if (user === null) return;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center gap-4 mt-4">
      <div>
        <Image
          width={128}
          height={128}
          src={user.avatar_url}
          alt={user.name}
          className="w-32 h-32 rounded-full"
        />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <p>{user.name || user.login}</p>
          <span className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            @{user.login}
          </span>
        </div>
        <div className="flex flex-row gap-4 mt-2">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold dark:text-white text-sm">
              {user.public_repos} repositórios
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold dark:text-white text-sm">
              {user.followers} seguidores
            </span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="font-semibold dark:text-white text-sm">
              {user.public_repos} seguindo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
