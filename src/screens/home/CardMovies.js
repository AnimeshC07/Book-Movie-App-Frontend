import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function CardMovies(props) {
  const { classes } = props;
  const [tileData, settileData] = useState([]);

  useEffect(() => {
    async function fetchPoster() {
      const response = await fetch("/api/v1/movies");
      const result = await response.json();

      const data = result.movies;
      // console.log(data);
      settileData(data);
    }
    fetchPoster();
  }, []);

  useEffect(() => {
    console.log(props.filters);
  }, [props.filters]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={350} className={classes.gridList} cols={4}>
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
