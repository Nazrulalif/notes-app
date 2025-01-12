# Notes App

A full-stack web application for managing personal notes with search functionality.

## Features

- User authentication
- Create, read, update, and delete notes
- Search notes
- Responsive design for mobile and desktop
- Pin important notes
- Tag system for organization

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- MongoDB (v4.0.0 or higher)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd notes-app
```

### 2. Server Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm update
```

Create a `.env` file in the server directory with the following variables:

```bash
ACCESS_TOKEN_SECRET=<token>
```

Create a `config.json` file in the server directory with the following variables:

```bash
{
    "connectionString":"<MongoDB string>"
}
```

Start the server:

```bash
npm run start
```

### 3. Client Setup

Open a new terminal and navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm update
```

Start the client application:

```bash
npm run dev
```

## Project Structure

### Client

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── card/
│   │   ├── profile/
│   │   └── searchBar/
│   ├── pages/
│   │   └── home/
│   ├── utils/
│   └── App.js
└── package.json
```

### Server

```
server/
├── controllers/
├── middleware/
├── models/
├── routes/
├── config/
└── server.js
```

## Available Scripts

In the client directory:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production

In the server directory:

- `npm run start` - Starts the server with nodemon
- `npm start` - Starts the server in production mode

## API Endpoints

### Authentication

- `POST /api/register` - Register new user
- `POST /api/login` - User login
- `GET /api/get-user` - Get user information

### Notes

- `GET /api/get-all-notes` - Get all notes
- `POST /api/add-note` - Create new note
- `PUT /api/update-note/:id` - Update note
- `DELETE /api/delete-note/:id` - Delete note
- `GET /api/search-note` - Search notes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, email nazrulism17@gmail.com or create an issue in the repository.
