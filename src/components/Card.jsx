import { useEffect, useState } from 'react'
import '../styles/Card.css'
import Tilt from 'react-parallax-tilt';

function Card() {
  const [duckImg, setDuckImg] = useState("")
  const [randomNum, setRandomNum] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
  const [gameover, setGameover] = useState(false);
  const [victory, setVictory] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [imgClicked, setImgClicked] = useState({
    img0: false, 
    img1: false, 
    img2: false, 
    img3: false, 
    img4: false, 
    img5: false, 
    img6: false, 
    img7: false, 
    img8: false, 
    img9: false, 
    img10: false, 
    img11: false, 
    img12: false, 
    img13: false, 
    img14: false, 
  });

  function handleChange(key) {
    setImgClicked({ ...imgClicked, [key]: true });
  }

  function handleGameover() {
    setGameover(true);
  }

  function handleVictory() {
    setVictory(true);
  }

  function handleScore() {
    setScore(score+1);
    if ((score+1) > highScore) {
      setHighScore(score+1)
    }
  }
  
  function jumbleNum() {
    let a = [];
    for ( let i = 0; i < 15; ++i) a[i] = i;
    let tmp, cur, tp = a.length;
    if (tp)
 
        // Run until tp becomes 0.
        while (--tp) {
 
            // Generating the random index.
            cur = Math.floor(Math.random() * (tp + 1));
 
            // Getting the index(cur) value in variable(tmp).
            tmp = a[cur];
 
            // Moving the index(tp) value to index(cur).
            a[cur] = a[tp];
 
            // Moving back the tmp value to
            // index(tp), Swapping is done.
            a[tp] = tmp;
        }
    setRandomNum(a)
    console.log(a)
  }
  
  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=15&api_key=live_aBiX1FdE7dF2AtHmv0N8HXm2k7xq1IUH0q9ksilBTXeQQffVRqgbE8bfakMiqypd', {
      mode: 'cors'})
      .then((response) => response.json())
      .then((data) => { setDuckImg(data) })
  }, [ ]);

  function checkVictory() {
    console.log(score)
    if (score === 14) {
      handleVictory();
    }
  }

  function ClickableImage({ imageNumber, imgClicked }) {
    
    return (
      <div>
        <Tilt>
          {(imgClicked) ? 
          <>
            <img src={duckImg[imageNumber].url} alt="Image of a cat" 
            onClick={function() {
              console.log("You Lose")
              handleGameover()
            }}/>
          </> : 
          <>
            <img src={duckImg[imageNumber].url} alt="Image of a cat" 
            onClick={function() {
              handleScore();
              checkVictory();
              handleChange("img"+imageNumber);
              jumbleNum()
              }}/>
          </>
          }
        </Tilt>
      </div>
    )
  }

  function assemble(num) {
    let x = "img" + num;
    return imgClicked[x]
  }

  function PlayAgain() {
    return (
      <button onClick={()=>{
        setGameover(false)
        setVictory(false)
        setScore(0)
        setImgClicked({ 
          img0: false, 
          img1: false, 
          img2: false, 
          img3: false, 
          img4: false, 
          img5: false, 
          img6: false, 
          img7: false, 
          img8: false, 
          img9: false, 
          img10: false, 
          img11: false, 
          img12: false, 
          img13: false, 
          img14: false, });
      }
      }>Play Again</button>
    )
  }

  return (
    <>
      <h1>Highscore: {highScore}</h1>
      <h1>Score: {score}</h1>
      {(duckImg === "") ? <h1>Loading Cats</h1> : 
      (gameover === true) ? <><h1>Game Over</h1> <PlayAgain /></>:
      (victory === true) ? <><h1>You Won!</h1> <PlayAgain /></>:
      <div className='container'>
        <ClickableImage imageNumber = {randomNum[0]} imgClicked={assemble(randomNum[0])}/>
        <ClickableImage imageNumber = {randomNum[1]} imgClicked={assemble(randomNum[1])}/>
        <ClickableImage imageNumber = {randomNum[2]} imgClicked={assemble(randomNum[2])}/>
        <ClickableImage imageNumber = {randomNum[3]} imgClicked={assemble(randomNum[3])}/>
        <ClickableImage imageNumber = {randomNum[4]} imgClicked={assemble(randomNum[4])}/>
        <ClickableImage imageNumber = {randomNum[5]} imgClicked={assemble(randomNum[5])}/>
        <ClickableImage imageNumber = {randomNum[6]} imgClicked={assemble(randomNum[6])}/>
        <ClickableImage imageNumber = {randomNum[7]} imgClicked={assemble(randomNum[7])}/>
        <ClickableImage imageNumber = {randomNum[8]} imgClicked={assemble(randomNum[8])}/>
        <ClickableImage imageNumber = {randomNum[9]} imgClicked={assemble(randomNum[9])}/>
        <ClickableImage imageNumber = {randomNum[10]} imgClicked={assemble(randomNum[10])}/>
        <ClickableImage imageNumber = {randomNum[11]} imgClicked={assemble(randomNum[11])}/>
        <ClickableImage imageNumber = {randomNum[12]} imgClicked={assemble(randomNum[12])}/>
        <ClickableImage imageNumber = {randomNum[13]} imgClicked={assemble(randomNum[13])}/>
        <ClickableImage imageNumber = {randomNum[14]} imgClicked={assemble(randomNum[14])}/>
      </div>}
    </>
  )
}

export default Card