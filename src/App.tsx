import './App.css'
import * as C from "./components/Collapsible"

function App() {
  return (
    <>
      <C.Root>
        <C.Trigger>trigger</C.Trigger>
        <C.Content>
          Content
        </C.Content>
      </C.Root>
    </>
  )
}

export default App
