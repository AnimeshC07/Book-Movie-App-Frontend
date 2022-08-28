import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';
// import tileData from './tileData';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
       
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
function ScrollableMovies(props) {
    const { classes } = props;
    const [tileData, settileData] = useState([]);
//     const gridTileStyle= {
//         position: 'relative',
//         float: 'left',
//         minHeight: '250',
//         overflow: 'hidden',
//         height: '100% !important'
//   }

    useEffect(() => {
        async function fetchPoster() {
            const response = await fetch("/api/v1/movies");
            const result = await response.json();

            const data = result.movies;
            //console.log(data);
            settileData(data);
        }
        fetchPoster();
    }, []);
    // style={gridTileStyle}
    return (
        <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList} cols={6}>
                {tileData.map(tile => (
                    <GridListTile key={tile.id}> 
                        <img src={tile.poster_url} alt={tile.poster_url} />
                        <GridListTileBar
                            title={tile.title}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

ScrollableMovies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableMovies);
