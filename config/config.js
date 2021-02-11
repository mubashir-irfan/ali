const dotenv = require('dotenv').config(); // invoke dotenv configuration

// export the required environment variables. Their values are assigned in .env file placed in root directory
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'default',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 7777,
}