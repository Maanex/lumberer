import * as fs from 'fs'
import * as path from 'path'
import { Request, Response } from 'express'
import { storagePath } from '../index'

const spaces: string[] = []


export function routeLog(req: Request, res: Response) {
  const space = req.params.space || ''
  const folderPath = path.join(storagePath, space)

  if (!spaces.includes(space)) {
    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath)
    spaces.push(space)
  }

  const process = req.params.process || 'unknown'

  const filePath = path.join(folderPath, process)
  const stream = fs.createWriteStream(filePath, { flags: 'a' })

  stream.write('\n')
  req.pipe(stream)
  res.status(200).end()
}
