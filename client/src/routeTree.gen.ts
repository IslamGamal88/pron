/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BotImport } from './routes/bot'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const BotRoute = BotImport.update({
  path: '/bot',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/bot': {
      id: '/bot'
      path: '/bot'
      fullPath: '/bot'
      preLoaderRoute: typeof BotImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({ IndexRoute, BotRoute })

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/bot"
      ]
    },
    "/": {
      "filePath": "index.jsx"
    },
    "/bot": {
      "filePath": "bot.jsx"
    }
  }
}
ROUTE_MANIFEST_END */
