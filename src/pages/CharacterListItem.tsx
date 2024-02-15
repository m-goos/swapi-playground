import { Link as RouterLink } from 'react-router-dom';
import { Link, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import client from '../api/client';
import ErrorPage from './ErrorPage';
import Loading from './Loading';
import { ICharacter } from '../api/dataTypes';

interface CharacterListItemProps {
  characterUrl: string; // this is the character id
}

export function CharacterListItem({ characterUrl }: CharacterListItemProps) {
  const id = characterUrl.split('/').at(-2);

  // API client states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    setIsLoading(true);
    client(`/people/${id}`)
      .then(
        (data) => {
          setCharacter(data);
        }, // handle error
        (error) => {
          setIsError(true);
          // setIsLoading(false);
          console.error('Error:', error);
        },
      )
      .then(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loading />;

  return (
    <Link component={RouterLink} to={`../characters/${id}`}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={`${character?.name}`} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default CharacterListItem;
