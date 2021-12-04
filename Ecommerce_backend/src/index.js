import express from 'express'
import { PORT } from './cofig'
import cors from 'cors'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'

//Database
import './config/mongoose'

//Routes
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.use(morgan('dev'));

app.use('/', productRoutes);
app.use('/', authRoutes);

app.use((err, req, res, next) => {
    const error = {
        status: err.status || 500,
        message: err.message,
    }
    res.json(error);
})

app.listen(PORT);
console.log('Server on port', PORT);





