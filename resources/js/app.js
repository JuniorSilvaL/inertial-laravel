import React from 'react'
import { render } from 'react-dom'
import { createInertiaApp } from '@inertiajs/inertia-react'

createInertiaApp({
    resolve: name => require(`../views/pages/${name}/index.js`).default,
    setup({ el, App, props }) {
        render(<App {...props} />, el)
    },
})
