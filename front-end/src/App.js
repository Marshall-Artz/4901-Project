import './App.css';
import Banner from './components/Banner';
import InputBox from './components/InputBox';
import OutputBox from './components/OutputBox';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner/> 
        <InputBox/> 
        <OutputBox/>
      </header>
    </div>
  );
} 

export default App;
