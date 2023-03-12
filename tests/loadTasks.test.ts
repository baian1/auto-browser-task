import { expect, it } from 'vitest'
import { readdir } from 'fs/promises'
import { resolve } from 'path'
it('load task', async () => {
  const tasksFile = await readdir(resolve('./tasks'))
  expect(tasksFile).eqls(['tg.ts'])
})