import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TodosSection from "./TodosSection/TodosSection";
import {TodosProvider} from "./TodosProvider";

function App() {

  return (
    <main>
        <TodosProvider>
            <TodosSection/>
        </TodosProvider>
    </main>
  )
}

export default App
