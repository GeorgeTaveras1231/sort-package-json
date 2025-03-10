import test from 'ava'
import gitHooks from 'git-hooks-list'
import sortPackageJson from '../index.js'
import { macro, keysToObject } from './_helpers.js'

// fields sort keep as it is
for (const field of [
  '$schema',
  'name',
  'displayName',
  'version',
  'description',
  'sideEffects',
  'qna',
  'publisher',
  'type',
  'main',
  'svelte',
  'umd:main',
  'jsdelivr',
  'unpkg',
  'module',
  'source',
  'jsnext:main',
  'browser',
  'react-native',
  'types',
  'typesVersions',
  'typings',
  'style',
  'example',
  'examplestyle',
  'assets',
  'man',
  'workspaces',
  'pre-commit',
  'browserslist',
  'stylelint',
  'flat',
  'packageManager',
  'os',
  'cpu',
  'icon',
  'preview',
  'markdown',
]) {
  test(field, macro.asItIs, { path: field })
}

// fields sort alphabetically
for (const field of [
  'bin',
  'contributes',
  'commitlint',
  'config',
  'nodemonConfig',
  'browserify',
  'babel',
  'xo',
  'ava',
  'jest',
  'mocha',
  'nyc',
  'c8',
  'engines',
  'engineStrict',
  'preferGlobal',
  'publishConfig',
  'galleryBanner',
  'remarkConfig',
  'release',
  'npmpkgjsonlint',
  'npmPackageJsonLintConfig',
  'npmpackagejsonlint',
]) {
  test(field, macro.sortObjectAlphabetically, { path: field })
}

// should unique
for (const field of ['keywords', 'files', 'activationEvents', 'categories']) {
  test(field, macro.uniqueArray, { path: field })
}

test('husky', macro.sortObject, {
  path: 'husky.hooks',
  value: keysToObject(['z', ...gitHooks, 'a']),
  expect: keysToObject([...gitHooks, 'a', 'z']),
})

test('binary', macro.sortObject, {
  path: 'binary',
  value: {
    z: 'z',
    a: 'a',
    module_name: 'node_addon_example',
    module_path: './lib/binding/{configuration}/{node_abi}-{platform}-{arch}/',
    remote_path: './{module_name}/v{version}/{configuration}/',
    package_name:
      '{module_name}-v{version}-{node_abi}-{platform}-{arch}.tar.gz',
    host: 'https://node-pre-gyp-tests.s3-us-west-1.amazonaws.com',
  },
  expect: {
    module_name: 'node_addon_example',
    module_path: './lib/binding/{configuration}/{node_abi}-{platform}-{arch}/',
    remote_path: './{module_name}/v{version}/{configuration}/',
    package_name:
      '{module_name}-v{version}-{node_abi}-{platform}-{arch}.tar.gz',
    host: 'https://node-pre-gyp-tests.s3-us-west-1.amazonaws.com',
    a: 'a',
    z: 'z',
  },
})

test('bugs', macro.sortObject, {
  path: 'bugs',
  value: {
    z: 'z',
    a: 'a',
    email: 'npm@keithcirkel.co.uk',
    url: 'https://github.com/keithamus/sort-package-json/issues',
  },
  expect: {
    url: 'https://github.com/keithamus/sort-package-json/issues',
    email: 'npm@keithcirkel.co.uk',
    a: 'a',
    z: 'z',
  },
})

for (const field of ['repository', 'funding', 'license']) {
  test(field, macro.sortObject, {
    path: field,
    value: {
      z: 'z',
      a: 'a',
      url: 'https://github.com/keithamus/sort-package-json',
      type: 'github',
    },
    expect: {
      type: 'github',
      url: 'https://github.com/keithamus/sort-package-json',
      a: 'a',
      z: 'z',
    },
  })
}

test('author', macro.sortObject, {
  path: 'author',
  value: {
    z: 'z',
    a: 'a',
    url: 'http://keithcirkel.co.uk/',
    name: 'Keith Cirkel',
    email: 'npm@keithcirkel.co.uk',
  },
  expect: {
    name: 'Keith Cirkel',
    email: 'npm@keithcirkel.co.uk',
    url: 'http://keithcirkel.co.uk/',
    a: 'a',
    z: 'z',
  },
})

