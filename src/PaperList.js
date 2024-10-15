import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

const PaperList = ({ userId, apiKey }) => {
	const [papers, setPapers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState('all');

	// Ferch data from api
	useEffect(() => {
		const fetchPapers = async () => {
			try {
				const response = await axios.get(`https://api.zotero.org/users/${userId}/items`, {
					params: { key: apiKey },
				});
				console.log(response)
				setPapers(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des articles", error);
			} finally {
				setLoading(false);// Arrêter le chargement après la récupération des données
			}
		};

		fetchPapers();
	}, [userId, apiKey]);

	const toggleReadStatus = (paperKey) => {
		setPapers(prevPapers =>
			prevPapers.map(paper =>
			paper.key === paperKey ? { ...paper, read: !paper.read } : paper
			)
		);
	};

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const filteredPapers = papers.filter(paper => {
		if (filter === 'read') return (paper.read);
		if (filter === 'unread') return (!paper.read);
		return (true);// Si le filtre est "all", on retourne tous les papiers
	});

	if (loading) return (<p>Chargement des articles...</p>);

	return (<div>
		<h2>Liste des papiers scientifiques</h2>
		<div>
			<label>Filtrer : </label>
			<select value={filter} onChange={handleFilterChange}>
			<option value="all">Tous</option>
			<option value="read">Lus</option>
			<option value="unread">Non lus</option>
			</select>
		</div>
		<ul>
			{filteredPapers.map(paper => (
			<li key={paper.key}>
				<h3>Titre : {paper.data.title}</h3>
				<p><strong>Auteurs :</strong> {paper.data.creators.map(creator => creator.lastName).join(', ')}</p>
				<p><strong>Année de publication :</strong> {paper.data.date}</p>
				<p><strong>Statut :</strong> {paper.read ? 'Lu' : 'Non lu'}</p>
				<button onClick={() => toggleReadStatus(paper.key)}>Marquer comme {paper.read ? 'Non lu' : 'Lu'}</button>
				<Comment paper={paper} />
			</li>
			))}
		</ul>
	</div>);
};

export default PaperList;
