function ContentCard({ item }) {
  return (
    <div style={cardStyle}>
      <h3>{item.title}</h3>
      <p>ID: {item.id}</p>
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

export default ContentCard;
