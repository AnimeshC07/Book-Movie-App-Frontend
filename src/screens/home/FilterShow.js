import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Typography } from '@material-ui/core';
// import { ListItemText } from '@mui/material';
import Select from '@material-ui/core/Select';
import Checkbox from "@material-ui/core/Checkbox";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
// import CardMovies from './CardMovies';
// import { useNavigate } from 'react-router-dom';

const styles = theme => ({
    card: {
        minWidth: 240,
        margin: 'theme.spacing.unit',
        maxWidth: 240,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
      },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function FilterShow(props) {
    const { classes } = props;
    const [data, setdata] = useState([]);
    const [genres, setgenres] = useState([]);
    const [artists, setartists] = useState([]);

    const initialState = { movie_name: "", genre: [], artist: [], start_date: "", end_date: "" }
    const [filters, setfilters] = useState(initialState);

    // let navigate = useNavigate();

    const onSubmitHandler = async (e) => {

        e.preventDefault();
        // console.log(filters);
        props.resetHandler('reset');
        props.onSubmitHandler(filters);

    }

    useEffect(() => {
        async function fetchPoster() {
            const response = await fetch("/api/v1/movies");
            const result = await response.json();

            const Idata = result.movies;
            setdata(Idata);
        }
        fetchPoster();
        // console.log(data);

    }, []);

    useEffect(() => {
        const genre = new Set();
        const artist = new Set();
        data.forEach(movie => {
            if (movie.genres != null) {
                movie.genres.forEach(el => {
                    genre.add(el);
                });
            }
            if (movie.artists != null) {
                movie.artists.forEach(el => {
                    const fullname = el.first_name + " " + el.last_name;
                    artist.add(fullname);
                });
            }
        });
        setgenres(Array.from(genre));

        setartists(Array.from(artist));
        // console.log(artists);
    }, [data]);

    const handleChange = (event) => {
        let filter = filters;
        filter[event.target.name] = event.target.value;
        setfilters({ ...filter });
    };

    return (
        <Card className={classes.card}>
            <Typography gutterBottom variant="h5" component="h2">
                FIND MOVIES BY:
            </Typography>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={e => onSubmitHandler(e)}>
                <TextField
                    id="movie_name"
                    name="movie_name"
                    label="Movie name"
                    className={classes.textField}
                    value={filters.movie_name}
                    onChange={e => handleChange(e)}
                    margin="normal"
                />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="genre">Genre :</InputLabel>
                    <Select
                        id="genre"
                        multiple
                        name="genre"
                        value={filters.genre}
                        onChange={e => handleChange(e)}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {genres.map(datapoint => (
                            <MenuItem key={datapoint} value={datapoint}>
                                <Checkbox checked={filters.genre.indexOf(datapoint) > -1} />
                                {/* <ListItemText primary={datapoint.genre} /> */}
                                {datapoint}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="artist">Artists :</InputLabel>
                    <Select
                        id="artist"
                        multiple
                        name="artist"
                        value={filters.artist}
                        onChange={e => handleChange(e)}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {artists.map(datapoint => (
                            <MenuItem key={datapoint} value={datapoint}>
                                <Checkbox checked={filters.artist.indexOf(datapoint) > -1} />
                                {/* <ListItemText primary={datapoint.first_name + " " + datapoint.last_name} /> */}
                                {datapoint}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    id="start_date"
                    name="start_date"
                    label="Release Date Start"
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                    value={filters.start_date}
                    onChange={e => handleChange(e)}
                    margin="normal"
                />

                <TextField
                    id="end_date"
                    name="end_date"
                    label="Release Date End"
                    type='date'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    className={classes.textField}
                    value={filters.end_date}
                    onChange={e => handleChange(e)}
                    margin="normal"
                />

                <Button variant="contained" color="primary" size="medium" type="submit" style={{ width: "100px", justifyContent: "center" }}>
                    APPLY
                </Button>
            </form>
        </Card>
    );
}

FilterShow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles ,  { withTheme: true })(FilterShow);