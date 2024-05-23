# Notes App With The PERN Stack

## How to run the app

First, make sure you have Docker installed.

Navigate to the root of the project and run the runApp.sh script, like so:

`bash runApp.sh`

Or you can enter the docker command yourself: `docker compose up -d`

The app will be availabe at the url http://localhost:5173

To stop the app you can run the script stopApp.sh, like so:

`bash stopApp.sh`

Or you can simply write the following command: `docker compose down`

## Technologies used to develop the app

Backend
- Node 20.10.0
- Yarn 1.22.22
- Postgres 16.3
- Express 4.19.2
- Sequelize 6.37.3
---
Frontend
- Node 20.10.0
- vite 5.2.0
- React 18.2.0
- React Router 6.23.1
- MUI 5.15.18
---
Container technology
- Docker Desktop 4.29.0
- Docker Engine 26.0.0
- Docker Compose 2.26.1
---
Operating System
- Ubuntu 22.04 on WSL2
