import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        allowedHosts: ['374c5cab1a01.ngrok-free.app'],
    },
})
