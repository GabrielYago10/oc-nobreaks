// Função para validar CNPJ
function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs inválidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado == digitos.charAt(1);
}

// Consulta o endereço pelo CEP via API ViaCEP
document.getElementById("cep").addEventListener("blur", async () => {
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  if (cep.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      return;
    }

    document.getElementById("rua").value = data.logradouro;
    document.getElementById("bairro").value = data.bairro;
    document.getElementById("cidade").value = data.localidade;
    document.getElementById("estado").value = data.uf;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    alert("Erro ao buscar o CEP. Tente novamente.");
  }
});

// Envio do formulário
document.getElementById("formCliente").addEventListener("submit", (e) => {
  e.preventDefault();

  const cnpj = document.getElementById("cnpj").value;
  if (!validarCNPJ(cnpj)) {
    alert("CNPJ inválido. Verifique e tente novamente.");
    return;
  }

  const cliente = {
    razaoSocial: document.getElementById("razaoSocial").value,
    nomeFantasia: document.getElementById("nomeFantasia").value,
    cnpj,
    ie: document.getElementById("ie").value,
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    numero: document.getElementById("numero").value,
    complemento: document.getElementById("complemento").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value,
    telefone: document.getElementById("telefone").value,
    celular: document.getElementById("celular").value,
    email: document.getElementById("email").value,
    responsavel: document.getElementById("responsavel").value,
    cargo: document.getElementById("cargo").value,
    observacoes: document.getElementById("observacoes").value
  };

  console.log("Cliente cadastrado:", cliente);

  alert("Cliente cadastrado com sucesso!");
  document.getElementById("formCliente").reset();
});
