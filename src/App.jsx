import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppRouting from "./AppRouting";

function App() {
	return (
		<BrowserRouter>
			<AppRouting />
			<ToastContainer />
		</BrowserRouter>
	);
}

export default App;
