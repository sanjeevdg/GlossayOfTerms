import * as React from 'react';
import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
//import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Grid from '@mui/material/Grid';
//import Paper from '@mui/material/Paper';
//import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
//import FormGroup from '@mui/material/FormGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';

import MyDrawer from './MyDrawer';
import MyAppbar from './MyAppbar';
import Copyright from './Copyright';

import { useLocation } from "react-router-dom";

import TextField from '@mui/material/TextField';


const mdTheme = createTheme();

export default function EditTerm(props) {

  const location = useLocation();
let navigate = useNavigate();


const [frmnm, setFrmNm] = useState('');
const [dspnm, setDspNm] = useState('');
const [isLoading,setIsLoading] = useState(false);
const [snkb, setSnkb] = useState(false);

const tid = location.state.termid;

useEffect(() => {

async function getTermById() {
const body = {
   "termid": tid, 
};



var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm

try{
  fetch(`https://glossary-of-terms.herokuapp.com/getTermById`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {
    alert(JSON.stringify(data.myterm[0]));
    setFrmNm(data.myterm[0].term);
    alert('set term '+data.myterm[0].term);
    setDspNm(data.myterm[0].termdesc);
  })

})
} catch(e) { alert('caught err'+e.message); }



}

getTermById();



},[])


async function EditGlossaryTerm() {
const body = {
  "termid": tid,
   "term": frmnm, 
   "termdesc": dspnm, 
};



var formBody = [];
for (var key in body) {
   var encodedKey = encodeURIComponent(key);
   var encodedValue = encodeURIComponent(body[key]);
   formBody.push(encodedKey + '=' + encodedValue);
}
formBody = formBody.join('&');
// curl -d "formname=test1&displayname=est1" -X POST https://710d-2409-4060-1e-b158-1d34-fc03-ff6d-1ef2.ngrok.io/createNewForm

try{
  fetch(`https://glossary-of-terms.herokuapp.com/editGlossaryTerm`, {
   method: 'POST', 
   headers: {
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
   
}).then((resp) => {
  resp.json().then((data) => {setIsLoading(false);alert(JSON.stringify(data));setSnkb(true);navigate('/my-terms');})

  

})
} catch(e) { alert('caught err'+e.message); }



}

 // alert('formid='+ JSON.stringify(location.state.formid));
 // alert('formid22='+ JSON.stringify(location));
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <MyAppbar hdrtit="Edit term"/>

        <MyDrawer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
  <Card variant="outlined">
  <CardContent>
  <Typography variant="h5" component="h2" gutterBottom>
          Edit term
        </Typography>
        <Divider/>


   <TextField
          id="outlined-helperText"
          label="Please fill in a term"
          onChange={(e) => setFrmNm(e.target.value)}
          value={frmnm}
          helperText={frmnm === "" ? "Field cannot be empty!" : " "}
          variant="standard"
          error={frmnm === ""}
          autoFocus
          style={{width:500}}
        />
        <div style={{height:25}}/>
 <TextField
          id="standard-helperText"
          onChange={(e) => setDspNm(e.target.value)}
          label="Please fill in description"
          value={dspnm}
          error={dspnm === ""}
          multiline={true}           
          rows={8}
          helperText={dspnm === "" ? "Field cannot be empty!" : " "}
          variant="standard"
          style={{width:500,marginBottom:20,marginTop:20}}
        />
          

 
  </CardContent>
  <CardActions style={{alignSelf:'space-between'}}>
  <Button style={{marginLeft:100,marginTop:20,alignSelf:'flex-end'}} onClick={() => {setIsLoading(true);EditGlossaryTerm();}} variant="outlined">Edit Term {isLoading && <CircularProgress color="success" />}</Button>
  </CardActions>
  </Card>
{/* </div> */}

<Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        open={snkb}
        autoHideDuration={5000}
        onClose={()=> setSnkb(false)}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={()=> setSnkb(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
       <Alert onClose={() => setSnkb(false)} severity="success" sx={{ width: '100%' }}>
Spunky form creation success!
        </Alert>
        </Snackbar>


            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}



