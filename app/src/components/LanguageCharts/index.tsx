'use client';

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGitHubRepositoriesContext } from "../../context/GitHubRepositoriesContext";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#FF6B6B",
];

export function LanguageCharts() {
  const {
    state: { repositories },
  } = useGitHubRepositoriesContext();

  if (repositories.length === 0) return;

  const languageStats = repositories.reduce(
    (acc, repo) => {
      if (repo.language) {
        if (!acc[repo.language]) {
          acc[repo.language] = {
            count: 0,
            stars: 0,
          };
        }
        acc[repo.language].count += 1;
        acc[repo.language].stars += repo.stargazers_count;
      }

      return acc;
    },
    {} as Record<
      string,
      {
        count: number;
        stars: number;
      }
    >
  );

  const languageCountData = Object.entries(languageStats)
    .map(([language, data]) => ({
      language,
      count: data.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const languageStarsData = Object.entries(languageStats)
    .map(([language, data]) => ({
      language,
      stars: data.stars,
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 8);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Linguages mais utilizadas
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={languageCountData}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(entry) => `${entry.language}: ${entry.count}`}
            >
              {languageCountData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Total de estrelas por linguagem
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={languageStarsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="language" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="stars" fill="#0088FE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
