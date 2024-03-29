const config = {
  projectName: 'v2ex',
  date: '2018-8-3',
  designWidth: 750,
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  babel: {
    sourceMap: true,
    presets: [
      'env'
    ],
    plugins: [
      'transform-class-properties',
      'transform-decorators-legacy',
      'transform-object-rest-spread'
    ]
  },
  typescript: {
    compilerOptions: {
      allowSyntheticDefaultImports: true,
      baseUrl: '.',
      declaration: false,
      experimentalDecorators: true,
      jsx: 'react',
      jsxFactory: 'Nerv.createElement',
      module: 'commonjs',
      moduleResolution: 'node',
      noImplicitAny: false,
      noUnusedLocals: true,
      outDir: './dist/',
      preserveConstEnums: true,
      removeComments: false,
      rootDir: '.',
      sourceMap: true,
      strictNullChecks: true,
      target: 'es6'
    },
    include: [
      'src/**/*'
    ],
    exclude: [
      'node_modules'
    ],
    compileOnSave: false
  },
  plugins: [],
  defineConstants: {
  },
  weapp: {

  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
