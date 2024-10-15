import './App.css';
import React, { useState } from 'react';
import PaperList from './PaperList';

const App = () => {
	const [userId, setUserId] = useState('');
	const [apiKey, setApiKey] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};

	if (submitted){
		return (<div className="App">
			<h1>Gestionnaire de Lectures Zotero</h1>
			<PaperList userId={userId} apiKey={apiKey} />
		</div>);
	}

	return (<div className="App-header">
		<h1>Connexion à Zotero</h1>
		<form onSubmit={handleSubmit}>
			<label>
				User ID:
				<input 
					type="text" 
					value={userId} 
					onChange={(e) => setUserId(e.target.value)} 
					required
				/>
			</label>
			<br />
			<label>
				API Key:
				<input 
					type="text" 
					value={apiKey} 
					onChange={(e) => setApiKey(e.target.value)} 
					required
				/>
			</label>
			<br />
			<button type="submit">Valider</button>
		</form>
	</div>);
};

export default App;
