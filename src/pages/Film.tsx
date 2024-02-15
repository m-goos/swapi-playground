import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import { IFilm } from '../api/dataTypes';
import CharacterListItem from './CharacterListItem';
import ErrorPage from './ErrorPage';
import Loading from './Loading';

export function FilmPage() {
  const { id } = useParams();

  // API client states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [film, setFilm] = useState<IFilm | null>(null);

  useEffect(() => {
    setIsLoading(true);
    client(`/films/${id}`)
      .then(
        (data) => {
          setFilm(data);
        }, // handle error
        (error) => {
          setIsError(true);
          setIsLoading(false);
          console.error('Error:', error);
        },
      )
      .then(() => setIsLoading(false));
  }, [id]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loading />;

  return film ? (
    <>
      <Typography variant="h4">
        EP. {film?.episode_id} {film?.title} ({film?.release_date})
      </Typography>
      <Typography variant="h6">Directed by {film.director}</Typography>
      <Typography variant="body1">{film?.opening_crawl}</Typography>
      <br />
      <Typography variant="h6">Characters</Typography>
      {film.characters.map((character) => (
        <CharacterListItem characterUrl={character} key={character} />
      ))}
    </>
  ) : (
    <ErrorPage />
  );
}

export default FilmPage;
