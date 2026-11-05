# E-Commerce Application

This is a full-stack e-commerce application built with .NET Core for the backend and React with TypeScript for the frontend. The backend provides robust API endpoints using Entity Framework Core, while the frontend delivers a dynamic and responsive user experience with Material-UI. Key features include a product catalog, shopping cart functionality, and comprehensive error handling. This project demonstrates best practices for building scalable and maintainable web applications.

## Features
- **Backend**: .NET Core, Entity Framework Core, RESTful API.
- **Frontend**: React, TypeScript, Material-UI.
- **Database**: SQL-based migrations with Entity Framework.
- **Error Handling**: Centralized middleware for API error responses.
- **State Management**: Axios for API requests and state handling.

## Getting Started

### Prerequisites
- .NET SDK
- Node.js and npm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd E-Commerce
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```
4. Restore backend dependencies:
   ```bash
   cd ../api
   dotnet restore
   ```

### Running the Application
1. Start the backend server:
   ```bash
   cd api
   dotnet run
   ```
2. Start the frontend development server:
   ```bash
   cd ../client
   npm run dev
   ```

### Project Structure
- **API/**: Backend code with controllers, data models, and migrations.
- **client/**: Frontend code with React components, features, and API requests.

## License
This project is licensed under the MIT License.

## React + .NET form submission demo

See [the repeated-field form demo](docs/form-data-demo.md) for a stateless
Material UI multiple-select example backed by .NET form binding, validation,
HTTP integration tests and browser tests. Run it at `/form-data-demo` without
starting the store database or seeding accounts.
