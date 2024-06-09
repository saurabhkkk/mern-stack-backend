# Backend for MERN Stack CRUD Application

This repository is the backend component of a MERN Stack CRUD application. It manages a dynamic list of items with drag-and-drop functionality integrated at the front end. The backend is built using Node.js, Express, and MongoDB, handling all server-side logic, database operations, and API interactions necessary for the frontend.

## Description

The backend is designed to perform robust CRUD operations and provides APIs for:
- Adding, reading, updating, and deleting items.
- Reordering items through drag-and-drop functionality (handled on the frontend but persisted in the backend).

## Features

- **CRUD Operations**: Full support for creating, reading, updating, and deleting items.
- **JWT Authentication**: Secure routes using JSON Web Token (JWT) to ensure that only authenticated users can perform certain operations.
- **Search Functionality**: API endpoints that support searching items by name or description.
- **Pagination**: API endpoints to paginate the list of items, enhancing performance on large datasets.
- **Error Handling**: Comprehensive error responses for client-side integration.
- **CORS**: Cross-Origin Resource Sharing setup to allow requests from the frontend domain.

## API Endpoints

- `GET /api/items`: Retrieve all items or a paginated list if parameters are provided.
- `POST /api/items`: Add a new item (requires authentication).
- `PUT /api/items/:id`: Update an existing item (requires authentication).
- `DELETE /api/items/:id`: Delete an item (requires authentication).
- `GET /api/items/search`: Search items based on a query term.
- `POST /api/reorder`: Endpoint to support reordering of items (requires authentication).

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>

2. Install dependencies:
   cd <backend-directory>
   npm install
