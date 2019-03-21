const express = require('express'), bodyParser = require('body-parser'), cors = require('cors'), mongoose = require('mongoose');

//db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/shoppify', { useNewUrlParser: true, useCreateIndex: true })
.then(
    () => console.log('mongodb connection successful'),
    (err) => console.log('error connecting to mongodb - ', err)
);
mongoose.set('useFindAndModify', false);

//routes
const productRoutes = require('./routes/products.route');
const userRoutes = require('./routes/user.route');

//server 
const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use('/products', productRoutes);
app.use('/user', userRoutes);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log('node up & running...'));
