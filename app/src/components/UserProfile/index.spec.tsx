import { render, screen } from "@testing-library/react";
import { UserProfile } from ".";
import { GitHubUserContext } from "../../context/GitHubUserContext";
import { GitHubUser } from "../../domain/GitHub";

describe("<UserProfile />", () => {
  const defaultContext = {
    state: {
      user: null,
      loading: false,
      error: null,
    },
    dispatch: () => {},
  };

  it("should render a feedback given something wrong happened", () => {
    render(
      <GitHubUserContext.Provider
        value={{
          ...defaultContext,
          state: {
            user: null,
            loading: false,
            error: "Erro ao buscar usuário",
          },
        }}
      >
        <UserProfile />
      </GitHubUserContext.Provider>
    );

    expect(
      screen.getByText("Erro: Erro ao buscar usuário")
    ).toBeInTheDocument();
  });

  it("should render a loading feedback", () => {
    render(
      <GitHubUserContext.Provider
        value={{
          ...defaultContext,
          state: {
            user: null,
            loading: true,
            error: null,
          },
        }}
      >
        <UserProfile />
      </GitHubUserContext.Provider>
    );

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("should render user profile", () => {
    const mockUser: GitHubUser = {
      name: "John Doe",
      login: "johndoe",
      avatar_url: "https://avatar.url",
      public_repos: 10,
      followers: 20,
      following: 30,
      id: 1,
      html_url: "http://url.url",
      company: "company",
      bio: "bio",
    };

    render(
      <GitHubUserContext.Provider
        value={{
          ...defaultContext,
          state: {
            user: mockUser,
            loading: false,
            error: null,
          },
        }}
      >
        <UserProfile />
      </GitHubUserContext.Provider>
    );

    expect(screen.getByText(mockUser.name)).toBeVisible();
    expect(screen.getByText(`@${mockUser.login}`)).toBeVisible();
    expect(
      screen.getByText(`${mockUser.public_repos} repositórios`)
    ).toBeVisible();
    expect(screen.getByText(`${mockUser.followers} seguidores`)).toBeVisible();
    expect(screen.getByAltText(mockUser.name)).toBeVisible();
  });
});
