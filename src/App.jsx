import './App.css'
import { useState, useCallback, useEffect, useRef } from 'react'
import bgImage from './assets/bg.png';

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumber] = useState(false)
  const [caracterAllowed, setCaracter] = useState(false)
  const [password, setPassword] = useState('')

  const inputRef =useRef(null)

const passwordGenerator = useCallback(() =>{
  let pass='';
  let stri='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  if (numberAllowed) stri +='0123456789';
  if (caracterAllowed) stri +='!@#$%^&*()_+<>{}[]';
  
  for (let i=1; i<=length; i++){
    let char = Math.floor(Math.random()*stri.length + 1);
    pass += stri.charAt(char);
  }
  setPassword(pass);
}, [length, numberAllowed, caracterAllowed])

const copypassToClipboard = useCallback(() =>{
  inputRef.current?.select();
  window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordGenerator()
}, [length, numberAllowed, caracterAllowed, passwordGenerator])

  return (
    <>
    <div
  className="w-full h-screen flex justify-center items-center"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
  >
    <div className='w-full max-w-md mx-auto shadow-md p-8 my-8 bg-gray-800 text-orange-500'>
    <h1 className='text-white text-center'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input
      type='text'
      value={password}
      className='outline-none w-full bg-white text-black py-1 px-3'
      placeholder='Password'
      readOnly
      ref={inputRef}
      />
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-yellow-600'
      onClick= {copypassToClipboard}
      >Copy
      </button>
    </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type='range'
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='number'
            onChange={() => {
              setNumber((prev) => !prev)
            }}
            />
            <label htmlFor='numberAllowed'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
            type='checkbox'
            defaultChecked={caracterAllowed}
            id='caracter'
            onChange={() => {
              setCaracter((prev) => !prev)
            }}
            />
            <label htmlFor='caracterAllowed'>Character</label>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default App
