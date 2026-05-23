import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTodaysChallenge, submitans  } from '../api'
import Editor from "@monaco-editor/react"
function Solve() {

  const { email , problemId  } = useParams()
const [selectd , setSeceleted] = useState("javascript")
  const [problem , setPeoblem] = useState(null)
  const [code , setCode] = useState("")

  const [result , setResult] = useState("")
  const [loading , setLoading] = useState(true)
  const [submiting , setSubmmiting] = useState(false)

  // const email = localStorage.getItem("email")
console.log(email)

  useEffect(() => {
  // console.log(loadProblem())
    loadProblem()
}, []);

  const loadProblem = async () => {
  try {
    const data = await getTodaysChallenge(email);

    const foundproblem = data.problems.find(
      (itm) => itm._id === problemId
    );
console.log(foundproblem)
    setPeoblem(foundproblem);
  // console.log(loadProblem())
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};


const handleSubnmit = async () =>{
  setSubmmiting(true)

  try {
    let capture = ""
    let templatecaprure = {
      log:(val) =>{
        capture = String(val)
      }
    }
    try {
      const script = new Function("console" , code)
      const result = script(templatecaprure)

      if (!capture && result !== undefined) {
        capture = String(result)
      }
    } catch (error) {
      setResult("code error" , error.message)
      setSubmmiting(false)
      return
    }

    const data = await submitans(email , problemId , capture)
    if (data && data.success) {
      setResult(data.correct ? "Correct" : "Incoorect ans")

    }
  } catch (error) {
    const errormsg = error.response?.data?.message || "Server error";
    setResult("Error: " + errormsg);
  }finally{
    setSubmmiting(false)
  }
}

if (loading) {
return  <h4>Loadinngg........</h4>
}

if (!problem) {
  return <h4 className='bg-black text-white min-h-screen flex items-center justify-center'>No problem derive</h4>
}
  return (
  <div className='min-h-screen bg-black text-white grid grid-cols-2'>

{/* left side  */}
<div className='border-r border-zinc-800 p-10'>
<p className='text-zinc-500 text-xs uppercase tracking-[0.3em] mb-4'>
Challange Terminal
</p>

<h2 className='text-4xl font-bold mb-5'>
  {problem.title}
</h2>
<span className="border border-zinc-700 px-3 py-1 text-xs uppercase">
          {problem.difficulty}
        </span>

        <p className="text-zinc-400 mt-8 leading-relaxed">
          {problem.description}
        </p>
          <div className="mt-10">
          <p className="text-zinc-500 text-xs uppercase mb-2">
        Expexted output -- 
        <span className='font-bold text-xl bg-amber-300 rounded-full'>{problem.expectedOutput}</span>  
          </p>

          {/* <div className="border border-zinc-800 p-4 text-sm text-zinc-300">
            Submit only final output text.
          </div> */}
        </div>

</div>

{/* rigt side  */}
{/* RIGHT SIDE */}
<div className="p-10 flex flex-col">

  <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mb-4">
    Code Editor
  </p>

  {/* Language Selector */}
  <select
    value={selectd}
    onChange={(e) => setSeceleted(e.target.value)}
    className="mb-4 bg-black text-white border border-zinc-700 px-4 py-3 outline-none"
  >
    <option value="javascript">JavaScript</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
    <option value="cpp">C++</option>
    <option value="c">C</option>
  </select>

  {/* Monaco Editor */}
  <div className="border border-zinc-700 h-[500px]">
    <Editor
      height="100%"
      theme="vs-dark"
      language={selectd}
      value={code}
      onChange={(value) => setCode(value || "")}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        wordWrap: "on",
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  
  </div>

  {/* Submit Button */}
  <button
  onClick={handleSubnmit}
  disabled={submiting}
  className="mt-6 border border-white py-4 uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all">
    {submiting ? "submitting...." : "submit"}
  </button>

  {/* Console Result */}
  <div className="mt-6 border border-zinc-800 p-5 min-h-[80px] text-zinc-300">
    {result ? result : "Console output will appear here"}
  </div>

</div>
  </div>
  )
}

export default Solve