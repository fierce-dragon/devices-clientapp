import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { DeviceProvider } from './stores/useDevice';
import Routes from './routes';

function App() {
  return (
		<DeviceProvider>
			<Router>
				<Routes />
			</Router>
		</DeviceProvider>
  );
}

export default App;
