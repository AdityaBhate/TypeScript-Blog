const config = {
	monogo: {
		options: {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			socketTimeoutMS: 30000,
			keepAlive: true,
			// poolSize: 50,
			autoIndex: false,
			retryWrites: false,
		},
		url: "mongodb://localhost:27017/blogs",
	},
	server: {
		host: "localhost",
		port: 3001,
	},
};

export default config;
