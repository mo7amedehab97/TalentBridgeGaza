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

## Deployment

This project uses GitHub Actions for CI/CD. The frontend is deployed to Vercel and the backend to Render.

### Prerequisites

1. GitHub repository
2. Vercel account (for frontend)
3. Render account (for backend)
4. PostgreSQL database (can be provisioned through Render)

### Setting up Secrets

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

1. Vercel Secrets (for frontend):
   - `VERCEL_TOKEN`: Your Vercel authentication token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

2. Render Secrets (for backend):
   - `RENDER_API_KEY`: Your Render API key
   - `RENDER_SERVER_SERVICE_ID`: The service ID of your backend service

### Environment Variables

Create `.env` files for both client and server:

#### Client (.env)
```
NEXT_PUBLIC_API_URL=https://your-render-backend-url
```

#### Server (.env)
```
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3001
NODE_ENV=production
```

### Deployment Process

1. Push to the main branch triggers the CI/CD pipeline
2. The pipeline will:
   - Build and test both frontend and backend
   - Deploy the frontend to Vercel
   - Deploy the backend to Render
   - Set up the PostgreSQL database

### Manual Deployment

If you need to deploy manually:

1. Frontend:
   ```bash
   cd client
   npm run build
   vercel --prod
   ```

2. Backend:
   ```bash
   cd server
   npm run build
   # Deploy through Render dashboard or CLI
   ```

### Monitoring

- Vercel Dashboard: Monitor frontend deployments and performance
- Render Dashboard: Monitor backend deployments and database
- GitHub Actions: View CI/CD pipeline status and logs

### Service Configuration

#### Frontend (Vercel)
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Environment: Node 18

#### Backend (Render)
- Service Type: Web Service
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node 18
- Root Directory: server

#### PostgreSQL Database (Render)
- Create a new PostgreSQL database in Render
- Use the connection string provided by Render in your backend's environment variables