test('directories', macro.sortObject, {
  path: 'directories',
  value: {
    z: 'z',
    a: 'a',
    example: 'example',
    man: 'man',
    test: 'test',
    doc: 'doc',
    bin: 'bin',
    lib: 'lib',
  },
  expect: {
    lib: 'lib',
    bin: 'bin',
    man: 'man',
    doc: 'doc',
    example: 'example',
    test: 'test',
    a: 'a',
    z: 'z',
  },
})

test('volta', macro.sortObject, {
  path: 'volta',
  value: {
    yarn: '0.0.0',
    npm: '0.0.0',
    node: '0.0.0',
  },
  expect: {
    node: '0.0.0',
    npm: '0.0.0',
    yarn: '0.0.0',
  },
})

test('contributors', (t) => {
  const contributors = {
    contributors: [
      {
        z: 'z',
        a: 'a',
        url: 'http://keithcirkel.co.uk/',
        name: 'Keith Cirkel',
        email: 'npm@keithcirkel.co.uk',
        _: 'this should still be the first element',
      },

      {
        z: 'z',
        a: 'a',
        url: 'http://keithcirkel.co.uk/',
        name: 'Keith Cirkel',
        email: 'npm@keithcirkel.co.uk',
        _: 'this should still be the second element',
      },
    ],
  }

  t.snapshot(
    sortPackageJson(JSON.stringify(contributors, null, 2)),
    'Should sort `contributors[]` as `PeopleField`',
  )
})

test('badges', (t) => {
  const badges = {
    badges: [
      {
        z: 'z',
        a: 'a',
        href: 'https://travis-ci.com/keithamus/sort-package-json.svg',
        url: 'https://travis-ci.com/keithamus/sort-package-json',
        description: 'sort-package-json build status',
        _: 'this should still be the first element',
      },

      {
        z: 'z',
        a: 'a',
        href: 'https://travis-ci.com/keithamus/sort-package-json.svg',
        url: 'https://travis-ci.com/keithamus/sort-package-json',
        description: 'sort-package-json build status',
        _: 'this should still be the second element',
      },
    ],
  }

  t.snapshot(
    sortPackageJson(JSON.stringify(badges, null, 2)),
    'Should sort `badges[]`',
  )
})

test('pnpm', macro.sortObject, {
  path: 'pnpm',
  value: {
    overrides: {
      '@react-stately/selection@~3.10.3': '3.10.3',
      'aws-sdk@1.2345.0': '1.123.0',
      'react-native-notifications@^3.4.5': '3.4.5',
      'antd@^2.23.4': '2.23.4',
      '@react-stately/select@~3.1.3': '3.1.3',
      '@react-stately/selection@~3.7.0': '3.7.0',
      '@react-stately/select@3': '3.3.1',
      '@react-aria/selection@3.10.1>@react-stately/selection': '3.10.3',
      '@react-aria/selection@3.10.1>@react-aria/focus': '3.8.0',
      '@react-aria/selection@3.5.1>@react-stately/selection': '3.10.3',
    },
    patchedDependencies: {
      'esbuild-sass-plugin@1.20.0': 'foo.patch',
      'domino@4.5.6': 'bar.patch',
      'es5-ext@0.12.3': 'baz.patch',
    },
    packageExtensions: {
      '@rjsf/core': {
        dependencies: {
          tslib: '*',
        },
      },
      'follow-redirects': {
        dependencies: {
          debug: '4.3.4',
        },
      },
    },
    allowNonAppliedPatches: true,
  },
  expect: {
    allowNonAppliedPatches: true,
    overrides: {
      '@react-aria/selection@3.5.1>@react-stately/selection': '3.10.3',
      '@react-aria/selection@3.10.1>@react-aria/focus': '3.8.0',
      '@react-aria/selection@3.10.1>@react-stately/selection': '3.10.3',
      '@react-stately/select@3': '3.3.1',
      '@react-stately/select@~3.1.3': '3.1.3',
      '@react-stately/selection@~3.7.0': '3.7.0',
      '@react-stately/selection@~3.10.3': '3.10.3',
      'antd@^2.23.4': '2.23.4',
      'aws-sdk@1.2345.0': '1.123.0',
      'react-native-notifications@^3.4.5': '3.4.5',
    },
    patchedDependencies: {
      'domino@4.5.6': 'bar.patch',
      'es5-ext@0.12.3': 'baz.patch',
      'esbuild-sass-plugin@1.20.0': 'foo.patch',
    },
    packageExtensions: {
      '@rjsf/core': {
        dependencies: {
          tslib: '*',
        },
      },
      'follow-redirects': {
        dependencies: {
          debug: '4.3.4',
        },
      },
    },
  },
})

