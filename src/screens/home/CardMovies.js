import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 'auto',
    height: 'auto',
  },
});

function CardMovies(props) {
  const { classes } = props;
  const [tileData, settileData] = useState([]);
  const [movies, setmovies] = useState([]);

  useEffect(() => {
    async function fetchPoster() {
      const response = await fetch("/api/v1/movies");
      const result = await response.json();

      const data = result.movies;
      setmovies(data);
      settileData(data);
    }
    fetchPoster();
  }, []);

  function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex], 10);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  useEffect(() => {
    settileData(movies);
  }, [props.handler]);

  useEffect(() => {
    const filters = props.filters;
    if (filters.movie_name !== "" || filters.genre.length > 0 || filters.artist.length > 0 || filters.start_date !== "" || filters.end_date !== "") {
      let data = [];
      if (filters.movie_name !== "") {
        data = movies.filter((movie) => {
          return movie.title.toLowerCase().includes(filters.movie_name.toLowerCase());
        })
      }
      if (filters.genre.length > 0) {
        let temp = data.length > 0 ? data : movies;
        temp.forEach((movie) => {
          if (movie.genres !== null) {
            let genreData = movie.genres.filter((gen) => {
              return gen.includes(...filters.genre);
            });
            if(genreData.length > 0)
              data.push(movie);
          }
        })
      }
      if (filters.artist.length > 0) {
        let temp = data.length > 0 ? data : movies;
        temp.forEach((movie) => {
          if (movie.artists !== null) {
            let artistData = movie.artists.filter((art) => {
              let fullname = art.first_name + " " + art.last_name;
              return fullname.includes(...filters.artist);
            });
            if(artistData.length > 0)
              data.push(movie);
          }
        })
      }
      if (filters.start_date !== "") {
        let temp = data.length > 0 ? data : movies;
        data = temp.filter((movie) => {
          const rel_date = stringToDate(movie.release_date, "yyyy-mm-dd", "-");
          const start_date = stringToDate(filters.start_date, "yyyy-mm-dd", "-");
          return rel_date > start_date;
        })
      }
      if (filters.end_date !== "") {
        let temp = data.length > 0 ? data : movies;
        data = temp.filter((movie) => {
          const rel_date = stringToDate(movie.release_date, "yyyy-mm-dd", "-");
          const end_date = stringToDate(filters.end_date, "yyyy-mm-dd", "-");
          return end_date > rel_date;
        })
      }
      if(data.length > 0)
         settileData(data);
      else{
        alert('No matching results found');
      }
    }

    else {
      settileData(movies);
    }
  }, [props.filters]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} className={classes.gridList} cols={tileData.length < 4 && tileData.length > 0? tileData.length : 4}>
        {tileData.map(tile => (
          <GridListTile key={tile.id}>
            <Link to={`/movie/${tile.id}`}>
              <img src={tile.poster_url} alt={tile.poster_url} />
            </Link>
            <GridListTileBar
              title={tile.title}
              subtitle={<span>Release Date : {tile.release_date}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

CardMovies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardMovies);
