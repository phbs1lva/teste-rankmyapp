"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { GitHubUser, Repository } from "../domain/GitHub";

interface GitHubState {
  user: GitHubUser | null;
  repositories: Repository[];
  loading: boolean;
  error: string | null;
}

type GitHubAction =
  | { type: "SET_USER"; payload: GitHubUser }
  | { type: "SET_REPOSITORIES"; payload: Repository[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_STATE" };

const initialState: GitHubState = {
  user: null,
  repositories: [],
  loading: false,
  error: null,
};

const githubReducer = (
  state: GitHubState,
  action: GitHubAction
): GitHubState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, error: null };
    case "SET_REPOSITORIES":
      return { ...state, repositories: action.payload, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, user: null, repositories: [] };
    case "CLEAR_STATE":
      return initialState;
    default:
      return state;
  }
};

const GitHubContext = createContext<{
  state: GitHubState;
  dispatch: React.Dispatch<GitHubAction>;
} | null>(null);

export function GitHubProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubContext.Provider>
  );
}

export function useGitHubContext() {
  const context = useContext(GitHubContext);

  if (!context) {
    throw new Error("useGitHubContext must be used within a GitHubProvider");
  }
  return context;
}
