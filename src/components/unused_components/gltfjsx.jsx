import { createWriteStream, existsSync, readFileSync } from 'fs';
import { resolve as _resolve, dirname, relative, parse as _parse, join } from 'path';
import { format } from 'prettier';
import parserBabel from 'prettier/parser-babel';
require('jsdom-global')()
const THREE = (global.THREE = require('three'))
import './bin/GLTFLoader'
import DracoLoader from './bin/DRACOLoader'
THREE.DRACOLoader.getDecoderModule = () => {}
import parse from './utils/parser'
import transform from './utils/transform'

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) view[i] = buf[i];
  return ab;
};

const gltfLoader = new THREE.GLTFLoader();
gltfLoader.setDRACOLoader(new DracoLoader());

export default function (file, output, options) {
  function getRelativeFilePath(file) {
    const filePath = _resolve(file)
    const rootPath = options.root ? _resolve(options.root) : dirname(file)
    const relativePath = relative(rootPath, filePath) || ''
    if (process.platform === 'win32') return relativePath.replace(/\\/g, '/')
    return relativePath
  }

  return new Promise((resolve, reject) => {
    const stream = createWriteStream(output)
    stream.once('open', async (fd) => {
      if (!existsSync(file)) {
        reject(file + ' does not exist.')
      } else {
        // Process GLTF
        if (options.transform || options.instance || options.instanceall) {
          const { name } = _parse(file)
          const transformOut = join(name + '-transformed.glb')
          if (options.setLog) options.setLog((state) => [...state, 'transforming ' + transformOut])
          await transform(file, transformOut, {})
          file = transformOut
        }

        const filePath = getRelativeFilePath(file)
        const data = readFileSync(file)
        const arrayBuffer = toArrayBuffer(data)
        gltfLoader.parse(
          arrayBuffer,
          '',
          (gltf) => {
            stream.write(
              format(parse(filePath, gltf, options), {
                semi: false,
                printWidth: options.printwidth || 1000,
                singleQuote: true,
                jsxBracketSameLine: true,
                parser: options.types ? 'babel-ts' : 'babel',
                plugins: [parserBabel],
              })
            )
            stream.end()
            if (options.setLog) setTimeout(() => resolve(), (options.timeout = options.timeout + options.delay))
            else resolve()
          },
          reject
        )
      }
    })
  })
}
