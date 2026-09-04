# @wocker/helpers

###### Helpers for wocker packages

[![npm version](https://img.shields.io/npm/v/@wocker/helpers.svg)](https://www.npmjs.com/package/@wocker/helpers)
[![Publish latest](https://github.com/kearisp/wocker-helpers/actions/workflows/publish-latest.yml/badge.svg?event=release)](https://github.com/kearisp/wocker-helpers/actions/workflows/publish-latest.yml)
[![License](https://img.shields.io/npm/l/@wocker/helpers)](https://github.com/kearisp/wocker-helpers/blob/master/LICENSE)

[![npm total downloads](https://img.shields.io/npm/dt/@wocker/helpers.svg)](https://www.npmjs.com/package/@wocker/helpers)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@wocker/helpers)](https://bundlephobia.com/package/@wocker/helpers)
![Coverage](https://gist.githubusercontent.com/kearisp/f17f46c6332ea3bb043f27b0bddefa9f/raw/coverage-wocker-helpers-latest.svg)


## Usage

### Installation

```shell
npm i @wocker/helpers
```


## Renamed from `@wocker/utils`

This package replaces `@wocker/utils`, which is deprecated. Unlike `@wocker/utils`,
`@wocker/helpers` does **not** re-export anything from `@wocker/prompts` — if you
were using the deprecated `promptConfirm` / `promptInput` / `promptSelect` /
`promptPath` re-exports from `@wocker/utils`, import them from `@wocker/prompts`
directly instead.
