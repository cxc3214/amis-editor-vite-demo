import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
// import svgLoader from '@andylacko/vite-svg-react-loader'
import svgr from "vite-plugin-svgr";


import monacoEditorPlugin, {type IMonacoEditorOpts} from 'vite-plugin-monaco-editor';
const monacoEditorPluginDefault = ((monacoEditorPlugin as any).default) as (options: IMonacoEditorOpts) => any;

// @ts-ignore
export default defineConfig({
    plugins: [
        react({
            babel: {
                parserOpts: {
                    plugins: ['decorators-legacy', 'classProperties']
                }
            }
        }),
        svgr({
            exportAsDefault: true,
            svgrOptions: {
                svgProps: {
                    className: 'icon'
                },
                prettier: false,
                dimensions: false
            }
        }),
        monacoEditorPluginDefault({}),
    ],
    server: {
        host: '0.0.0.0',
    },
})