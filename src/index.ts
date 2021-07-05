import { startServer } from './server'

export const storagePath: string = process.env.STORAGE_PATH || './storage'


async function main() {
  await startServer()
}
main()
