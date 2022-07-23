import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { render } from '@testing-library/react';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  orderBy,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion
} from "firebase/firestore";

function App() {



  const firebaseConfig = {

    apiKey: "AIzaSyB1US-p2dQhsFo3U0Tqw7G8gyHRUUigCho",

    authDomain: "numbergameweb.firebaseapp.com",

    projectId: "numbergameweb",

    storageBucket: "numbergameweb.appspot.com",

    messagingSenderId: "353660061959",

    appId: "1:353660061959:web:b7de6117ecb199f26a9da2",

    measurementId: "G-7GGR3J2X3M"

  };



  const app = initializeApp(firebaseConfig);


  const db = getFirestore(app);

  const roomColRef = collection(db, 'rooms')



  const [page, setPage] = useState(0);
  const [isUserCame, setIsUserCame] = useState(0);
  // const [inputValue, setInputValue] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(0);
  const [username, setUsername] = useState("");
  const [isGuessSet, setIsGuessSet] = useState(0);

  function MainMenu() {
    return (
      <div className='MainMenuDiv'>
        <h1 className='MainMenuTitle'>Welcome to Number Game!</h1>
        <Button className='MainMenuButton' variant="dark" style={{ marginTop: 100 }} onClick={() => [setPage(1), createRoom()]}>
          <p className='MainMenuButtonText'>New Game</p>
        </Button>
        <br></br>
        <Button className='MainMenuButton' variant="dark" style={{ marginTop: 10 }} onClick={() => setPage(2)}>
          <p className='MainMenuButtonText'>Join Game</p>
        </Button>
      </div>
    )
  }
  function NewGameMenu() {
    const [username, setUsername] = useState("");
    const [isCopied, setIsCopied] = useState(false);
    
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.executeCommand('copy', true, text);
      }
    }
    const handleCopyClick = () => {
     
      copyTextToClipboard(roomId)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
  
    }

  


    return (
      <div className='NewGameMenuDiv'>
        <Button   className='NewGameMenuRoomNumberButton' variant="secondary" style={{ marginTop: 100 }} >
          <p value={roomId} className='NewGameMenuRoomNumberButtonText'>{roomId}</p>
        </Button>
        <br></br>
        <Button variant='dark'  onClick={handleCopyClick}className='NewGameMenuRoomShareButton' >
        
          <p className='NewGameMenuRoomShareButtonText'>{isCopied ? 'Copied!' : 'Share'}</p>

        </Button>
        <br></br>
        <br></br>
     
        
        {/* {isUsernameSet == 0 && */}
          <form>
            <input 
            // type="text" 
            // name="name"
            // className='JoinMenuDiv'
            // id="nme"
            required autoComplete="off" 
            placeholder="Enter Your Name"
            value={username}
            
            onChange={(e) => setUsername(e.target.value)}/>
            <Button variant='dark'  className='EnterBtn' onClick={() => [setIsUsernameSet(1)]}>
              <p className='EnterBtnText'> Enter </p>
            </Button>
          </form>
        {/* } */}
        {isUsernameSet == 1 &&
          <h2 className='WaitingPlayerText'>Waiting other player! + {username}</h2>
          // <GameScreen />
        }

      </div>
    )
  }
  function GameScreen() {
    const [inputValue, setInputValue] = useState('');
    // const [items, setItems] = useState([]);

    // numpad functions
    function handleClick(e){
      if (inputValue.startsWith(0)=== true){
        //problem
        alert("the secret code cannot start with 0 ");
        setInputValue('');
        return;
      }
      setInputValue(inputValue + e.target.value);
    }
    function delBtn(){
      setInputValue(inputValue.substring(0, inputValue.length - 1));
    }
    function handleChange(e){
      
      setInputValue(e.target.value);
      if (isNaN(inputValue)==true){
        setInputValue('');
        alert("just number!");
        return;
      }
      if (inputValue.startsWith(0)=== true){
        //problem
        alert("the secret code cannot start with 0 ");
        setInputValue('');
        return;
      }
      for ( var i=0;i<inputValue.length; i++){
        if ( inputValue[i] == inputValue[i+1]){
          //problem!!
          setInputValue('');
          alert("each digits must be different ");
          return ;
        }
      }
    }
    return (
      <div className='GameScreenDiv'>
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <Row>
                <Col >
                  <p className='GameScreenUsername'>{username}</p>
                  <p className='SecretNumber'>****</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>

                </Col>
                <Col>
                  <p className='GameScreenUsername' >rivalusername</p>
                  <p className='SecretNumber'>1453</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                  <p className='GuessNumber'>{guessnumber(4)}   {plusminus()}</p>
                </Col>
              </Row>
 
              <div className='NumpadDiv'>
                  <Button variant="outline-success" value = {0} onClick={handleClick}>0</Button>
                  <Button variant="outline-success" value = {1} onClick={handleClick}>1</Button>
                  <Button variant="outline-success" value = {2} onClick={handleClick}>2</Button>
                  <Button variant="outline-success" value = {3} onClick={handleClick}>3</Button>
                  <Button variant="outline-success" value = {4} onClick={handleClick}>4</Button>
                  <Button variant="outline-success" value = {5} onClick={handleClick}>5</Button>
                  <Button variant="outline-success" value = {6} onClick={handleClick}>6</Button>
                  <Button variant="outline-success" value = {7} onClick={handleClick}>7</Button>
                  <Button variant="outline-success" value = {8} onClick={handleClick}>8</Button>
                  <Button variant="outline-success" value = {9} onClick={handleClick}>9</Button>
                  <Button variant="outline-success" onClick={delBtn}> DEL</Button>   
              </div>  
              <form >
                  <input
                  onChange={handleChange}
                  value={inputValue}
                  placeholder="Enter Your Guess"
                  />
                  <Button variant="outline-success" onClick={() => [setIsGuessSet(1)]}>Enter</Button>
              </form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    )
  }
  function JoinMenu() {
    const[roomCode, setRoomCode] = useState('')
    function isSameRoomCode(){
      if (roomCode == roomId)  {
        setPage(3);
         {/* ?? burara rooom id nasıl doğrulanacak??? */}

      }


    }
    

  
 
    return (
      <div className='JoinMenuDiv'>
        
        <form  className="RoomCodeInpt" >
          <Col>
          <label htmlFor='nme'> Username:  ‏‏‎‏‏‎ </label> 
          <br></br>
       


          <input 
            // type="text" 
            // name="name"
            // className="question" 
            id="nme" 
            required autoComplete="off" 
            placeholder="Enter Your Name"
            variant='dark'
          />
          
          </Col>
          <br>
          
          </br>
            
          <Col>
          <label htmlFor='RooCode'> Room Code: </label> 
          <br></br>
         
          <input 
            // type="text" 
            // name="name"
           
            id="RooCode" 
            required autoComplete="off" 
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}/>
           
        
          </Col>
            <br>
            
            </br>
            <Button variant='dark'  className='EnterBtn'   style={{ marginTop: 10 }} onClick={isSameRoomCode}>   {/*buraya onclick için function gelicek ve tıklayınca eğer roomCode = roomid =>  setPage(3) */}
              Join Game 
            </Button>
        </form>
      </div>
    )


  }
    




  if (page == 0) {
    return <MainMenu />;
  }
  else if (page == 1) {
    if (isUserCame == 0) {
      return (
        // <GameScreen />
        <NewGameMenu />

      )
    }
    else if (isUserCame == 1) {
      return (
        <GameScreen />)
    }
  }
  else if (page == 2){
    return(
      <JoinMenu/>
    )
  }
  else if (page == 3){
    return (
      <GameScreen />
    )

  }







  //common functions
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
  function guessnumber(length) {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  function plusminus() {
    var rand = 1 + (Math.random() * (3));
    var result = '';
    var characters = '+-';
    var charactersLength = characters.length;
    for (var i = 0; i < rand; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  function createRoom() {
    var roomId = makeid(5);
    setRoomId(roomId);
    addDoc(roomColRef, {
      created: serverTimestamp(),
      roomId: roomId,
      users: [{ player1: "faruk" }]
    });

  }


}





export default App;
