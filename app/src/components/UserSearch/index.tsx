"use client";

import React from "react";
import { TextInput } from "../TextInput";
import { getUserDetails, getUserRepos } from "../../services/GitHubService";
import { useGitHubUserContext } from "../../context/GitHubUserContext";
import { useGitHubRepositoriesContext } from "../../context/GitHubRepositoriesContext";

export function UserSearch() {
  const [search, setSearch] = React.useState("");
  const { dispatch: userDispatch } = useGitHubUserContext();
  const { dispatch: reposDispatch } = useGitHubRepositoriesContext();

  async function getUserData(username: string) {
    try {
      userDispatch({ type: "SET_LOADING", payload: true });
      reposDispatch({ type: "SET_LOADING", payload: true });

      const [user, repositories] = await Promise.all([
        getUserDetails(username),
        getUserRepos(username),
      ]);

      userDispatch({ type: "SET_USER", payload: user.data });
      reposDispatch({ type: "SET_REPOSITORIES", payload: repositories.data });
    } catch {
      userDispatch({
        type: "SET_ERROR",
        payload: "Houve um erro ao solicitar as informações do usuário",
      });
    } finally {
      userDispatch({ type: "SET_LOADING", payload: false });
      reposDispatch({ type: "SET_LOADING", payload: false });
    }
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleKeyEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && search.trim()) {
      getUserData(search);
    }
  }

  return (
    <div className="w-full flex items-center gap-2">
      <TextInput
        id="search-input"
        name="search-input"
        placeholder="Digite o nome de usuário aqui"
        onChange={handleSearchChange}
        onKeyDown={handleKeyEnter}
        value={search}
      />
      <button
        onClick={() => getUserData(search)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!search.trim()}
      >
        Buscar
      </button>
    </div>
  );
}
