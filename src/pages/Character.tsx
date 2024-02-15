import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';
import { ICharacter } from '../api/dataTypes';
import ErrorPage from './ErrorPage';
import Loading from './Loading';

export function Character() {
  const { id } = useParams();

  // API client states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    setIsLoading(true);
    client(`/people/${id}`).then(
      (data) => {
        setCharacter(data);
        setIsLoading(false);
      }, // handle error
      (error) => {
        setIsError(true);
        setIsLoading(false);
        console.error('Error:', error);
      },
    );
  }, [id]);

  if (isError) return <ErrorPage />;
  if (isLoading) return <Loading />;

  return character ? (
    <>
      <Typography variant="h4">{character.name}</Typography>
      <Typography variant="h6">About this character</Typography>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Date of Birth</TableCell>
            <TableCell>{character.birth_year}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Eye Color</TableCell>
            <TableCell>{character.eye_color}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Height</TableCell>
            <TableCell>{character.height}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mass</TableCell>
            <TableCell>{character.mass}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Hair color</TableCell>
            <TableCell>{character.hair_color}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  ) : (
    <ErrorPage />
  );
}

export default Character;
