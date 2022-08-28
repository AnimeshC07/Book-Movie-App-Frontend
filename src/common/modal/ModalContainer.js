import React ,{useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Login from './Login';
import Register from './Register';

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }

export default function container(props){
    
    const [value, setValue] = useState(0);

    const handleChange = (event, value) => {
        setValue(value);
      };

    return(
        <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="inherit"
          onChange={handleChange}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {value === 0 && <TabContainer><Login onCloseModal={props.onCloseModal}/></TabContainer>}
        {value === 1 && <TabContainer><Register onCloseModal={props.onCloseModal}/></TabContainer>}
      </Paper>
    );
}