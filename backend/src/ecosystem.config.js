require('dotenv').config();

module.exports = {
    apps: [
      {
        name: "backend", // Nombre del proceso en PM2
        script: "server.js", // Archivo principal de tu backend
        instances: 1, // Número de instancias (1 para una app normal, "max" para todas las CPUs disponibles)
        autorestart: true, // Reiniciar automáticamente si falla
        watch: false, // No observar cambios (en producción)
        max_memory_restart: "300M", // Reiniciar si usa más de 300MB de RAM
        env: {
          NODE_ENV: "development", // Variables de entorno para desarrollo
          PORT: process.env.PORT || 3000, // Puerto para desarrollo
        },
        env_production: {
          NODE_ENV: "production", // Variables de entorno para producción
          PORT: process.env.PORT || 8080, // Puerto para producción
        },
      },
    ],
  };
  