{
    "version": 2,
    "builds": [
    {
    "src": "server.js",
    "use": "@vercel/node"
    }
    ],
    "routes": [
    {
    "src": "/api/(.*)",
    "dest": "server.js"
    }
    ],
    "env": {
    "DATABASE_URL": "@database_url",
    
    }