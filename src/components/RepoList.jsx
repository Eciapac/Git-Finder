import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div className="repo-list">
      {repos.map((repo) => (
        <div key={repo.id} className="repo-card">
          <h3>{repo.name}</h3>
          <p>Кол-во звёзд: {repo.stargazers_count}</p>
          <p>Дата добавления: {new Date(repo.created_at).toLocaleDateString()}</p>
          <button onClick={() => window.open(repo.html_url, '_blank')}>
            Посетить
          </button>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
