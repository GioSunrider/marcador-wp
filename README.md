🏊 Marcador de Waterpolo - Aplicación Multiplataforma
Aplicación profesional para gestión de marcadores y temporizadores de partidos de waterpolo.

https://img.shields.io/badge/Platform-Windows%2520%257C%2520macOS%2520%257C%2520Linux-blue
https://img.shields.io/badge/Built%2520with-Electron-47848F
https://img.shields.io/badge/Version-1.0.0-green
https://img.shields.io/badge/License-MIT-yellow

📋 Tabla de Contenidos
Características

Capturas de Pantalla

Instalación

Uso

Estructura del Proyecto

Construcción

Atajos de Teclado

Tecnologías

Contribución

Licencia

Soporte

✨ Características
🎯 Funcionalidades Principales
✅ Marcador completo con control de puntuación para ambos equipos

✅ Temporizador de partido ajustable (1-20 minutos)

✅ Temporizador de posesión (30/20 segundos) con pausa automática

✅ Control de tiempos muertos (2 por equipo)

✅ Vista pública para pantallas grandes/proyectores

✅ Ventanas independientes para temporizadores

✅ Título personalizable (Liga, Jornada, etc.)

✅ Sonidos para posesión terminada y goles

✅ Notificaciones del sistema

🔄 Sincronización
Tiempo real entre todas las ventanas

Persistencia automática de datos

Exportación/Importación de partidos

Sincronización a través de localStorage

🎨 Interfaz
Diseño moderno y profesional

Tema oscuro optimizado para pantallas

Responsive para diferentes resoluciones

Animaciones y transiciones suaves

Iconografía Font Awesome

📸 Capturas de Pantalla
Panel de Control Principal
text
┌─────────────────────────────────────────────────────────────┐
│  🏊 PANEL DE CONTROL - MARCADOR DE WATERPOLO                │
│  Liga Nacional - Jornada 5                                  │
│                                                             │
│  [EQUIPO LOCAL]        [CONTROLES]        [EQUIPO VISIT.]  │
│  ⚽ 0                   ⏱️ 08:00           ⚽ 0             │
│  T.M: ● ○              ⏱️ 30s             T.M: ○ ○        │
│                                                             │
│  [TEMPORIZADORES]      [VENTANAS]        [CONFIGURACIÓN]   │
└─────────────────────────────────────────────────────────────┘
Vista Pública
text
┌─────────────────────────────────────────────────────────────┐
│  LIGA NACIONAL - JORNADA 5 - WATERPOLO EN DIRECTO          │
│                                                             │
│  LOCAL           8:00 | 30s           VISITANTE            │
│  ⚽ 5             EN CURSO            ⚽ 3                  │
│  T.M: ● ●        PERIODO 2           T.M: ● ○             │
└─────────────────────────────────────────────────────────────┘
🚀 Instalación
📦 Método 1: Ejecutable (Recomendado)
Descarga el ejecutable para tu sistema desde Releases

Ejecuta el archivo:

Windows: Waterpolo-Scoreboard-Setup.exe

macOS: Waterpolo-Scoreboard.dmg

Linux: Waterpolo-Scoreboard.AppImage

🔧 Método 2: Desarrollo/Compilación
Requisitos Previos
Node.js 16 o superior

npm o yarn

Git (opcional)

Pasos de Instalación
bash
# 1. Clonar/Descargar el proyecto
git clone https://github.com/tuusuario/waterpolo-scoreboard.git
cd waterpolo-scoreboard

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm start
🎮 Uso
Primeros Pasos
Abrir la aplicación (ejecutable o npm start)

Configurar equipos:

Ingresa nombres de equipos

Opcional: añade URLs de logos

Haz clic en "Guardar Cambios"

Establecer título: Escribe la liga y jornada

Configurar temporizadores:

Duración del periodo (default: 8 minutos)

Tiempo de posesión (30s o 20s)

Durante el Partido
Control de marcador: Botones +/- para cada equipo

Tiempos muertos: Click en botones +/- debajo de cada equipo

Temporizadores:

Iniciar Ambos: Comienza partido y posesión

Pausar Ambos: Pausa ambos temporizadores

Reiniciar Ambos: Vuelve a tiempos iniciales

Vista pública: Botón "Abrir Vista Pública"

Ventanas temporizadores: Botones "Ventana Posesión 1/2"

Funciones Especiales
Pausa automática: Cuando la posesión llega a 0, ambos temporizadores se pausan automáticamente

Sonidos: Se reproduce sonido cuando la posesión termina

Notificaciones: (Opcional) Notificaciones del sistema para eventos importantes

