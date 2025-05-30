// ===============================
// Validação de CNPJ
// ===============================
function validarCNPJ() {
  const cnpj = document.getElementById("inputCNPJ").value.replace(/[^\d]+/g, '');
  const mensagem = document.getElementById("mensagem-cnpj");

  if (!cnpj || cnpj.length !== 14) {
    mensagem.textContent = "CNPJ inválido";
    return false;
  }

  // Validação de dígitos verificadores
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(0))) {
    mensagem.textContent = "CNPJ inválido";
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != parseInt(digitos.charAt(1))) {
    mensagem.textContent = "CNPJ inválido";
    return false;
  }

  mensagem.textContent = "";
  return true;
}

// ===============================
// Consulta de CEP com ViaCEP
// ===============================
function buscarCEP() {
  const cep = document.getElementById('inputCEPCompany').value.replace(/\D/g, '');
  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert('CEP não encontrado!');
        return;
      }

      document.getElementById('inputAddressCompany').value = data.logradouro || '';
      document.getElementById('inputNeighborhoodCompany').value = data.bairro || '';
      document.getElementById('inputCityCompany').value = data.localidade || '';
      document.getElementById('inputUFCompany').value = data.uf || '';
    })
    .catch(() => alert('Erro ao buscar o CEP'));
}

// ===============================
// Buscar empresa por nome
// ===============================
function searchName() {
  const name = document.getElementById('searchCompany').value.trim();
  if (name) {
    alert(`Buscar empresa: ${name}`);
    // Aqui você pode futuramente conectar com o banco e fazer uma busca real
  }
}

// ===============================
// Criar empresa
// ===============================
document.getElementById('btnCreate').addEventListener('click', (e) => {
  e.preventDefault();

  if (!validarCNPJ()) return;

  alert('Empresa adicionada com sucesso!');
  resetForm();
});

// ===============================
// Editar empresa
// ===============================
document.getElementById('btnUpdate').addEventListener('click', (e) => {
  e.preventDefault();

  if (!validarCNPJ()) return;

  alert('Empresa atualizada com sucesso!');
});

// ===============================
// Excluir empresa
// ===============================
function removeCompany() {
  const confirmation = confirm('Tem certeza que deseja excluir esta empresa?');
  if (confirmation) {
    alert('Empresa excluída!');
    resetForm();
  }
}

// ===============================
// Limpar formulário
// ===============================
function resetForm() {
  document.getElementById('formCompany').reset();
  document.getElementById('mensagem-cnpj').textContent = '';
}
