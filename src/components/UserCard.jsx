import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} width="100" />
      <h2>{user.name || user.login}</h2>
      <p>Репозитории: {user.public_repos}</p>
      <p>Создан: {new Date(user.created_at).toLocaleDateString()}</p>
      <p>Подписчики: {user.followers}</p>
      <p>Подписок: {user.following}</p>
      <button onClick={() => window.open(user.html_url, '_blank')}>Посетить</button>
    </div>
  );
};

export default UserCard;
