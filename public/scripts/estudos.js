 // Função para buscar os estudos temáticos do servidor
 async function fetchEstudosTematicos() {
    try {
        const response = await fetch('http://localhost:3000/api/posts/topico/ESTUDOS TEMÁTICOS');
        if (!response.ok) {
            throw new Error('Erro ao buscar os estudos temáticos: ' + response.statusText);
        }
        const estudosPosts = await response.json();

        const estudosList = document.getElementById('estudos-tematicos-list');
        estudosPosts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.textContent = post.titulo;
            // Adiciona um evento de clique ao título
            listItem.addEventListener('click', () => openEstudosModal(post));
            estudosList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar estudos temáticos:', error);
    }
}

// Função para abrir o modal de Estudos Temáticos
function openEstudosModal(post) {
    document.getElementById('modalEstudosTitle').textContent = post.titulo;
    document.getElementById('modalEstudosContent').innerHTML = post.conteudo; // Exibe o conteúdo
    document.getElementById('estudosModal').style.display = 'block'; // Exibe o modal
}

// Função para fechar o modal
document.getElementById('closeEstudosModal').onclick = function() {
    document.getElementById('estudosModal').style.display = 'none'; // Oculta o modal
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('estudosModal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Oculta o modal
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchEstudosTematicos);