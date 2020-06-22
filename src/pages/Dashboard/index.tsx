import React, { useState, ChangeEvent, FormEvent } from 'react';

import { FiChevronRight } from 'react-icons/fi';
import GitHubApi from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, ErrorMessage, Repositories } from './styles';

interface Repository {
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string;
}

const Dashboard: React.FC = () => {
  const [typedRepo, setTypedRepo] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setTypedRepo(event.target.value);
  }

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!typedRepo) {
      return setInputError("O campo 'nome do repositório' não pode ser vazio");
    }

    try {
      const response = await GitHubApi.get(`repos/${typedRepo}`);

      const newRepository = response.data;

      setTypedRepo('');
      setInputError('');
      return setRepositories([...repositories, newRepository]);
    } catch {
      return setInputError('Erro ao buscar esse repositório, tente novamente');
    }
  }

  return (
    <>
      <img src={logoImg} alt="github explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o nome do repositório"
          onChange={handleChangeInput}
          value={typedRepo}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <ErrorMessage>{inputError}</ErrorMessage>}

      <Repositories>
        {repositories.map(repository => (
          <li key={repository.full_name}>
            <a href="to-do">
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
              </div>

              <FiChevronRight size={20} />
            </a>
          </li>
        ))}
      </Repositories>
    </>
  );
};
export default Dashboard;
