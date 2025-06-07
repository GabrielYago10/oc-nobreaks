const { ipcRenderer } = require('electron');

ipcRenderer.on('abrir-relatorio-clientes', () => {
  alert('Abrir relatório de clientes');
});

ipcRenderer.on('abrir-sobre', () => {
  alert('Sistema OC Nobreaks\nVersão 1.0\nDesenvolvido por Gabriel Yago');
});

// Troca do ícone do banco de dados (usando a api do preload.js)
api.dbStatus((event, message) => {
  //teste do recebimento da mensagem do main
  console.log(message)
  if (message === "conectado") {
      document.getElementById('statusdb').src = "../public/img/dbon.png"
  } else {
      document.getElementById('statusdb').src = "../public/img/dboff.png"
  }
})
