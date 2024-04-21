// Importações de pacotes externos
import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

// Importações de componentes internos
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/InfoModal';
import MyList from '@/components/MyList'; // Ajuste o caminho conforme necessário

// Importações de hooks personalizados
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import useInfoModalStore from '@/hooks/useInfoModalStore';

// Esta função é executada no servidor antes da página ser renderizada
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // Redireciona para a página de autenticação se o usuário não estiver logado
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

// Componente principal da página
const Home = () => {
  // Obtenha os filmes e favoritos usando os hooks personalizados
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModalStore();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MyList data={favorites} />
      </div>
    </>
  )
}

export default Home; // Exporta o componente Home como padrão
