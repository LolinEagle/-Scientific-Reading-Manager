import React, { useState, useEffect } from 'react';

const Comment = ({ paper }) => {
	const [comment, setComment] = useState('');
	
	// Charger l'état des commentaires depuis le localStorage
	useEffect(() => {
		const savedStatus = JSON.parse(localStorage.getItem(paper.key)) || {};
		setComment(savedStatus.comment || '');
	}, [paper.key]);
  
	// Sauvegarder l'état des commentaires dans le localStorage
	const handleSave = () => {
		const paperStatus = { comment };
		localStorage.setItem(paper.key, JSON.stringify(paperStatus));
	};
  
	return (<div>
		<div><textarea
			value={comment} 
			onChange={(e) => setComment(e.target.value)} 
			placeholder="Ajouter un commentaire"
			className='Comment'
		/></div>
		<button onClick={handleSave}>Sauvegarder</button>
	</div>);
};

export default Comment;
