import * as React from 'react';
import {useState} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
//import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MyDrawer from './MyDrawer';
import MyAppbar from './MyAppbar';
import Copyright from './Copyright';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';






export default function CreateNewTerm() {

const mdTheme = createTheme();

const [frmnm, setFrmNm] = useState('');
const [dspnm, setDspNm] = useState('');
const [isLoading,setIsLoading] = useState(false);
const [snkb, setSnkb] = useState(false);
let navigate = useNavigate();

async function CreateTerm() {


  
const body = {
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
  fetch(`https://glossary-of-terms.herokuapp.com/addGlossaryTerm`, {
   method: 'POST', 
   headers: {
		'Access-Control-Allow-Origin':'http://localhost:3000',
        'Content-Type': 'application/x-www-form-urlencoded',              
      },  
   body: formBody,
}).then((resp) => {
  resp.json().then((data) => {setIsLoading(false);alert(JSON.stringify(data));setSnkb(true);navigate('/my-terms');})

  

})
} catch(e) { alert('caught err'+e.message); }



};





  return (
 		
<ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <MyAppbar hdrtit="Create a new term"/>

        <MyDrawer />


 <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ my: 4, marginTop:7,alignItems:'center',justifyContent:'center' }} >



<Card variant="outlined">
  <CardContent>
 

        <Typography variant="h5" component="h2" gutterBottom>
          Create a new Term
        </Typography>
        <Divider/>

   <TextField
          id="outlined-helperText"
          label="Please enter term"
          onChange={(e) => setFrmNm(e.target.value)}
          value={frmnm}
          helperText={frmnm === "" ? "Field cannot be empty!" : " "}
          variant="standard"
           error={frmnm === ""}
          style={{width:500}}
        />
        <div style={{height:25}}/>
 <TextField
          id="standard-helperText"
          onChange={(e) => setDspNm(e.target.value)}
          label="Enter description text"
          value={dspnm}
          multiline={true}
           error={dspnm === ""}
          rows={8}
        helperText={dspnm === "" ? "Field cannot be empty!" : " "}
          variant="standard"
          style={{width:500}}
        />
          
 
  </CardContent>
  <CardActions style={{alignSelf:'space-between'}}>
  <Button style={{marginLeft:100,marginTop:20,alignSelf:'flex-end'}} onClick={() => {setIsLoading(true);CreateTerm();}} variant="outlined">Create Term {isLoading && <CircularProgress color="success" />}</Button>
  </CardActions>
  </Card>


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
Glossary term create success!
        </Alert>
        </Snackbar>

        <Copyright style={{marginTop:400}}/>
      </Box>
    </Container>

</Box>
    </ThemeProvider>

  );
}
