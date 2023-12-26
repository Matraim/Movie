# Todo Movie List

This is a simple Todo List application for managing movies. You can add, delete, and view movie details.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

## Usage

- Add a new movie by entering its title.
- Click on a movie to view its details.
- Delete a movie by clicking the "Delete" button.

## API

- GET `/api/v1/get-movies`: Get the list of movies.
- GET `/api/v1/get-movie/:id`: Get details of a specific movie.
- POST `/api/v1/send-movie/`: Add a new movie.
- PUT `/api/v1/update-movie/:id`: Update details of a movie.
- DELETE `/api/v1/delete-movie/:id`: Delete a movie.

## Deployment

The project is deployed on Vercel. [Live Demo](https://movie-zeta-five.vercel.app/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
