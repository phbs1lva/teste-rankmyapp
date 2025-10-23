import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserSearch } from ".";
import { GitHubUserProvider } from "../../context/GitHubUserContext";
import { UserProfile } from "../UserProfile";
import { GitHubRepositoriesProvider } from "../../context/GitHubRepositoriesContext";
import AxiosMockAdapter from "axios-mock-adapter";
import { HttpClient } from "../../configuration/HttpConfiguration";
import { Repository } from "../../domain/GitHub";
import { RepositoryList } from "../RepositoryList";

const axiosMock = new AxiosMockAdapter(HttpClient);

describe("UserSearch", () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  it("should render the user info and the repos properly", async () => {
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
      const repos = screen.getAllByTestId(/repository-item-/)

      expect(user).toBeVisible();
      expect(repos).toHaveLength(1);
    });
  });

  it("should handle the exception properly", async () => {
    const mockUser = "notfounduser";

    axiosMock.onGet(`/users/${mockUser}`).reply(404);

    render(
      <GitHubUserProvider>
        <GitHubRepositoriesProvider>
          <UserSearch />
          <UserProfile />
        </GitHubRepositoriesProvider>
      </GitHubUserProvider>
    );

    const input = screen.getByPlaceholderText("Digite o nome de usuário aqui");
    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "testuser" } });
    fireEvent.click(button);

    await waitFor(() => {
      const feedback = screen.getByText("Erro: Houve um erro ao solicitar as informações do usuário");
      expect(feedback).toBeVisible();
    });
  });
});
