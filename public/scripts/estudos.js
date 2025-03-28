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
            listItem.addEventListener('click', () => openModal(post));
            estudosList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar estudos temáticos:', error);
    }
}

function openModal(data) {
    document.getElementById("modalTitle").textContent = data.titulo;
    document.getElementById("modalSubtitle").textContent = data.subtitulo || ''; // Subtítulo opcional
    document.getElementById("modalContent").innerHTML = data.conteudo;
    document.getElementById("estudosModal").style.display = "block";
}

// Fechar modal
function closeModal() {
    document.getElementById("estudosModal").style.display = "none";
}

document.getElementById("closeModal").onclick = closeModal;

// Fechar ao clicar fora
window.onclick = function(event) {
    if (event.target === document.getElementById('estudosModal')) {
        closeModal();
    }
}

document.addEventListener('DOMContentLoaded', fetchEstudosTematicos);