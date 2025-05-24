const { ipcRenderer } = require('electron');

ipcRenderer.on('abrir-relatorio-clientes', () => {
  alert('Abrir relatório de clientes');
});

ipcRenderer.on('abrir-sobre', () => {
  alert('Sistema OC Nobreaks\nVersão 1.0\nDesenvolvido por Gabriel Yago');
});
