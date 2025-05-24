const { app, BrowserWindow } = require('electron');
const path = require('path');


function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    resizable: false,
    icon: path.join(__dirname, 'src', 'public', 'img', 'icon.png'), // opcional
    webPreferences: {
      preload: path.join(__dirname, 'src', 'views', 'renderer.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, 'src', 'views', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

const { Menu, shell } = require('electron');

// ...

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    resizable: false,
    icon: path.join(__dirname, 'src', 'public', 'img', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'src', 'views', 'renderer.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, 'src', 'views', 'index.html'));

  // 👉 MENU PERSONALIZADO
  const template = [
    {
      label: 'Cadastro',
      submenu: [
        {
          label: 'Sair',
          role: 'quit' // Encerra o app
        }
      ]
    },
    {
      label: 'Relatório',
      submenu: [
        {
          label: 'Clientes',
          click: () => {
            win.webContents.send('abrir-relatorio-clientes');
          }
        }
      ]
    },
    {
      label: 'Ferramentas',
      submenu: [
        { role: 'zoomIn', label: 'Aplicar Zoom' },
        { role: 'zoomOut', label: 'Reduzir' },
        { role: 'resetZoom', label: 'Restaurar Zoom' },
        { type: 'separator' },
        { role: 'reload', label: 'Recarregar' },
        { role: 'toggleDevTools', label: 'DevTools' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Repositório',
          click: () => {
            shell.openExternal('https://github.com/GabrielYago10/oc-nobreaks');
          }
        },
        {
          label: 'Sobre',
          click: () => {
            win.webContents.send('abrir-sobre');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}
