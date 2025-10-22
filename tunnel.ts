// @tunneled

import { parse } from 'svelte/compiler'
import fs from 'fs'
import path from 'path'
import prettier from 'prettier'
import prettierSvelte from 'prettier-plugin-svelte'
import { $path } from '@/center/utils/system'

const prettierConfig = JSON.parse(fs.readFileSync($path('.prettierrc'), 'utf8'))

export async function setMetadata(params: {
  page: string
  metadata: Record<string, any>
}) {
  const { page, metadata } = params

  if (typeof metadata !== 'object') {
    throw 'Metadata must be record'
  }

  const filePath = path.resolve('./pages', `${page}.svelte`)
  const source = fs.readFileSync(filePath, 'utf8')

  // Parse Svelte source
  const ast = parse(source)

  let start = -1
  let end = -1

  // Find metadata export
  for (let node of ast.module?.content.body || []) {
    if (node.type === 'ExportNamedDeclaration') {
      const dec = node.declaration
      if (dec?.type === 'VariableDeclaration') {
        const varDec = dec.declarations[0]
        if (varDec?.id?.name === 'metadata') {
          start = varDec.init.start
          end = varDec.init.end
          break
        }
      }
    }
  }

  if (start === -1 || end === -1) {
    throw new Error(`No "export const metadata" found in ${page}.svelte`)
  }

  // Replace the old object with the new one
  const metadataString = JSON.stringify(metadata)
  // const formatted = await prettier.format(`(${metadataString})`, {
  //   ...prettierConfig,
  //   parser: 'typescript',
  // })

  // const formattedMetadataString = formatted.slice(2, -2)

  const newSource = source.slice(0, start) + metadataString + source.slice(end)

  const newSourceFormatted = await prettier.format(newSource, {
    ...prettierConfig,
    parser: 'svelte',
    plugins: [prettierSvelte],
  })

  fs.writeFileSync(filePath, newSourceFormatted)

  return { success: true, file: filePath }
}
