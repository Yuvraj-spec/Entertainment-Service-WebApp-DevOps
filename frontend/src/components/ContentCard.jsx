function ContentCard({ item }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ margin: 0 }}>{item.title}</h3>

      <p style={metaStyle}>
        <strong>ID:</strong> {item.id}
      </p>

      <p style={metaStyle}>
        <strong>Type:</strong> {item.content_type || "N/A"}
      </p>

      <p style={{ marginTop: "8px" }}>
        <strong>Description:</strong> {item.description || "N/A"}
      </p>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px",
  backgroundColor: "#f9f9f9",
};

const metaStyle = {
  margin: "6px 0",
};

export default ContentCard;