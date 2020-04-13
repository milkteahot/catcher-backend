import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { uploadMiddleware, uploadController } from "./upload";
import { paymentController } from "./payment";
import bodyParser, { json } from "body-parser";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema, 
    context: ({request}) => ({request, isAuthenticated})
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.express.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });
 server.express.use(bodyParser.json());

server.express.post("/api/upload", uploadMiddleware, uploadController);
server.express.post("/api/payments/complete", paymentController);

server.start({port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));
