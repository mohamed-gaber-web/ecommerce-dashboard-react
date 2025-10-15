import './App.css'
import { Button } from './components/ui/button';

function App() {

  const testFunction = () => {
    console.log("test")
  }

  return (
    <>
    <div className="grid grid-cols-3 lg:grid-cols-1">
      <Button onClick={testFunction} size="lg" variant="outline">Button</Button>
      <Button size="lg" variant="outline">Button</Button>
      <h1 className='text-center'> Hello World </h1>
      {/* <button className='bg-sky-500 p-10'> click </button> */}
    </div>
    </>
  )
}

export default App;
