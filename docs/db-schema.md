# SyncDocs Database Schema (MVP)

This document describes the core PostgreSQL schema for SyncDocs MVP.

------------------------------------------------------------
Users Table
------------------------------------------------------------
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

Description:
- Stores registered users.
- Email must be unique.
- Passwords are stored as secure hashes.

------------------------------------------------------------
Documents Table
------------------------------------------------------------
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  ydoc_state BYTEA, -- snapshot of Yjs document state
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

Description:
- Stores documents and their metadata.
- ydoc_state holds the serialized Yjs state for persistence.

------------------------------------------------------------
Permissions Table
------------------------------------------------------------
CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(20) CHECK (role IN ('owner','editor','viewer'))
);

Description:
- Defines user roles for each document.
- Roles: owner, editor, viewer.

------------------------------------------------------------
Invites Table
------------------------------------------------------------
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doc_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP,
  accepted_at TIMESTAMP
);

Description:
- Handles email-based invitations to collaborate on a document.
- Stores invitation token and expiration.

------------------------------------------------------------
Audit Logs Table
------------------------------------------------------------
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  target_id UUID,
  meta JSONB,
  created_at TIMESTAMP DEFAULT now()
);

Description:
- Records user actions (e.g., login, document edits, permission changes).
- Useful for debugging and compliance.

------------------------------------------------------------
Notes
------------------------------------------------------------
- UUIDs are used as primary keys for scalability.
- All foreign keys cascade on delete where appropriate.
- For production: add indexes on frequently queried fields (email, doc_id, user_id).
- Additional tables may be added in future (comments, version history, organizations).
