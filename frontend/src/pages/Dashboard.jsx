import { useEffect, useState } from "react";
import { getAllContent, createContent } from "../api/content";
import ContentCard from "../components/ContentCard";

function Dashboard() {
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await getAllContent();
      setContent(res.data);
    } catch (error) {
      alert("Failed to fetch content");
    }
  };

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Title cannot be empty");
      return;
    }

    try {
      setLoading(true);
      await createContent({ title });
      setTitle("");
      fetchContent();
    } catch (error) {
      alert("Failed to create content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <input
          type="text"
          placeholder="Enter content title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleCreate} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>

      <hr />

      {content.length === 0 ? (
        <p>No content available.</p>
      ) : (
        content.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

export default Dashboard;
