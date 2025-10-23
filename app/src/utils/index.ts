function getRandomLanguage() {
  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "Ruby",
    "Go",
    "C++",
    "PHP",
    "Swift",
  ];

  return languages[Math.floor(Math.random() * languages.length)];
}

export function generateRandomRepo() {
  const repo = {
    id: Math.floor(Math.random() * 10000),
    name: `repo-${Math.random().toString(36).substring(7)}`,
    description: `Descrição ${Math.random().toString(36).substring(7)}`,
    stargazers_count: Math.floor(Math.random() * 1000),
    html_url: `https://github.com/user/repo-${Math.random()
      .toString(36)
      .substring(7)}`,
    owner: {
      login: `user-${Math.random().toString(36).substring(7)}`,
      id: Math.floor(Math.random() * 10000),
    },
    language: getRandomLanguage(),
    updated_at: new Date().toISOString(),
  };

  return repo;
}
