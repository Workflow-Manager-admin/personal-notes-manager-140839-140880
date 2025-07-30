import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * List/search all notes for user. Click to edit/view.
 */
export default function NoteListPage() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNotes() {
      setLoading(true);
      try {
        const resp = await axios.get("/api/notes");
        setNotes(resp.data);
      } catch (e) {
        setNotes([]);
      }
      setLoading(false);
    }
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    n =>
      !filter ||
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      (n.body && n.body.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: 760, margin: "2em auto", padding: 24 }}>
      <h1 style={{ textAlign: "left", marginBottom: 16 }}>My Notes</h1>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          value={filter}
          placeholder="Search notes..."
          style={{ flex: 1, padding: "10px 16px", fontSize: 16, borderRadius: 6, border: "1px solid #ddd" }}
          onChange={e => setFilter(e.target.value)}
          aria-label="Filter notes"
        />
        <button className="btn" onClick={() => navigate("/notes/new")}>
          + New Note
        </button>
      </div>
      {loading ? <p>Loading...</p> : filteredNotes.length === 0 ? <p>No notes found.</p> :
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredNotes.map((note) => (
            <li key={note.id}
                style={{ border: "1px solid #eee", borderRadius: 7, marginBottom: 12, padding: 18, background: "var(--bg-secondary,#f8f9fa)" }}>
              <Link to={`/notes/${note.id}`} style={{ textDecoration: "none", color: "var(--text-primary,#282c34)" }}>
                <h3 style={{ margin: 0 }}>{note.title || "Untitled"}</h3>
                <div style={{ fontSize: 14, color: "#888", marginTop: 6 }}>
                  {note.updated_at ? new Date(note.updated_at).toLocaleString() : ""}
                </div>
                <div style={{ marginTop: 10, color: "#555" }}>
                  {note.body?.substring(0, 128)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      }
    </div>
  );
}
