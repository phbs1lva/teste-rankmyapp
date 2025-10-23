"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { GitHubUser } from "../domain/GitHub";

interface GitHubUserState {
  user: GitHubUser | null;
  loading: boolean;
  error: string | null;
}

type GitHubUserAction =
  | { type: "SET_USER"; payload: GitHubUser }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_STATE" };

const initialState: GitHubUserState = {
  user: null,
  loading: false,
  error: null,
};

const githubReducer = (
  state: GitHubUserState,
  action: GitHubUserAction
): GitHubUserState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, error: null };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, user: null };
    case "CLEAR_STATE":
      return initialState;
    default:
      return state;
  }
};

const GitHubUserContext = createContext<{
  state: GitHubUserState;
  dispatch: React.Dispatch<GitHubUserAction>;
} | null>(null);

export function GitHubUserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GitHubUserContext.Provider value={{ state, dispatch }}>
      {children}
    </GitHubUserContext.Provider>
  );
}

export function useGitHubUserContext() {
  const context = useContext(GitHubUserContext);

  if (!context) {
    throw new Error("useGitHubUserContext must be used within a GitHubProvider");
  }
  return context;
}
