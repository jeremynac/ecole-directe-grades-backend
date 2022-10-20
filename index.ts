// Start the server
import express, { NextFunction, Request, Response } from 'express'
import Session from 'ecoledirecte.js'

const app = express()

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Origin', 'https://ecole-direct-grades.vercel.app')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = express.Router()

router.get('/', (_, res) => {
  res.send('ecole-directe-grades-backend')
})

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  const session = new Session(username, password)
  const account = await session.login()
  res.send(account)
})

router.post('/grades', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  const session = new Session(username, password)
  const account = await session.login()
  if (account && account.type === 'student') {
    const grades = await account.getGrades()
    res.send(grades)
  }
})
router.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  res.send('test')
})

// Add APIs
app.use('', router)

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('index.html', {root: viewsDir});
// });

// Export express instance
export default app

const port = Number(3001)
app.listen(port, () => {
  console.info('Express server started on port: ' + port)
})
