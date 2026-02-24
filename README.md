# Search Service POC

A proof-of-concept backend search API built with Node.js and Express.

## Features

- RESTful search API endpoint
- Search across multiple fields (title, description, tags)
- Configurable result limits
- In-memory data store with sample data
- Health check endpoint

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## API Endpoints

### Health Check
```
GET /health
```

Returns the service status.

**Response:**
```json
{
  "status": "ok",
  "message": "Search service is running"
}
```

### Search
```
GET /api/search?q=<query>&field=<field>&limit=<limit>
```

**Query Parameters:**
- `q` (required): Search query string
- `field` (optional): Field to search in. Options: `all`, `title`, `description`, `tags`. Default: `all`
- `limit` (optional): Maximum number of results to return. Default: `10`

**Example Requests:**
```bash
# Search all fields for "node"
curl "http://localhost:3000/api/search?q=node"

# Search only titles for "API"
curl "http://localhost:3000/api/search?q=API&field=title"

# Search with custom limit
curl "http://localhost:3000/api/search?q=javascript&limit=5"

# Search by tags
curl "http://localhost:3000/api/search?q=backend&field=tags"
```

**Success Response:**
```json
{
  "query": "node",
  "field": "all",
  "count": 3,
  "total": 3,
  "results": [
    {
      "id": 1,
      "title": "Introduction to Node.js",
      "description": "Learn the basics of Node.js and server-side JavaScript development",
      "tags": ["javascript", "nodejs", "backend", "programming"]
    }
  ]
}
```

**Error Response (400 - Missing Query):**
```json
{
  "error": "Search query is required",
  "message": "Please provide a search query using the \"q\" parameter"
}
```

## Project Structure

```
search-service-poc/
├── data/
│   └── mockData.js        # Sample data for search
├── routes/
│   └── search.js          # Search API routes
├── server.js              # Express server setup
├── package.json           # Dependencies
└── README.md              # Documentation
```

## Sample Data

The service includes 10 sample items covering topics like Node.js, Express, databases, and cloud deployment. Each item has:
- `id`: Unique identifier
- `title`: Item title
- `description`: Detailed description
- `tags`: Array of related tags

## Future Enhancements

- Pagination support
- Sorting options
- Advanced filtering
- Database integration
- Full-text search with Elasticsearch
- Authentication and rate limiting