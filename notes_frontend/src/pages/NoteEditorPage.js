import React, { useState, useEffect } from "react";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Editor/viewer for a single note (edit, delete, markdown).
 */
export default function NoteEditorPage() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("edit");

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      axios.get(`/api/notes/${id}`)
        .then(res => setNote({ title: res.data.title, body: res.data.body }))
        .catch(() => setError("Note not found or error fetching."))
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  function onInputChange(e) {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  async function onSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (isNew) {
        const resp = await axios.post("/api/notes", { ...note });
        navigate(`/notes/${resp.data.id}`);
      } else {
        await axios.put(`/api/notes/${id}`, { ...note });
        setMode("view");
      }
    } catch {
      setError(`Failed to ${isNew ? "save" : "update"} note.`);
    }
    setSaving(false);
  }

  async function onDelete() {
    if (window.confirm("Delete this note?")) {
      setSaving(true);
      try {
        await axios.delete(`/api/notes/${id}`);
        navigate(`/`);
      } catch {
        setError("Failed to delete note.");
      }
      setSaving(false);
    }
  }

  if (loading) return <p style={{ margin: 48 }}>Loading…</p>;
  if (error) return <p style={{ color: "red", margin: 48 }}>{error}</p>;

  return (
    <div style={{ maxWidth: 860, margin: "2em auto", padding: 24 }}>
      <form onSubmit={onSave}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={note.title}
            onChange={onInputChange}
            style={{ flex: 1, fontSize: 22, padding: 10, borderRadius: 7, border: "1px solid #ddd" }}
            required
            aria-label="Note title"
          />
          <button type="button" className="btn" style={{ minWidth: 80 }} onClick={() => setMode(mode === "edit" ? "view" : "edit")}>
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
          {!isNew && (
            <button
              type="button"
              className="btn"
              style={{ minWidth: 80, background: "#db4437" }}
              onClick={onDelete}
            >
              Delete
            </button>
          )}
        </div>
        {mode === "edit" ? (
          <SimpleMDE
            value={note.body}
            onChange={val => setNote({ ...note, body: val })}
            options={{ spellChecker: false }}
            aria-label="Note body"
          />
        ) : (
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 7,
              minHeight: 180,
              marginTop: 10,
              background: "#fafbfc",
              padding: 18,
            }}>
            <ReactMarkdown>{note.body || "*Nothing to preview…*"}</ReactMarkdown>
          </div>
        )}
        <div style={{ marginTop: 18 }}>
          <button type="submit" className="btn btn-large" disabled={saving}>
            {saving ? "Saving..." : isNew ? "Save Note" : "Update Note"}
          </button>
        </div>
        {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
      </form>
    </div>
  );
}
