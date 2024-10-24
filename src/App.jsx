import React, { useState } from 'react';
import UserCard from './components/UserCard';
import RepoList from './components/RepoList';

function App() {
  const [username, setUsername] = useState(''); // Имя пользователя для поиска
  const [userData, setUserData] = useState(null); // Данные о пользователе
  const [repos, setRepos] = useState([]); // Репозитории пользователя
  const [sortType, setSortType] = useState(''); // Тип сортировки (имя, звезды, дата)

  // Функция для поиска пользователя
  const searchUser = async (e) => {
    e.preventDefault();
    if (username) {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const user = await userResponse.json();

        if (userResponse.ok) {
          setUserData(user);
          const reposResponse = await fetch(user.repos_url);
          const repos = await reposResponse.json();
          setRepos(repos);
        } else {
          setUserData(null);
          alert('Пользователь не найден');
        }
      } catch (error) {
        console.error('Ошибка запроса данных:', error);
      }
    }
  };

  // Функция для сортировки
  const handleSort = (type) => {
    setSortType(type);

    // Пример сортировки по типу
    let sortedRepos = [...repos];
    if (type === 'name') {
      sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'stars') {
      sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else if (type === 'date') {
      sortedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    setRepos(sortedRepos);
  };

  // Функция для очистки поля ввода
  const clearInput = () => {
    setUsername('');
    setUserData(null);
    setRepos([]);
  };

  return (
    <div className="app-container">
      <h1>GITHUB FINDER</h1>
      <form onSubmit={searchUser} className="search-form">
        <div className="input-container">
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username && (
            <button type="button" className="clear-button" onClick={clearInput}>
              &#x2715;
            </button>
          )}
        </div>
        <button type="submit" className="search-button">НАЙТИ</button>
      </form>

      {/* Карточка пользователя */}
      {userData && (
        <UserCard user={userData} />
      )}

      {/* Сортировка */}
      <div className="sort-buttons">
        <button
          className={sortType === 'name' ? 'active' : ''}
          onClick={() => handleSort('name')}
        >
          ИМЯ
        </button>
        <button
          className={sortType === 'stars' ? 'active' : ''}
          onClick={() => handleSort('stars')}
        >
          ЗВЕЗДЫ
        </button>
        <button
          className={sortType === 'date' ? 'active' : ''}
          onClick={() => handleSort('date')}
        >
          ДАТА
        </button>
      </div>

      {/* Репозитории пользователя */}
      {repos.length > 0 && <RepoList repos={repos} />}
    </div>
  );
}

export default App;
