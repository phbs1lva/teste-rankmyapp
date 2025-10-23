import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { RepositoryList } from ".";
import { GitHubRepositoriesProvider } from "../../context/GitHubRepositoriesContext";
import { GitHubUser, Repository } from "../../domain/GitHub";
import { GitHubUserProvider } from "../../context/GitHubUserContext";
import { HttpClient } from "../../configuration/HttpConfiguration";
import { UserProfile } from "../UserProfile";
import AxiosMockAdapter from "axios-mock-adapter";
import { UserSearch } from "../UserSearch";

const axiosMock = new AxiosMockAdapter(HttpClient);

describe("RepositoryList", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should show new repository after 30 seconds", async () => {
    const mockUser = {
      login: "testuser",
      name: "Test User",
      avatar_url: "https://test.com/avatar.jpg",
      public_repos: 10,
      followers: 20,
      following: 30,
    };

    const mockRepos: Repository[] = [
      {
        id: 1,
        name: "Repo 1",
        html_url: "",
        description: "Test repository 1",
        stargazers_count: 5,
        language: "JavaScript",
        owner: {
          id: 1,
          login: "testuser",
        },
        updated_at: "2024-01-01T00:00:00Z",
      },
    ];

    axiosMock.onGet(`/users/${mockUser.login}`).reply(200, mockUser);
    axiosMock.onGet(`/users/${mockUser.login}/repos`).reply(200, mockRepos);

    render(
      <GitHubUserProvider>
        <GitHubRepositoriesProvider>
          <UserSearch />
          <UserProfile />
          <RepositoryList />
        </GitHubRepositoriesProvider>
      </GitHubUserProvider>
    );

    const input = screen.getByPlaceholderText("Digite o nome de usuário aqui");
    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(button);

    await waitFor(() => {
      const user = screen.getByText("Test User");
      const repos = screen.getAllByTestId(/repository-item-/);

      expect(user).toBeVisible();
      expect(repos).toHaveLength(1);
    });

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    jest.useRealTimers();

    await waitFor(() => {
      const repos = screen.getAllByTestId(/repository-item-/);
      expect(repos).toHaveLength(2);
    });
  });
});
