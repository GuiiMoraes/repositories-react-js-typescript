import React, { useState, useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import GitHubApi from '../../services/api';

import logoImg from '../../assets/logo.svg';
import OctocatLoading from '../../assets/octocat-loading.svg';

import { Header, RepositoryInfo, Issues, Loading } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  };
  html_url: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repository, setRepository] = useState<Repository | null>(null);
  const [loadingIssue, setLoadingIssue] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const storageRepositories =
      localStorage.getItem('@GitHubExplorer: repositories') || '';

    const parsedRepositories = JSON.parse(storageRepositories);

    const findedRepository = parsedRepositories.find(
      (parsedRepository: Repository) =>
        parsedRepository.full_name === params.repository
    );

    setRepository(findedRepository);
  }, [params.repository]);

  useEffect(() => {
    setLoadingIssue(true);
    try {
      GitHubApi.get(`repos/${params.repository}/issues`).then(response => {
        const responseIssues = response.data.map((responseIssue: Issue) => ({
          id: responseIssue.id,
          title: responseIssue.title,
          user: { login: responseIssue.user.login },
          html_url: responseIssue.html_url,
        }));

        setIssues(responseIssues);
        setLoadingIssue(false);
      });
    } catch {
      setLoadingIssue(false);
    }
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="github explorer" />
        <Link to="/">
          <FiChevronLeft />
          Voltar
        </Link>
      </Header>
      <RepositoryInfo>
        <header>
          <img
            src={repository?.owner.avatar_url}
            alt={repository?.owner.login}
          />
          <div>
            <strong>{repository?.full_name}</strong>
            <p>{repository?.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>{repository?.stargazers_count}</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>{repository?.forks_count}</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>{repository?.open_issues_count}</strong>
            <span>Issues abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        {loadingIssue ? (
          <Loading>
            <img src={OctocatLoading} alt="loading" />
          </Loading>
        ) : (
          issues?.map(issue => (
            <li key={issue.id}>
              <a href={issue.html_url}>
                <div>
                  <strong>{issue.title}</strong>
                  <p>{issue.user.login}</p>
                </div>

                <FiChevronRight size={20} />
              </a>
            </li>
          ))
        )}
      </Issues>
    </>
  );
};

export default Repository;
