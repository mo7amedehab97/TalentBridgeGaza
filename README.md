# TalentBridgeGaza

A fullstack application connecting talents in Gaza with opportunities worldwide.

## Project Structure

```
talentBridgeGaza/
├── client/           # Next.js frontend application
└── server/           # Node.js + Express backend application
```

## Tech Stack

### Frontend (Client)
- Next.js
- TypeScript
- Tailwind CSS
- React Query (for data fetching)
- React Hook Form (for forms)
- Zod (for validation)

### Backend (Server)
- Node.js
- Express
- TypeScript
- Prisma (ORM)
- PostgreSQL (Database)
- JWT (Authentication)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables (see .env.example files in both directories)

4. Start the development servers:
   ```bash
   # Start client
   cd client
   npm run dev

   # Start server
   cd server
   npm run dev
   ```

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details 
