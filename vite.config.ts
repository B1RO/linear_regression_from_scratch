import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        {
            enforce: 'pre', ...mdx({
                rehypePlugins: [rehypeKatex],
                remarkPlugins: [remarkMath],
            })
        },
        react()
    ]
})
