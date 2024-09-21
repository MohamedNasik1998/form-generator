import './App.css'
import { AllProvider } from './contexts/AllContext';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <>
      <AllProvider>
        <Dashboard />
      </AllProvider>

    </>
  )
}

export default App
