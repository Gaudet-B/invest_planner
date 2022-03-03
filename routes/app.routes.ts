const Controller = require('../controllers/app.controller');

const express = require('express');
const router = express.Router();

const app = () => {
    router.get("/api/calculate", Controller.calculate)
}

export default { app }