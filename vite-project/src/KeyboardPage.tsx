import React from 'react'
import {motion} from 'framer-motion'

type data = {
  data : string[],
  func : (key : string) => void
}

function KeyboardPage( props : data) {
  return (
    <div id='Keyboard'>
      {props.data.map((key, index) => (
        <motion.div 
        initial ={{ opacity : 0, x : -60}}
        animate = {{opacity : 1, x : 0}}
        transition={{duration : .6, delay : 0.04 * index, type : "spring"}}
        whileHover={{scale : 1.2, transition : {type : "spring", stiffness: 700, delay : 0}}}
        whileFocus={{scale : 0.8}}
         onClick={() => props.func(key)} id={key == "" ? "SpaceKey" : "Key"}><motion.h2>{key}</motion.h2></motion.div>
      ))}
    </div>
  )
}

export default KeyboardPage