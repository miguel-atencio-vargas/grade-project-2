# Backend API Documentation

This is the backend service for the Note Taking Application, built with NestJS and Cloud Firestore.

## Base URL
All API endpoints are prefixed with `/api`.
Example: `http://localhost:8001/api/notes`

## Endpoints

### Notes

#### 1. Get All Notes
Retrieve a list of notes.

- **URL:** `/notes`
- **Method:** `GET`
- **Query Parameters:**
    - `isDeleted` (optional, boolean): Filter by deleted status. Default: `false`.
    - `isArchived` (optional, boolean): Filter by archived status.

**Example Request:**
\`\`\`bash
curl "http://localhost:8001/api/notes?isArchived=true"
\`\`\`

#### 2. Get Single Note
Retrieve a specific note by its UUID.

- **URL:** `/notes/:uuid`
- **Method:** `GET`
- **URL Parameters:**
    - `uuid`: The unique identifier of the note.

**Example Request:**
\`\`\`bash
curl "http://localhost:8001/api/notes/123e4567-e89b-12d3-a456-426614174000"
\`\`\`

#### 3. Create Note
Create a new note.

- **URL:** `/notes`
- **Method:** `POST`
- **Body:**
    - `content` (required, string): The content of the note.
    - `isDeleted` (optional, boolean): Initial deleted status.
    - `isArchived` (optional, boolean): Initial archived status.

**Example Request:**
\`\`\`bash
curl -X POST "http://localhost:8001/api/notes" \
     -H "Content-Type: application/json" \
     -d '{"content": "My new note"}'
\`\`\`

#### 4. Update Note
Update an existing note.

- **URL:** `/notes/:uuid`
- **Method:** `PUT`
- **URL Parameters:**
    - `uuid`: The unique identifier of the note.
- **Body:**
    - `uuid` (required, string): Must match the URL parameter.
    - `content` (optional, string): New content.
    - `isDeleted` (optional, boolean): New deleted status.
    - `isArchived` (optional, boolean): New archived status.

**Example Request:**
\`\`\`bash
curl -X PUT "http://localhost:8001/api/notes/123e4567-e89b-12d3-a456-426614174000" \
     -H "Content-Type: application/json" \
     -d '{"uuid": "123e4567-e89b-12d3-a456-426614174000", "content": "Updated content", "isArchived": true}'
\`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port to listen on (Cloud Run) | `8080` |
| `API_PORT` | Port to listen on (Local) | `8001` |
| `FIREBASE_PROJECT_ID` | GCP/Firebase Project ID | Required |
| `FIREBASE_DATABASE_ID` | Firestore Database ID | `(default)` |
| `NODE_ENV` | Environment | `development` |