test('imports', macro.sortObject, {
  path: 'imports',
  value: {
    '#c': './index.js',
    '#c/sub': './index.js',
    '#c/*': './wild/*.js',
    '#a': './sub/index.js',
    '#b/sub/*': './wild/*.js',
    '#b/*': './wild/*.js',
    '#b/sub': './wild/sub-module.js',
  },
  expect: {
    '#a': './sub/index.js',
    '#b/sub': './wild/sub-module.js',
    '#b/sub/*': './wild/*.js',
    '#b/*': './wild/*.js',
    '#c': './index.js',
    '#c/sub': './index.js',
    '#c/*': './wild/*.js',
  },
})
test('exports level 1', macro.sortObject, {
  path: 'exports',
  value: {
    './sub': './sub/index.js',
    './a-wildcard/*': './wild/*.js',
    './a-wildcard/sub': './wild/sub-module.js',
    '.': './index.js',
  },
  expect: {
    '.': './index.js',
    './a-wildcard/sub': './wild/sub-module.js',
    './a-wildcard/*': './wild/*.js',
    './sub': './sub/index.js',
  },
})

test('exports conditions', macro.sortObject, {
  path: 'exports',
  value: {
    custom: './custom.js',
    module: './module.js',
    lagon: './lagon.js',
    vite: './vite.js',
    rollup: './rollup.js',
    wasmer: './wasmer.js',
    webpack: './webpack.js',
    import: './import.js',
    types: './types/index.d.ts',
    script: './script.js',
    node: './node.js',
    'edge-light': './edge-light.js',
    netlify: './netlify.js',
    'react-native': './react-native.js',
    stylus: './style.styl',
    sass: './style.sass',
    esmodules: './esmodules.js',
    default: './index.js',
    azion: './azion.js',
    style: './style.css',
    asset: './asset.png',
    'react-server': './react-server.js',
    browser: './browser.js',
    workerd: './workerd.js',
    electron: './electron.js',
    deno: './deno.js',
    fastly: './fastly.js',
    worker: './worker.js',
    'node-addons': './node-addons.js',
    development: './development.js',
    bun: './bun.js',
    test: './test.js',
    require: './require.js',
    'edge-routine': './edge-routine.js',
    worklet: './worklet.js',
    moddable: './moddable.js',
    macro: './macro.js',
    'module-sync': './module-sync.js',
    kiesel: './keisel.js',
    production: './production.js',
  },
  expect: {
    types: './types/index.d.ts',
    custom: './custom.js',
    test: './test.js',
    development: './development.js',
    production: './production.js',
    vite: './vite.js',
    rollup: './rollup.js',
    webpack: './webpack.js',
    azion: './azion.js',
    'edge-light': './edge-light.js',
    'edge-routine': './edge-routine.js',
    fastly: './fastly.js',
    lagon: './lagon.js',
    netlify: './netlify.js',
    wasmer: './wasmer.js',
    workerd: './workerd.js',
    'react-server': './react-server.js',
    macro: './macro.js',
    bun: './bun.js',
    deno: './deno.js',
    browser: './browser.js',
    electron: './electron.js',
    kiesel: './keisel.js',
    'node-addons': './node-addons.js',
    node: './node.js',
    moddable: './moddable.js',
    'react-native': './react-native.js',
    worker: './worker.js',
    worklet: './worklet.js',
    asset: './asset.png',
    sass: './style.sass',
    stylus: './style.styl',
    style: './style.css',
    script: './script.js',
    esmodules: './esmodules.js',
    module: './module.js',
    import: './import.js',
    'module-sync': './module-sync.js',
    require: './require.js',
    default: './index.js',
  },
})
