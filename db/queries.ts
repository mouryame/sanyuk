export const queries: Record<string, string> = {
  createUsersTable: `CREATE TABLE IF NOT EXISTS users (
    userId TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )`,

  insertUser: `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,

  getUser: `SELECT * FROM users WHERE email = ?`,

  getAllUsers: `SELECT * FROM users`,

  updateUser: `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,

  deleteUser: `DELETE FROM users WHERE id = ?`,

  createPagesTable: `CREATE TABLE IF NOT EXISTS pages (
    pageId TEXT NOT NULL PRIMARY KEY,
    topic TEXT NOT NULL,
    tags TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    createdBy TEXT NOT NULL,
    updatedBy TEXT NOT NULL,
    deletedBy TEXT,
    deletedAt TEXT
  )`,

  insertPage: `INSERT INTO pages (pageId, topic, tags, title, content, status, createdAt, updatedAt, createdBy, updatedBy, deletedBy, deletedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

  updatePage: `UPDATE pages SET topic = ?, tags = ?, title = ?, content = ?, status = ?, updatedAt = ?, updatedBy = ? WHERE pageId = ?`,

  deletePage: `DELETE FROM pages WHERE pageId = ?`,

  getAllPages: `SELECT * FROM pages`,

  getPage: `SELECT * FROM pages WHERE pageId = ?`,

  searchPages: `SELECT * FROM pages WHERE title LIKE ? OR content LIKE ?`,

  getPagesByTag: `SELECT * FROM pages WHERE tags LIKE ?`,

  getPagesByStatus: `SELECT * FROM pages WHERE status = ?`,

  getPagesByTopic: `SELECT * FROM pages WHERE topic = ?`,

  getPagesByCreatedBy: `SELECT * FROM pages WHERE createdBy = ?`,

  getPagesByUpdatedBy: `SELECT * FROM pages WHERE updatedBy = ?`,

  getPagesByDeletedBy: `SELECT * FROM pages WHERE deletedBy = ?`,
};
