import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllContent, createContent } from "../api/content";
import ContentCard from "../components/ContentCard";

function Dashboard() {
  const navigate = useNavigate();

  // Search / Filter
  const [searchTitle, setSearchTitle] = useState("");
  const [filterType, setFilterType] = useState("");

  // List
  const [content, setContent] = useState([]);

  // Create form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contentType, setContentType] = useState("");

  // Loading flags
  const [loadingList, setLoadingList] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContent = async () => {
    try {
      setLoadingList(true);

      // ✅ Build query params for backend: /content/?q=...&content_type=...
      const params = {};
      if (searchTitle.trim()) params.q = searchTitle.trim();
      if (filterType.trim()) params.content_type = filterType.trim();

      const res = await getAllContent(params);
      setContent(res.data);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Fetch error:", error?.response?.data || error);
        alert(error?.response?.data?.detail || "Failed to fetch content");
      }
    } finally {
      setLoadingList(false);
    }
  };

  const handleCreate = async () => {
    if (!title.trim() || !description.trim() || !contentType.trim()) {
      alert("Title, description, and content type are required");
      return;
    }

    try {
      setCreating(true);

      // ✅ match backend schema (snake_case)
      await createContent({
        title: title.trim(),
        description: description.trim(),
        content_type: contentType.trim(),
      });

      setTitle("");
      setDescription("");
      setContentType("");

      await fetchContent();
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        alert("You are not logged in. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Create error:", error?.response?.data || error);
        alert(error?.response?.data?.detail || "Failed to create content");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTitle("");
    setFilterType("");
    // fetch all after clearing
    setTimeout(fetchContent, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Create Content */}
      <div style={{ marginTop: "20px", display: "grid", gap: "10px", maxWidth: 420 }}>
        <h3 style={{ margin: 0 }}>Create Content</h3>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Content Type (e.g. movie, series)"
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          style={{ padding: "8px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleCreate} disabled={creating}>
            {creating ? "Creating..." : "Create"}
          </button>

          <button onClick={fetchContent} disabled={loadingList}>
            {loadingList ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div style={{ marginTop: "20px", display: "grid", gap: "10px", maxWidth: 420 }}>
        <h3 style={{ margin: 0 }}>Search / Filter</h3>

        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Filter by content type (e.g. movie)"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: "8px" }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={fetchContent} disabled={loadingList}>
            {loadingList ? "Searching..." : "Search"}
          </button>

          <button onClick={handleClearSearch} disabled={loadingList}>
            Clear
          </button>
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Content List */}
      {loadingList ? (
        <p>Loading content...</p>
      ) : content.length === 0 ? (
        <p>No content available.</p>
      ) : (
        content.map((item) => <ContentCard key={item.id} item={item} />)
      )}
    </div>
  );
}

export default Dashboard;