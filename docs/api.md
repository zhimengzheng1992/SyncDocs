# SyncDocs API Documentation (MVP)

This document describes the core API endpoints for the SyncDocs project.
All protected endpoints require a JWT token in the header:

Authorization: Bearer <jwt>

------------------------------------------------------------
Authentication
------------------------------------------------------------

POST /auth/register
Description: Register a new user.
Request:
{
  "email": "alice@example.com",
  "password": "123456"
}
Response:
{
  "id": "uuid",
  "email": "alice@example.com",
  "createdAt": "2025-10-03T12:00:00Z"
}

POST /auth/login
Description: Log in and receive a JWT token.
Request:
{
  "email": "alice@example.com",
  "password": "123456"
}
Response:
{
  "token": "jwt-token",
  "user": { "id": "uuid", "email": "alice@example.com" }
}

POST /auth/reset
Description: Send a password reset email (mock in MVP).
Request:
{
  "email": "alice@example.com"
}
Response:
{ "ok": true }

------------------------------------------------------------
Documents
------------------------------------------------------------

GET /docs
Description: Get all documents accessible by the current user.
Response:
[
  { "id": "uuid", "title": "My Doc", "ownerId": "user123", "updatedAt": "2025-10-03T12:00:00Z" }
]

POST /docs
Description: Create a new document.
Request:
{ "title": "New Doc" }
Response:
{
  "id": "uuid",
  "title": "New Doc",
  "createdAt": "2025-10-03T12:00:00Z"
}

GET /docs/:id
Description: Get document metadata (title, owner, user role).
Response:
{
  "id": "uuid",
  "title": "My Doc",
  "ownerId": "user123",
  "role": "editor",
  "updatedAt": "2025-10-03T12:00:00Z"
}

PATCH /docs/:id
Description: Rename a document.
Request:
{ "title": "Renamed Doc" }
Response:
{
  "id": "uuid",
  "title": "Renamed Doc",
  "updatedAt": "2025-10-03T12:05:00Z"
}

DELETE /docs/:id
Description: Move a document to the trash.
Response:
{ "ok": true }

------------------------------------------------------------
Collaboration (WebSocket)
------------------------------------------------------------

URL:
ws://localhost:8080/ws/collab?docId={id}&token={jwt}

Message Protocol (JSON lines):

Client -> Server: send a Yjs update (base64 encoded)
{ "type": "UPDATE", "payload": "<yjs-update-base64>" }

Client -> Server: broadcast presence (cursor, username)
{ "type": "PRESENCE", "payload": { "cursor": { "x": 10, "y": 3 }, "username": "Alice" } }

Server -> Clients: broadcast an update from another user
{ "type": "UPDATE", "from": "user123", "payload": "<yjs-update-base64>" }

------------------------------------------------------------
Permissions
------------------------------------------------------------

POST /docs/:id/share
Description: Generate a shareable link.
Request:
{ "role": "viewer" }
Response:
{ "url": "https://syncdocs.app/share/abcdef123" }

POST /docs/:id/invite
Description: Invite a user by email.
Request:
{ "email": "bob@example.com", "role": "editor" }
Response:
{ "ok": true }

------------------------------------------------------------
Error Handling
------------------------------------------------------------

All errors follow a consistent format:
{
  "error": "Unauthorized",
  "message": "Invalid token"
}

------------------------------------------------------------
Notes
------------------------------------------------------------

- Roles: owner, editor, viewer
- All document editing happens over WebSockets; REST APIs handle metadata and access control.
- This is the MVP scope — future versions will add version history, comments, and advanced search.
