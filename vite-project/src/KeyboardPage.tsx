import React from 'react'

type data = {
  data : string[],
  func : (key : string) => void
}

function KeyboardPage( props : data) {
  return (
    <div id='Keyboard'>
      {props.data.map((key) => (
        <div onClick={() => props.func(key)} id={key == "" ? "SpaceKey" : "Key"}><h2>{key}</h2></div>
      ))}
    </div>
  )
}

export default KeyboardPage