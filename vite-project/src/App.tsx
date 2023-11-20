import './index.scss';
import React, { useEffect, useState } from 'react';
import keyboard from './Data'
import KeyboardPage from './KeyboardPage';
import { wordArray } from './Data';
import rop from './assets/rop.svg'
import { thoughts } from './Data';
import {motion} from 'framer-motion'

function App() {

  type wordType = {
    word : string,
    isShow : boolean,
    error : boolean
  }

  const [keyobard, setkeyboard] = useState<string[]>(keyboard)
  const [started, setstart] = useState<Boolean>(false)
  const [CurrentWord, setCurrentWord] = useState<wordType[]>([])
  const [mistakes, setmistakes] = useState<number>(0)
  const[fail, setfail] = useState<boolean>(false)
  const [finish, setfinish] = useState<boolean>(false)

  const Start = () => {
    setstart(true)
    const randomNumber : number = Math.floor(Math.random() * wordArray.length)
    const selectedWord : string = wordArray[randomNumber]
    const mappedWord : wordType[] = selectedWord.split('').map((word) =>({
      word, 
      isShow : false,
      error : false,
    }) )
    setCurrentWord(mappedWord)
    setmistakes(0)
    setfail(false)
    setfinish(false)
  }

  const Type = (key: string) => {
    let foundMatch = false;
  
    for (let i = 0; i <= CurrentWord.length; i++) {
      if (key.toLowerCase() === CurrentWord[i]?.word) {
        setCurrentWord((prevWord) => {
          const updatedWord = [...prevWord];
          updatedWord[i].isShow = true;
          return updatedWord;
        });
        foundMatch = true;
      }
    }
    if (!foundMatch) {
      setmistakes((prevMistakes) => prevMistakes + 1);
    }
  };

  useEffect(() => {
    if(mistakes == 6 ){
      setfail(true)
      setCurrentWord(prevWord => {
        return prevWord.map(word => ({
          ...word,
          error: true,
        }));
      });
    }
  },[mistakes])

  useEffect(() => {
    let Current = 0;
  
    for (let i = 0; i < CurrentWord.length; i++) {
      if (CurrentWord[i].isShow === true) {
        Current = Current + 1;
      }
    }
    if(Current == CurrentWord.length && started == true){
      setfinish(true)
    }
  }, [Type]);

  return (
    started ? ( 
    <div className="container">
      { (fail || finish) && (<motion.div initial={{opacity : 0, top : -2000}} animate={{opacity : 1, top : 0}} transition={{duration : .5, delay : .7}} id='overlay'>
        <motion.div id='modul' initial={{scale : 0, opacity : 0}} animate={{scale : 1,opacity : 1}} transition={{delay : 1.4, duration : .6, type : "spring"}}> 
        {fail && <h2>Current Word was <h1>{CurrentWord.map(wordObj => wordObj.word).join('')}</h1></h2>}
        {finish && <h2>You are right, the Word was <h1>{CurrentWord.map(wordObj => wordObj.word).join('')}</h1></h2>}
        <button onClick={() => Start()}>Try Again</button>
        </motion.div>
      </motion.div>)}
      <div className="concept">
        <motion.div 
        initial={{scale : 0}} 
        animate={{scale : 1}} 
        transition={{duration : .7, type : "spring", delay : .8, damping : 7 }} 
        className="thoughts">
          <h2>{thoughts[mistakes]}</h2>
        </motion.div>
        <motion.img initial={{scale : 0, opacity : 0}} animate={{opacity : 1, scale : 1}} transition={{delay : .2, duration : .4}} src={rop} alt="" />
      </div>
      <div className="words">
          {CurrentWord.map((word, i) => (
            <>
            <motion.div key={i} initial={{width : 0,}} animate={{width : "6%"}} transition={{delay : 0.12 * i, duration : .7, type : "spring"}} id={word.error ? "Red_Line" : finish == true ? "correct_line" :  "Line"}> <motion.p initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : .7, delay : .5}} id={word.error ? "errored_txt" : ""}>{word.isShow ? word.word : word.error ? word.word : ""}</motion.p> </motion.div>
            </>
          ))}
      </div>
      <KeyboardPage data={keyobard} func={Type}/>
  </div>
  ) : (
    <div className="starting_page">
      <h1>Guess the Word</h1>
      <button onClick={() => Start()}>Start</button>
    </div>
  )
  
  );
}

export default App;

