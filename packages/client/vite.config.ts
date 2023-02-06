import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  // console.log(`config mode`, mode)
  // console.log(`config process.env`, process.env)
  // console.log(`config NODE_ENV`, process.env.NODE_ENV)

  return {
    // define: {
    //   'process.env.NODE_ENV': process.env.NODE_ENV,
    // },
  }
})
