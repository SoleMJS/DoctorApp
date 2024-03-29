import 'bootstrap/dist/css/bootstrap.min.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { store } from './store'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<StrictMode>
			<Provider store={store}>
				<App />
			</Provider>
		</StrictMode>
	</BrowserRouter>
)
