#!/usr/bin/env node
/* Simple image compression pipeline using sharp */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SRC_DIR = path.resolve(process.cwd(), 'public', 'images')
const OUT_DIR = path.resolve(process.cwd(), 'dist', 'images')

const MAX_W = 1920
const MAX_H = 1080
const QUALITY = 72

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true })
}

function isImage(file) {
  return /\.(jpe?g|png|webp)$/i.test(file)
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(async (e) => {
    const res = path.resolve(dir, e.name)
    return e.isDirectory() ? await walk(res) : res
  }))
  return files.flat()
}

async function processFile(srcPath) {
  const rel = path.relative(SRC_DIR, srcPath)
  const outPath = path.join(OUT_DIR, rel)
  await ensureDir(path.dirname(outPath))

  const img = sharp(srcPath, { failOn: 'none' })
  const meta = await img.metadata()

  let pipeline = img.rotate()
  if ((meta.width || 0) > MAX_W || (meta.height || 0) > MAX_H) {
    pipeline = pipeline.resize({ width: MAX_W, height: MAX_H, fit: 'inside', withoutEnlargement: true })
  }

  const ext = path.extname(srcPath).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true })
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9 })
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: QUALITY })
  }

  await pipeline.toFile(outPath)
  return { srcPath, outPath }
}

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    console.log(`[compress] No images found at ${SRC_DIR}, skipping.`)
    return
  }
  const all = (await walk(SRC_DIR)).filter(isImage)
  console.log(`[compress] Processing ${all.length} images...`)
  await Promise.all(all.map(processFile))
  console.log('[compress] Done.')
}

main().catch((err) => {
  console.error('[compress] Error:', err)
  process.exit(1)
})


