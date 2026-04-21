import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [storedNote, setStoredNote] = useState<String[] | null>(null);


 const setLocalStorage=(data:String[])=>{
    localStorage.setItem("notes", JSON.stringify(data))
    setStoredNote(data)
 }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (note == "") {
      alert("Please enter the note to add.");
      return;
    }

    let stored = localStorage.getItem("notes");
    console.log("this is all that is stored :-",stored)
    let allNotes = stored ? JSON.parse(stored) : null;
    console.log("This is after parsing:-", allNotes )
    allNotes ? setLocalStorage([...allNotes, note]) : setLocalStorage([note]);
    setNote("");
  };
  useEffect(() => {
    const allNotes = localStorage.getItem("notes");
    const parsed: String[] | null = allNotes ? JSON.parse(allNotes) : null;
    setStoredNote(parsed);
  }, []);
  return (
    <>
      <main className="w-screen h-screen border border-black ">
        <section className="flex flex-col gap-3 items-center justify-center border h-full bg-purple-950">
          <form onSubmit={handleSubmit} className="absolute top-10 flex gap-3">
            <textarea
              name="note"
              id="note"
              className="border border-red-600 rounded-2xl w-3xl p-2"
              placeholder="Enter Note Here..."
              value={note}
              onChange={(e) =>{
                 setNote(e.currentTarget.value)

              }}
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 w-40 rounded-4xl hover:scale-[1.05] text-white font-bold"
            >
              Add
            </button>
          </form>

          <div id="list" className="flex flex-col gap-3 mt-20 w-2/3 max-h-96 overflow-y-auto">
            {storedNote?.map((n, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md text-gray-800 break-words flex justify-between items-center">{n} 
              <div className="controls flex gap-3 ">
              <button  >Delete</button>
              <button>Update</button>
              </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
