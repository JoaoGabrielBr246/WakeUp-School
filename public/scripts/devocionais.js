// Função para buscar os devocionais do servidor
async function fetchDevocionais() {
    try {
        const response = await fetch('http://localhost:3000/api/posts/topico/DEVOCIONAIS');
        if (!response.ok) {
            throw new Error('Erro ao buscar os devocionais: ' + response.statusText);
        }
        const devocionais = await response.json();
        const devocionaisList = document.getElementById('devocionais-list');
        devocionais.forEach(devocional => {
            const listItem = document.createElement('li');
            listItem.textContent = devocional.titulo;
            listItem.addEventListener('click', () => openModal(devocional));
            devocionaisList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao buscar devocionais:', error);
    }
}

function openModal(data) {
    document.getElementById("modalTitle").textContent = data.titulo; // Título
    document.getElementById("modalSubtitle").textContent = data.subtitulo; // Subtítulo
    document.getElementById("modalContent").innerHTML = data.conteudo; // Conteúdo (HTML)
    document.getElementById("devocionalModal").style.display = "block"; // Abre a modal
}

// Fechar a modal ao clicar no 'x'
document.getElementById("closeModal").onclick = function () {
    document.getElementById("devocionalModal").style.display = "none"; // Fecha a modal
}

// Adiciona o evento de clique ao botão de fechar
document.getElementById('closeModal').addEventListener('click', closeModal);


// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
    const modal = document.getElementById('devocionalModal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Oculta o modal
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', fetchDevocionais);