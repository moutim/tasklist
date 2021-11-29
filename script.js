const lista = document.getElementById('lista-tarefas');
const botaoAdicionar = document.getElementById('criar-tarefa');
const inputTarefa = document.getElementById('texto-tarefa');

// Funcao para adicionar tarefas a lista
function adicionaTarefa() {
  const texto = inputTarefa.value;
  const tarefa = document.createElement('li');
  tarefa.innerText = texto;
  lista.appendChild(tarefa);

  inputTarefa.value = '';
}
botaoAdicionar.addEventListener('click', adicionaTarefa);

// Mudar cor da tarefa clicada
function mudaCor(event) {
  const li = document.getElementsByTagName('li');
  for (let i of li) {
    i.classList.remove('selected');
  }
  const tarefa = event.target;
  tarefa.classList.add('selected');
}
lista.addEventListener('click', mudaCor);

// Tarefa concluida
function tarefaConcluida(event) {
  const tarefa = event.target;
  tarefa.classList.toggle('completed');
}
lista.addEventListener('dblclick', tarefaConcluida);

// Limpa todas as tarefas
const botaoLimpar = document.getElementById('apaga-tudo');
function limpaTarefas() {
  const tarefas = document.getElementById('lista-tarefas');
  tarefas.innerHTML = '';
}
botaoLimpar.addEventListener('click', limpaTarefas);

// Remove tarefas concluidas
const botaoFinalizados = document.getElementById('remover-finalizados');
function removerFinalizados() {
  const finalizadas = document.getElementsByClassName('completed');
  for (let i = finalizadas.length - 1; 0 < finalizadas.length; i -= 1) {
    finalizadas[i].remove();
  }
}
botaoFinalizados.addEventListener('click', removerFinalizados);

// Salvar estado atual da lista
const botaoSalvar = document.getElementById('salvar-tarefas');
function salvaTarefas() {
  const tarefas = lista.innerHTML;
  localStorage.setItem('tarefas', tarefas);
}
botaoSalvar.addEventListener('click', salvaTarefas);

// Mover tarefas de lugar
const botaoCima = document.getElementById('mover-cima');
const botaoBaixo = document.getElementById('mover-baixo');
function moverCima() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.previousElementSibling !== null) {
    selected.parentNode.insertBefore(selected, selected.previousElementSibling);
  }
}
function moverBaixo() {
  const selected = document.querySelector('.selected');
  if (selected !== null && selected.nextElementSibling !== null) {
    selected.parentNode.insertBefore(selected.nextSibling, selected);
  }
}
botaoCima.addEventListener('click', moverCima);
botaoBaixo.addEventListener('click', moverBaixo);

// Remover selecionado
const botaoRemover = document.getElementById('remover-selecionado');
function removeSelecionado() {
  let li = document.getElementsByTagName('li');
  for (let i of li) {
    if (i.classList.contains('selected')) {
      i.remove();
    }
  }
}
botaoRemover.addEventListener('click', removeSelecionado);

window.onload = function () {
  const carregaTarefas = localStorage.getItem('tarefas');
  lista.innerHTML = carregaTarefas;
};
