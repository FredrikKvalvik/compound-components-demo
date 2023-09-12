import * as C from "./components/Collapsible"

function App() {

  const Version1 = ({ children }: { children?: React.ReactNode }) => (
    <C.Root as="div" className="">
      <h2 className="text-3xl">
        <C.Trigger className="group p-8 w-full bg-red-300 text-left flex justify-between">
          <span>trigger</span>
          <span className="group-data-[open=true]:rotate-180">^</span>
        </C.Trigger>
      </h2>
      <C.Content className="p-8 bg-green-200 space-y-4 border-x-2 border-b-2 border-black">
        {children}
      </C.Content>
    </C.Root>)

  const Version2 = () => (
    <C.Root as="div" className="group">
      <h2 className="text-3xl flex justify-between mb-2">
        <span>Heading</span>
        <C.Trigger className="p-4 rounded-full h-12 w-12 flex items-center justify-center bg-blue-300 text-left">
          <span className="font-3xl group-data-[open='true']:hidden">+</span>
          <span className="font-3xl group-data-[open='false']:hidden">-</span>
        </C.Trigger>
      </h2>
      <C.Content as="ul" className="list-disc p-8 bg-yellow-200">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </C.Content>
    </C.Root>)

  const Version3 = () => (
    <C.Root className="space-y-4">
      <h2 className="text-3xl">Heading</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt animi, debitis numquam quaerat voluptates quas laudantium aliquid cum vero illum necessitatibus voluptatum eum officia. Officia vel distinctio amet. Quas expedita qui ea earum nostrum repudiandae sit aut error numquam voluptatum facilis deleniti necessitatibus iusto sunt incidunt, sequi saepe alias veritatis omnis odio</p>

      <C.Content as="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur molestiae debitis facere reprehenderit! Eos, harum. Consequuntur iusto saepe, ipsa autem ab incidunt, labore enim delectus pariatur dolores praesentium voluptatem aliquam similique asperiores ullam aut repellat. Ipsum quaerat iste modi, vero at nesciunt dignissimos consectetur quibusdam harum ipsa aperiam voluptatem sapiente ex ea omnis cupiditate distinctio! Voluptas eum adipisci atque ea consequuntur rem excepturi consequatur recusandae aliquid placeat fuga fugiat veniam reprehenderit, nulla cumque, doloremque, in amet eius debitis neque alias optio. Illum illo dignissimos quaerat minima saepe omnis asperiores ipsum rem ullam magnam iste, quas dolores ab vel, in doloremque.
      </C.Content>

      <C.Trigger className="group block mx-auto px-4 py-2 bg-orange-300 rounded-md">
        <span className="font-xl group-data-[open=true]:hidden">Se mer</span>
        <span className="font-xl group-data-[open=false]:hidden">Se mindre</span>
      </C.Trigger>
    </C.Root>)

  return (
    <main className="min-h-screen max-w-5xl mx-auto pt-20 px-4">
      <Version1>
        <Version1>level 2, nested</Version1>
        <Version1>level 2, nested</Version1>
        <Version1>level 2, nested</Version1>
        <Version1>level 2, nested</Version1>
      </Version1>

      <br /><br />

      <Version2 />

      <br /><br />

      <Version3 />
    </main>
  )
}

export default App