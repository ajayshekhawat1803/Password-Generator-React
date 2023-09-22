import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [length, setLength] = useState(8);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "1234567890"
    }
    if (charAllowed) {
      str += "~!@#$%^&*"
    }
    // console.log(" bhai chal rha h")
    for (let i = 1; i <= length; i++) {
      // console.log(str.charAt(Math.floor(Math.random()* str.length + 1)));
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass)
    // console.log(pass);
  }, [numAllowed, charAllowed, length, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [numAllowed, charAllowed, length])
  const passRef = useRef(null)
  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passRef.current.select();
    // console.log(passRef.current)
  }

  return (
    <>
      <div className=' max-w-xl bg-slate-400 mx-auto my-5 p-5 rounded-lg'>
        <h1 className=' text-center mb-7 text-4xl font-extrabold text-red-600'>Password Generator</h1>
        <div className='input-cont flex w-full  mb-5'>
          <input type='text' className='  px-4 flex-1 py-2 rounded-md outline-none border-none ' readOnly value={password} ref={passRef}/>
          <button className='px-4 rounded-md bg-blue-500' onClick={copyPassword} >Copy</button>
        </div>
        <div className=' flex items-center justify-around w-full py-2 text-lg font-semibold'>
          <div>
            <input type='range' id='range' className=' mx-3  ' value={length} min="5" max="20" onChange={(e) => {
              setLength(e.target.value)
            }} />
            <label htmlFor="range" className='  font-semibold'>Length: {length}</label>
          </div>
          <div>
            <input type='checkbox' id='numbers' className='ml-4 mr-1 w-4 h-4 cursor-pointer' onChange={(e) => {
              // console.log(prev.target.checked);
              setNumAllowed(e.target.checked)
            }} />
            <label htmlFor="numbers" className='cursor-pointer'>Numbers</label>
          </div>
          <div>
            <input type='checkbox' id='char' className='ml-4 mr-1 w-4 h-4 cursor-pointer' onChange={(e) => {
              // console.log(prev.target.checked);
              setcharAllowed(e.target.checked)
            }} />
            <label htmlFor="char" className='cursor-pointer'>Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
