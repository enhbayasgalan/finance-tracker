import express from "express";
import { login, register } from "../controllers/authController";

const Authrouter = express.Router();

Authrouter.post("/register",  register);
Authrouter.post("/login", login);

export default Authrouter
