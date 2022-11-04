import http from "http";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";

const router = express();

/* SERVER HANDLING */
const httpServer = http.createServer(router);

/* CONNECT TO FIREBASE */
let serviceAccountKey = require("./config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

/* CONNECT TO MONGO */
mongoose
	.connect(config.monogo.url, config.monogo.options)
	.then(() => {
		logging.info("Database connected");
	})
	.catch((error) => {
		logging.error(error);
	});

/* LOGGING MIDDLEWARE */
router.use((req, res, next) => {
	logging.info(
		`METHOD: ${req.method} -URL: ${req.url} -IP: ${req.socket.remoteAddress}`
	);
	res.on("finish", () => {
		logging.info(
			`METHOD: ${req.method} -URL: ${req.url} -IP: ${req.socket.remoteAddress} -STATUS: ${res.statusCode}`
		);
	});

	next();
});

/* BODY PARSER */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* API POLICIES */
router.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	if (req.method == "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}

	next();
});

/* ERROR HANDLING */
router.use((req, res, next) => {
	const error = new Error("Not found");

	res.status(404).json({
		message: error.message,
	});
});

/* LISTEN */
httpServer.listen(config.server.port, () =>
	logging.info(`Server is running ${config.server.host}:${config.server.port}`)
);
