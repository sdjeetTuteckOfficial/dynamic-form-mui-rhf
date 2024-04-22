import DynamicForm from './components/dynamic-form';
import { schema } from './schema/form-schema';

function App() {
  return <DynamicForm schema={schema} />;
}

export default App;
