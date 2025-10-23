import { RepositoryList } from "./src/components/RepositoryList";
import { UserProfile } from "./src/components/UserProfile";
import { UserSearch } from "./src/components/UserSearch";
import { GitHubRepositoriesProvider } from "./src/context/GitHubRepositoriesContext";
import { GitHubUserProvider } from "./src/context/GitHubUserContext";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-grey-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          GitHub Insights Dashboard
        </h1>
        <GitHubUserProvider>
          <GitHubRepositoriesProvider>
            <UserSearch />
            <UserProfile />
            <RepositoryList />
          </GitHubRepositoriesProvider>
        </GitHubUserProvider>
      </div>
    </div>
  );
}
