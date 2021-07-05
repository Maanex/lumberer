import * as fs from 'fs'
import * as path from 'path'
import { Request, Response } from 'express'
import { storagePath } from '../index'


let cacheListData: string[] = []
let cacheListAge: number = 0

export function routeQueryList(_req: Request, res: Response) {
  if (Date.now() - cacheListAge > 10e3) {
    const files: string[] = []
    for (const folder of fs.readdirSync(storagePath)) {
      if (folder.includes('.')) continue
      for (const file of fs.readdirSync(path.join(storagePath, folder)))
        files.push(`${folder}/${file}`)
    }
    cacheListData = files
    cacheListAge = Date.now()
  }
  res.status(200).json(cacheListData)
}

export function routeQueryFile(req: Request, res: Response) {
  try {
    const uri = req.path.split('file/')[1]
    const file = path.join(storagePath, ...uri.split('/'))
    if (!fs.existsSync(file))
      res.status(404).send('Not found')
    if (!fs.lstatSync(file).isFile())
      res.status(400).send('Not a file')
    else
      fs.createReadStream(file, { flags: 'r' }).pipe(res.status(200))
  } catch (ex) {
    // res.status(500).send(ex)
  }
}
