USE entertainment;

INSERT INTO users (email, username, hashed_password)
VALUES 
('admin@example.com', 'admin', 'dummyhash');

INSERT INTO content (title, description, owner_id)
VALUES
('First Content', 'Sample description', 1);
