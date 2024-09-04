import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouting from "./routes/AppRouting";

function App() {
	return (
		<BrowserRouter>
			<AppRouting />
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
