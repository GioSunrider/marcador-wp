const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let publicViewWindow = null;
let possession1Window = null;
let possession2Window = null;

// Configuración de archivos de datos
const userDataPath = app.getPath('userData');
const dataFilePath = path.join(userDataPath, 'waterpolo_data.json');

// Función para crear la ventana principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Cargar el archivo HTML principal
  mainWindow.loadFile('index.html');

  // Crear menú personalizado
  createMenu();

  // Cargar datos guardados al iniciar
  loadSavedData();

  // Manejar cierre de ventana
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Crear menú de la aplicación
function createMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Abrir Vista Pública',
          accelerator: 'CmdOrCtrl+P',
          click: () => openPublicView()
        },
        {
          label: 'Exportar Datos',
          accelerator: 'CmdOrCtrl+E',
          click: () => exportData()
        },
        {
          label: 'Importar Datos',
          accelerator: 'CmdOrCtrl+I',
          click: () => importData()
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Ventanas',
      submenu: [
        {
          label: 'Ventana Posesión 1',
          accelerator: 'CmdOrCtrl+1',
          click: () => openPossessionWindow(1)
        },
        {
          label: 'Ventana Posesión 2',
          accelerator: 'CmdOrCtrl+2',
          click: () => openPossessionWindow(2)
        },
        { type: 'separator' },
        {
          label: 'Minimizar',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Cerrar todas las ventanas',
          click: () => closeAllWindows()
        }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: () => showAboutDialog()
        },
        {
          label: 'Documentación',
          click: () => openDocumentation()
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Abrir vista pública
function openPublicView() {
  if (publicViewWindow && !publicViewWindow.isDestroyed()) {
    publicViewWindow.focus();
    return;
  }

  publicViewWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    minWidth: 800,
    minHeight: 600,
    title: 'Marcador Público - Waterpolo',
    icon: path.join(__dirname, 'build', 'icon.png'),
    frame: true,
    alwaysOnTop: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  publicViewWindow.loadFile('public-view.html');
  
  publicViewWindow.on('closed', () => {
    publicViewWindow = null;
  });
}

// Abrir ventana de posesión
function openPossessionWindow(num) {
  let targetWindow = num === 1 ? possession1Window : possession2Window;
  
  if (targetWindow && !targetWindow.isDestroyed()) {
    targetWindow.focus();
    return;
  }

  targetWindow = new BrowserWindow({
    width: 550,
    height: 550,
    title: `Temporizador de Posesión ${num}`,
    icon: path.join(__dirname, 'build', 'icon.png'),
    frame: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  targetWindow.loadFile(`possession${num}.html`);
  
  targetWindow.on('closed', () => {
    if (num === 1) {
      possession1Window = null;
    } else {
      possession2Window = null;
    }
  });

  if (num === 1) possession1Window = targetWindow;
  else possession2Window = targetWindow;
}

// Cerrar todas las ventanas
function closeAllWindows() {
  if (publicViewWindow && !publicViewWindow.isDestroyed()) {
    publicViewWindow.close();
  }
  if (possession1Window && !possession1Window.isDestroyed()) {
    possession1Window.close();
  }
  if (possession2Window && !possession2Window.isDestroyed()) {
    possession2Window.close();
  }
}

// Mostrar diálogo Acerca de
function showAboutDialog() {
  dialog.showMessageBox({
    type: 'info',
    title: 'Acerca de Marcador de Waterpolo',
    message: 'Marcador de Waterpolo',
    detail: `Versión 1.0.0\n\nAplicación para gestión de marcadores y temporizadores de partidos de waterpolo.\n\nCaracterísticas:\n• Marcador con tiempos muertos\n• Temporizadores sincronizados\n• Pausa automática al terminar posesión\n• Vista pública y ventanas independientes\n• Multiplataforma (Windows, macOS, Linux)`,
    buttons: ['Aceptar']
  });
}

// Abrir documentación
function openDocumentation() {
  const docsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Documentación - Marcador de Waterpolo'
  });

  const docsHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { color: #0a2463; }
        h2 { color: #1a3d7a; }
        .section { margin-bottom: 30px; }
        code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
      </style>
    </head>
    <body>
      <h1>📖 Documentación - Marcador de Waterpolo</h1>
      
      <div class="section">
        <h2>📋 Funcionalidades Principales</h2>
        <ul>
          <li><strong>Marcador:</strong> Control de puntuación para ambos equipos</li>
          <li><strong>Tiempos muertos:</strong> Seguimiento de tiempos usados (máximo 2 por equipo)</li>
          <li><strong>Temporizador de partido:</strong> Cronómetro principal ajustable (1-20 minutos)</li>
          <li><strong>Temporizador de posesión:</strong> Cronómetro de 30/20 segundos con pausa automática</li>
          <li><strong>Vista pública:</strong> Ventana para mostrar al público</li>
          <li><strong>Ventanas independientes:</strong> Temporizadores en ventanas separadas</li>
        </ul>
      </div>
      
      <div class="section">
        <h2>🎯 Atajos de Teclado</h2>
        <ul>
          <li><code>Ctrl+P</code>: Abrir vista pública</li>
          <li><code>Ctrl+1</code>: Abrir ventana posesión 1</li>
          <li><code>Ctrl+2</code>: Abrir ventana posesión 2</li>
          <li><code>Ctrl+E</code>: Exportar datos</li>
          <li><code>Ctrl+I</code>: Importar datos</li>
          <li><code>Ctrl+Q</code>: Salir de la aplicación</li>
        </ul>
      </div>
    </body>
    </html>
  `;

  docsWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(docsHTML)}`);
}

// Exportar datos a archivo
function exportData() {
  dialog.showSaveDialog(mainWindow, {
    title: 'Exportar datos del partido',
    defaultPath: `waterpolo_partido_${new Date().toISOString().split('T')[0]}.json`,
    filters: [
      { name: 'Archivos JSON', extensions: ['json'] },
      { name: 'Todos los archivos', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePath) {
      fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
          dialog.showErrorBox('Error', 'No se pudieron cargar los datos para exportar');
          return;
        }
        
        fs.writeFile(result.filePath, data, 'utf8', (writeErr) => {
          if (writeErr) {
            dialog.showErrorBox('Error', 'No se pudieron exportar los datos');
          } else {
            dialog.showMessageBox({
              type: 'info',
              title: 'Exportación exitosa',
              message: 'Datos exportados correctamente',
              buttons: ['Aceptar']
            });
          }
        });
      });
    }
  });
}

// Importar datos desde archivo
function importData() {
  dialog.showOpenDialog(mainWindow, {
    title: 'Importar datos del partido',
    filters: [
      { name: 'Archivos JSON', extensions: ['json'] },
      { name: 'Todos los archivos', extensions: ['*'] }
    ],
    properties: ['openFile']
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          dialog.showErrorBox('Error', 'No se pudo leer el archivo');
          return;
        }
        
        try {
          JSON.parse(data); // Validar que es JSON válido
          fs.writeFile(dataFilePath, data, 'utf8', (writeErr) => {
            if (writeErr) {
              dialog.showErrorBox('Error', 'No se pudieron importar los datos');
            } else {
              dialog.showMessageBox({
                type: 'info',
                title: 'Importación exitosa',
                message: 'Datos importados correctamente. Reinicia la aplicación para cargarlos.',
                buttons: ['Aceptar']
              });
            }
          });
        } catch (parseErr) {
          dialog.showErrorBox('Error', 'El archivo no contiene datos JSON válidos');
        }
      });
    }
  });
}

// Cargar datos guardados
function loadSavedData() {
  if (!fs.existsSync(dataFilePath)) {
    // Crear archivo con datos por defecto si no existe
    const defaultData = {
      localScore: 0,
      visitorScore: 0,
      localTimeoutsUsed: 0,
      visitorTimeoutsUsed: 0,
      possessionTime: 30,
      gameTimerTime: 480,
      isTimersRunning: false,
      currentPeriod: 1,
      periodDuration: 8,
      preset30Value: 30,
      preset20Value: 20,
      activePreset: '30',
      localName: 'LOCAL',
      visitorName: 'VISITANTE',
      publicTitle: 'WATERPOLO - EN DIRECTO'
    };
    
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
  }
}

// Eventos de la aplicación
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Comunicación IPC entre procesos
ipcMain.handle('save-data', (event, data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving data:', err);
    return false;
  }
});

ipcMain.handle('load-data', () => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (err) {
    console.error('Error loading data:', err);
    return null;
  }
});