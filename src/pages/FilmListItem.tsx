import { IFilm } from '../api/dataTypes';
import { Link as RouterLink } from 'react-router-dom';
import { Link, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface FilmListItemProps {
  film: IFilm;
}

export function FilmListItem({ film }: FilmListItemProps) {
  return (
    <Link component={RouterLink} to={`./${film.url.split('/').at(-2)}`}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText
            primary={`Ep. ${film.episode_id}: ${film.title} (${new Date(
              Date.parse(film.release_date),
            ).getFullYear()})`}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default FilmListItem;
