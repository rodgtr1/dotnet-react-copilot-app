import React, {useState, useEffect} from 'react';

const Notes = (props) => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState({'title': '', 'description': ''});

    useEffect(() => {
        fetch('https://localhost:5001/api/notes')
            .then(response => response.json())
            .then(data => setNotes(data));

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('https://localhost:5001/api/notes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(response => response.json())
            .then(data => {
                setNotes([...notes, data]);
                setNote({'title': '', 'description': ''});
            }); 
    };

    const deleteNote = (id) => {
        fetch(`https://localhost:5001/api/notes/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                setNotes(notes.filter(note => note.id !== id));
            }
        );
    };

    useEffect(() => {
        fetch('https://localhost:5001/api/notes')
            .then(response => response.json())
            .then(data => setNotes(data));

    }, [deleteNote]);


    return (
        // create bootstrap form
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Notes</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" value={note.title} onChange={(e) => setNote({...note, 'title': e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" value={note.description} onChange={(e) => setNote({...note, 'description': e.target.value})}/>
                        </div>
                        <button className="btn btn-primary">Add Note</button>
                    </form>

                    <h3 class="mt-5">Your Notes</h3>
                    <ul className="list-group">
                        {notes.map(note => (
                            <li className="list-group-item" key={note.id}>
                                {`${note.title}: ${note.description}`}
                                <button className="btn btn-danger float-right" onClick={() => deleteNote(note.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>

                    
                </div>
            </div>
        </div>
    );

}

export default Notes;
    
