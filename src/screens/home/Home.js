import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from "../../common/header/Header";
import FilterShow from './FilterShow';
import ScrollableMovies from './ScrollableMovies';
import CardMovies from './CardMovies';
import './Home.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function Home(props) {
  const { classes } = props;
  const initialState = { movie_name: "", genre: [], artist: [], start_date: "", end_date: "" }
  const [filters, setfilters] = useState(initialState);
  const [handler, sethandler] = useState("");

  const onSubmitHandler = (param)=>{
    setfilters(param);
  }

  const resetHandler = (param) =>{
    sethandler(param);
  }
  // 
  // 
  return (
    <div className={classes.root}>
      <Header baseUrl = {props.baseUrl}/>
      <div className='sub-header'> Upcoming Movies</div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <ScrollableMovies />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper} elevation={0}>
            <CardMovies baseUrl = {props.baseUrl} filters={filters} handler = {handler}/>  
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={0}>
            <FilterShow onSubmitHandler = {onSubmitHandler} resetHandler={resetHandler}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
