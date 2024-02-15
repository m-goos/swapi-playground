import { Typography, TextField, InputAdornment, List } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import Loading from './Loading';
import client from '../api/client';
import { IFilm, SearchResults } from '../api/dataTypes';
import NoSearchResults from './NoSearchResults';
import FilmListItem from './FilmListItem';

export function Films() {
  const [searchParams, setSearchParams] = useSearchParams({ search: '' });

  // API client states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResults<IFilm> | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e?.target.value });
  };
  useEffect(() => {
    client(`/films/?search=${searchParams.get('search')}`)
      .then(
        (data) => {
          setIsLoading(true);
          setSearchResult(data);
        }, // handle error
        (error) => {
          setIsError(true);
          setIsLoading(false);
          console.error('Error:', error);
        },
      )
      .then(() => setIsLoading(false));
  }, [searchParams]);

  return (
    <>
      <TextField
        fullWidth
        placeholder="  Search movies..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
        onChange={handleSearch}
      />
      <Typography variant="h5">Results</Typography>
      {isError ? (
        <ErrorPage />
      ) : isLoading ? (
        <Loading />
      ) : searchResult ? (
        searchResult.results.length === 0 ? (
          <NoSearchResults />
        ) : (
          <>
            <List disablePadding>
              {searchResult.results.map((film) => (
                <FilmListItem film={film} key={film.title} />
              ))}
            </List>
          </>
        )
      ) : (
        <NoSearchResults />
      )}
    </>
  );
}

export default Films;
