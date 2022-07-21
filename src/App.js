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
  const [inputValue, setInputValue] = useState("");
  const [roomId, setRoomId] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(0);
  const [username, setUsername] = useState("");


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

    return (
      <div className='NewGameMenuDiv'>
        <Button className='NewGameMenuRoomNumberButton' variant="secondary" style={{ marginTop: 100 }} >
          <p className='NewGameMenuRoomNumberButtonText'>{roomId}</p>
        </Button>
        <br></br>
        <Button variant='dark' className='NewGameMenuRoomShareButton'>
          <p className='NewGameMenuRoomShareButtonText'>SHARE</p>

        </Button>
        <br></br>
        <br></br>
        {isUsernameSet == 0 &&
          <form>
            <input type="text" name="name" className="question" id="nme" required autoComplete="off" onChange={(e) => setUsername(this.e)} />
            <label htmlFor="nme"><span>What's your name?</span></label>
            <Button variant='dark' className='NewGameMenuRoomShareButton' onClick={() => [setIsUsernameSet(1)]}>
              <p className='NewGameMenuRoomShareButtonText'>Enter</p>
            </Button>
          </form>
        }
        {isUsernameSet == 1 &&
          <h2 className='WaitingPlayerText'>Waiting other player!</h2>
        }

      </div>
    )
  }
  function GameScreen() {
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
                <div>
                  <input
                    id="new-todo"
                    value={inputValue}
                    placeholder="Enter Your Guess"
                    className='NumpadInput'
                  />
                </div>
                <Button variant="outline-success">0</Button>
                <Button variant="outline-success">1</Button>
                <Button variant="outline-success">2</Button>
                <Button variant="outline-success">3</Button>
                <Button variant="outline-success">4</Button>
                <Button variant="outline-success">5</Button>
                <Button variant="outline-success">6</Button>
                <Button variant="outline-success">7</Button>
                <Button variant="outline-success">8</Button>
                <Button variant="outline-success">9</Button>
                <Button variant="outline-success">DEL</Button>
                <Button variant="outline-success">OK</Button>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    )
  }




  if (page == 0) {
    return <MainMenu />;
  }
  else if (page == 1) {
    if (isUserCame == 0) {
      return (

        <NewGameMenu />

      )
    }
    else if (isUserCame == 1) {
      return (
        <GameScreen />)
    }
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
