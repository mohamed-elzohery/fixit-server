const dotenv = require('dotenv');
const app = require('./app');

const connectDB = require('./helpers/connectDB');

dotenv.config('.env');

const { PORT, DB_URL } = process.env;

connectDB(DB_URL);

app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});