📁 Estructura del Proyecto
text
waterpolo-scoreboard/
├── index.html                 # Interfaz principal del panel de control
├── public-view.html           # Vista pública para pantallas/proyectores
├── possession1.html           # Ventana independiente temporizador 1
├── possession2.html           # Ventana independiente temporizador 2 (con marcador)
├── main.js                    # Proceso principal Electron
├── preload.js                 # Script de pre-carga (seguridad)
├── package.json               # Configuración del proyecto y dependencias
├── README.md                  # Este archivo
├── build/                     # Iconos de la aplicación
│   ├── icon.ico              # Icono para Windows
│   ├── icon.icns             # Icono para macOS
│   └── icon.png              # Icono para Linux
└── dist/                      # Ejecutables generados (después de build)
🔨 Construcción de Ejecutables
Construir para tu sistema
bash
# Windows (exe/msi)
npm run build:win

# macOS (dmg/zip)
npm run build:mac

# Linux (AppImage/deb/rpm)
npm run build:linux
Construir para todas las plataformas
bash
npm run build:all
Los ejecutables se generarán en la carpeta dist/.

Distribuir la Aplicación
Windows: .exe (instalador) y .msi

macOS: .dmg (disco) y .zip

Linux: .AppImage (portable), .deb (Debian/Ubuntu), .rpm (Fedora)

⌨️ Atajos de Teclado
Globales (Panel de Control)
Atajo	Acción
Ctrl + P	Abrir vista pública
Ctrl + 1	Abrir ventana posesión 1
Ctrl + 2	Abrir ventana posesión 2
Ctrl + E	Exportar datos del partido
Ctrl + I	Importar datos del partido
Ctrl + Q	Salir de la aplicación
Marcador
Acción	Método
Aumentar puntuación	Botón + o clic en puntuación
Disminuir puntuación	Botón -
Añadir tiempo muerto	Botón + en sección tiempos
Quitar tiempo muerto	Botón - en sección tiempos
Temporizadores
Botón	Función
▶️ Iniciar Ambos	Comienza ambos temporizadores
⏸️ Pausar Ambos	Pausa ambos temporizadores
🔄 Reiniciar Ambos	Vuelve a tiempos iniciales
⏮️ Periodo Anterior	Cambia al periodo anterior
⏭️ Periodo Siguiente	Cambia al periodo siguiente
🛠️ Tecnologías
Frontend:

HTML5, CSS3, JavaScript (ES6+)

Font Awesome 6.4.0 (iconos)

CSS Grid & Flexbox (diseño)

LocalStorage (sincronización)

Backend/Desktop:

Electron.js 28.0.0 (aplicación de escritorio)

Node.js (gestión de archivos)

electron-builder 24.9.1 (empaquetado)

Características nativas:

Menús del sistema

Notificaciones nativas

Gestión de ventanas

Acceso al sistema de archivos

Persistencia de datos

🤝 Contribución
¡Las contribuciones son bienvenidas! Sigue estos pasos:

Fork el proyecto

Crea una rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad)

Commit tus cambios (git commit -am 'Añadir nueva funcionalidad')

Push a la rama (git push origin feature/nueva-funcionalidad)

Abre un Pull Request

Guía de Estilo
Usa comentarios descriptivos en inglés o español

Mantén el código formateado consistentemente

Añade tests para nuevas funcionalidades

Documenta cambios en la API

Roadmap de Mejoras
Soporte para múltiples idiomas

Estadísticas en tiempo real

Integración con API de streaming

Modo oscuro/claro

Plantillas de equipos predefinidas

Exportación a PDF/Excel

📄 Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para detalles.

text
MIT License

Copyright (c) 2024 [Tu Nombre]

Se concede permiso, libre de cargos, a cualquier persona que obtenga una copia
de este software y de los archivos de documentación asociados (el "Software"),
para utilizar el Software sin restricción, incluyendo sin limitación los derechos
a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender
copias del Software, y permitir a las personas a las que se les proporcione el Software
hacer lo mismo...
🆘 Soporte
Problemas Comunes
La aplicación no inicia:

Verifica que tienes Node.js 16+

Ejecuta npm install nuevamente

Revisa la consola para mensajes de error

Las ventanas no se sincronizan:

Asegúrate que todas las ventanas están abiertas desde la misma instancia

Verifica que localStorage está habilitado

Recarga las ventanas secundarias

Los sonidos no funcionan:

Verifica que el navegador permite sonidos

Revisa la configuración de notificaciones

Actualiza los permisos del sitio

Recursos
📚 Documentación Electron

💬 Issues en GitHub

📧 Contacto: tuemail@ejemplo.com

Reportar Problemas
Revisa si el problema ya fue reportado en Issues

Si no existe, crea un nuevo issue con:

Descripción clara del problema

Pasos para reproducirlo

Sistema operativo y versión

Capturas de pantalla si aplica

🙏 Agradecimientos
Electron.js por hacer posible aplicaciones multiplataforma

Font Awesome por los excelentes iconos

Comunidad de código abierto por las librerías y herramientas

Testers y usuarios por sus valiosos comentarios

Desarrollado con ❤️ para la comunidad de waterpolo

¿Te gusta este proyecto? ¡Dale una estrella en GitHub! ⭐

Contacta al desarrollador
