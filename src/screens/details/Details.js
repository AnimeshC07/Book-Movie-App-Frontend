import React, { useEffect, useState } from 'react';
import './Details.css';
import Header from '../../common/header/Header';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import StarBorderIcon from "@material-ui/icons/StarBorder";
// import { styled } from '@mui/material/styles';
// import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
import ReactStars from "react-rating-stars-component";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'left',
        color: theme.palette.text.secondary,
    },
    rootStyle: {
        display: "flex",
        flexDirection: "column",

        "& > * + *": {
            marginTop: theme.spacing.unit,
        }
    },
    emptyStar: {
        color: "white"
    }
});

function Details(props) {
    const { classes } = props;
    const back = '<';
    const spanBold = { fontWeight: 'bold' };
    const [tileData, settileData] = useState({});
    const [artists , setartists] = useState([]);
    let url = props.baseUrl + '/movies';;
    useEffect(() => { 
        async function fetchPoster() {
            const url = `/api/v1/movies`;
            const response = await fetch(url);
            if (response.ok) {
                const result = await response.json();
                const data = await result.movies;
                const thisData = await data.filter((movie) => {
                    return movie.id === props.match.params.id;
                })
                thisData[0].trailer_url = thisData[0].trailer_url.replace('watch?v=', 'embed/');
                // thisData[0].release_date = thisData[0].release_date.toDateString();
                thisData[0].genres = thisData[0].genres.join(', ');

                settileData(thisData[0]);
                setartists(thisData[0].artists);
                console.log("first : ", thisData[0]);
            }
        }
        fetchPoster();
    }, []);

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <div>
            <Header baseUrl = {url} id = {props.match.params.id}/>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography className="back-btn" variant="h6" component="h2" gutterBottom>
                    {back} Back to Home
                </Typography>
            </Link>
            <div className={classes.root}>
                <Grid container columns={{ xs: 12 }} spacing={24}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} elevation={0}>
                            <img src={tileData.poster_url} alt={tileData.poster_url} />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper} elevation={0}>
                            <Typography variant="headline" component="h2" gutterBottom>
                                {tileData.title}
                            </Typography>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Genre: </span>
                                <span>
                                    {tileData.genres}
                                </span>
                            </Typography>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Duration: </span><span>{tileData.duration}</span>
                            </Typography>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Release Date: </span><span>{tileData.release_date}</span>
                            </Typography>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Rating: </span><span>{tileData.rating}</span>
                            </Typography>
                            <br/>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Plot: </span>
                                <a href={tileData.wiki_url}>(Wiki Link)</a>
                                <span>{tileData.storyline}</span>
                            </Typography><br/>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Trailer: </span>
                            </Typography>
                            <div className="video-responsive">
                                <iframe
                                    width="853"
                                    height="480"
                                    src={tileData.trailer_url}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="trailer"
                                />
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} elevation={0}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Rate this Movie : </span>
                            </Typography>
                            <div className={classes.rootStyle}>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<StarBorderIcon fontSize="inherit" className={classes.emptyStar}></StarBorderIcon>}
                                    // halfIcon={<StarBorderIcon fontSize="inherit" className="fa fa-star-half-alt"></StarBorderIcon>}
                                    // fullIcon={<StarBorderIcon fontSize="inherit" className="fa fa-star"></StarBorderIcon>}
                                    activeColor="#ffd700"
                                />
                            </div>
                            <Typography variant="h6" component="h2" gutterBottom>
                                <span style={spanBold}>Artists : </span>
                            </Typography>
                            <GridList cellHeight={350} className={classes.gridList} cols={2}>
                                {artists.map(tile => (
                                    <GridListTile key={tile.id}>
                                            <img src={tile.profile_url} alt={tile.profile_url} />
                                        <GridListTileBar
                                            title={tile.first_name+" "+tile.last_name}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}


Details.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);