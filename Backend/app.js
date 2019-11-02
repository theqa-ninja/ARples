import express from 'express'
import routes from './routes';

const app = express()
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server is listening on port ${port}`)
)

app.use('/api', routes);

module.exports = app;