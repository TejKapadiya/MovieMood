import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api/users':{
        target:"http://localhost:5000",
        changeOrigin:true,
        secure:false
      },
      '/api/artists':{
        target:"http://localhost:5000",
        changeOrigin:true,
        secure:false
      },
      '/api/images':{
        target:"http://localhost:5000",
        changeOrigin:true,
        secure:false
      },
      '/api/movies':{
        target:"http://localhost:5000",
        changeOrigin:true,
        secure:false
      }
      // '/movies':{
      //   target:"http://localhost:5000",
      //   changeOrigin:true,
      //   secure:false
      // }
    }
  }
})
