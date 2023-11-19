import './index.scss';
import React, { useEffect, useState } from 'react';
import keyboard from './Data'
import KeyboardPage from './KeyboardPage';
import { wordArray } from './Data';
import rop from './assets/rop.svg'
import { thoughts } from './Data';

function App() {

  type wordType = {
    word : string,
    isShow : boolean
  }

  const [keyobard, setkeyboard] = useState<string[]>(keyboard)
  const [started, setstart] = useState<Boolean>(false)
  const [CurrentWord, setCurrentWord] = useState<wordType[]>([])
  const [typingWord, setTypingWord] = useState('')
  const [mistakes, setmistakes] = useState<number>(0)
  const[fail, setfail] = useState<boolean>(false)

  const Start = () => {
    setstart(true)
    const randomNumber : number = Math.floor(Math.random() * wordArray.length)
    const selectedWord : string = wordArray[randomNumber]
    const mappedWord : wordType[] = selectedWord.split('').map((word) =>({
      word, 
      isShow : false 
    }) )
    setCurrentWord(mappedWord)
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
        break; 
      }
    }
    if (!foundMatch) {
      setmistakes((prevMistakes) => prevMistakes + 1);
    }
  };

  useEffect(() => {
    console.log(mistakes)
    if(mistakes == 6 ){
      setfail(true)
    }
  },[mistakes])

  return (
    started ? ( 
    <div className="container">
      <div className="concept">
        <div className="thoughts">
          <h2>{thoughts[mistakes]}</h2>
        </div>
        <img src={rop} alt="" />
      </div>
      <div className="words">
          {CurrentWord.map((word) => (
            <>
            <div id='Line'> <p>{word.isShow ? word.word : ""}</p> </div>
            </>
          ))}
      </div>
      <KeyboardPage data={keyobard} func={Type}/>
  </div>
  ) : (<button onClick={() => Start()}>Start</button>)
  
  );
}

export default App;

