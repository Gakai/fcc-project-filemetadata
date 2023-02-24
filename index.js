// Boilerplate code from https://github.com/freeCodeCamp/boilerplate-project-filemetadata
// Switched to esm for more typescript-y coding
// Reused code from previous challenge: mymiddleware.js

import fs from 'node:fs/promises'

import express from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()
import Multer from 'multer'
const upload = Multer({ dest: './uploads' })

import { requestLogger } from './mymiddleware.js'

const app = express()

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html')
})

app.use('/api', requestLogger())

app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
	if (!req.file) return res.status(500).json({ error: 'Upload failed' })

	res.json({
		name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size,
	})
	await fs.unlink(req.file.path)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log('Your app is listening on port ' + port)
})
