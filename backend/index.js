import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './src/config/dbConfig.js'; 
import userRoutes from './src/routes/userRoutes.js'; 
import courseRoutes from './src/routes/courseRoutes.js'
import gptRoutes from './src/routes/gptRoutes.js'
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swaggerconfig.js';
import 'dotenv/config';

dotenv.config();

const app = express();

await connectDB(); 

//swagger doc
app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Assestment API Docs",
    customCss: '.swagger-ui .topbar { display: none }'
  })
);

app.use(cors());
// In your Express.js backend
app.use(cors({
  origin: ['http://localhost:8081', 'exp://192.168.8.200:8081']
}));
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/gpt', gptRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
