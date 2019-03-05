import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import logger from 'morgan';
import router from './server/routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/', (req, res) => res.json({ message: 'Hello world' }));
app.use('/api/v1', router);

app.listen(process.env.PORT, () => {
  /* eslint-disable-next-line */
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
