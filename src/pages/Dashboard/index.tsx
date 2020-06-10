import React from 'react';

import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="github explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <li>
          <a href="to-do">
            <img
              src="https://avatars1.githubusercontent.com/u/18218319?s=460&u=f79fc531013cafd44e76b14ec393ebdbbeefe3a5&v=4"
              alt="Guilherme Moraers"
            />
            <div>
              <strong>GoBarber-Backend</strong>
              <p>{}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        </li>
        <li>
          <a href="to-do">
            <img
              src="https://avatars1.githubusercontent.com/u/18218319?s=460&u=f79fc531013cafd44e76b14ec393ebdbbeefe3a5&v=4"
              alt="Guilherme Moraers"
            />
            <div>
              <strong>GoBarber-Backend</strong>
              <p>{}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        </li>
        <li>
          <a href="to-do">
            <img
              src="https://avatars1.githubusercontent.com/u/18218319?s=460&u=f79fc531013cafd44e76b14ec393ebdbbeefe3a5&v=4"
              alt="Guilherme Moraers"
            />
            <div>
              <strong>GoBarber-Backend</strong>
              <p>{}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        </li>
      </Repositories>
    </>
  );
};
export default Dashboard;
