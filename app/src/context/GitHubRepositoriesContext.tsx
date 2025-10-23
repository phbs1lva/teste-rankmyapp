"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Repository } from "../domain/GitHub";

interface GitHubRepositoriesState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
}

type GitHubRepositoriesAction =
  | { type: "SET_REPOSITORIES"; payload: Repository[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_STATE" };

const initialState: GitHubRepositoriesState = {
  repositories: [],
  loading: false,
  error: null,
};

const githubReducer = (
  state: GitHubRepositoriesState,
  action: GitHubRepositoriesAction
): GitHubRepositoriesState => {
  switch (action.type) {
    case "SET_REPOSITORIES":
      return { ...state, repositories: action.payload, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, repositories: [] };
    case "CLEAR_STATE":
      return initialState;
    default:
      return state;
  }
};

const GitHubRepositoriesContext = createContext<{
  state: GitHubRepositoriesState;
  dispatch: React.Dispatch<GitHubRepositoriesAction>;
} | null>(null);

export function GitHubRepositoriesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubRepositoriesContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubRepositoriesContext.Provider>
  );
}

export function useGitHubRepositoriesContext() {
  const context = useContext(GitHubRepositoriesContext);

  if (!context) {
    throw new Error("useGitHubRepositoriesContext must be used within a GitHubProvider");
  }
  return context;
}
