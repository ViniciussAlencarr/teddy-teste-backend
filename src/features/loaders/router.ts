import path from 'node:path'
import url, { URL } from 'node:url'

import { glob } from 'glob'

// types
import { FastifyInstance } from 'fastify'

export const routerLoader = () => {
    return {
        async load(fastify: FastifyInstance) {

            const isProd = process.env.NODE_ENV === 'production'

            const routesPath = path.resolve(
                path.dirname(''),
                (isProd ? 'build' : 'src'),
                'features',
                `**/*route.${isProd ? 'js' : 'ts'}`,
            )

            const routes = await glob(routesPath, {
                windowsPathsNoEscape: true
            })

            for (const route of routes) {
                const urlRoute = url.pathToFileURL(route) as URL;
                const routeDefinitition = await import(urlRoute.pathname)

                fastify.route(routeDefinitition.default)
            }

        }
    }
}