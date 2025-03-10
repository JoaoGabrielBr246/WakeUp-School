 // Função para buscar os devocionais de Teologia do servidor
 async function fetchTeologia() {
    try {
        const response = await fetch('http://localhost:3000/api/posts/topico/TEOLOGIA');
        if (!response.ok) {
            throw new Error('Erro ao buscar os devocionais de teologia: ' + response.statusText);
        }
        const teologiaPosts = await response.json();

        const teologiaList = document.getElementById('teologia-list');
        teologiaPosts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.textContent = post.titulo;
            // Adiciona um evento de clique ao título
            listItem.addEventListener('click', () => openTeologiaModal(post));
            teologiaList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar devocionais de teologia:', error);
    }
}

// Função para abrir o modal de Teologia
function openTeologiaModal(post) {
    document.getElementById('modalTitle').textContent = post.titulo;
    document.getElementById('modalSubtitle').textContent = post.subtitulo || ''; // Adiciona subtítulo se existir
    document.getElementById('modalContent').innerHTML = post.conteudo; // Exibe o conteúdo
    document.getElementById('teologiaModal').style.display = 'block'; // Exibe o modal
}

// Função para fechar o modal
document.getElementById('closeTeologiaModal').onclick = function() {
    document.getElementById('teologiaModal').style.display = 'none'; // Oculta o modal
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('teologiaModal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Oculta o modal
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchTeologia);