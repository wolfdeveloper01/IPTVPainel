// Variável para armazenar arquivos e seus status
let files = [];

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtenha o arquivo .m3u8 carregado
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Verifica se o arquivo é válido
    if (file && file.name.endsWith('.m3u8')) {
        // Adicionar arquivo à lista com status "Ativado"
        files.push({ name: file.name, status: 'Active' });
        renderFileList();
    }

    // Limpar o input do arquivo
    fileInput.value = '';
});

// Renderizar a lista de arquivos
function renderFileList() {
    const tbody = document.querySelector('#fileList tbody');
    tbody.innerHTML = ''; // Limpar lista anterior

    // Adicionar cada arquivo à tabela
    files.forEach((file, index) => {
        const row = document.createElement('tr');
        
        // Nome do arquivo
        const nameCell = document.createElement('td');
        nameCell.textContent = file.name;
        row.appendChild(nameCell);
        
        // Status do arquivo
        const statusCell = document.createElement('td');
        statusCell.textContent = file.status;
        row.appendChild(statusCell);

        // Botões de Ação (Ativar/Desativar)
        const actionCell = document.createElement('td');
        const actionButton = document.createElement('button');
        actionButton.textContent = file.status === 'Active' ? 'Deactivate' : 'Activate';
        actionButton.className = file.status === 'Active' ? 'deactivate' : 'activate';
        
        // Adicionar evento ao botão de ativação/desativação
        actionButton.addEventListener('click', function() {
            toggleStatus(index);
        });
        
        actionCell.appendChild(actionButton);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    });
}

// Alternar status de ativado/desativado
function toggleStatus(index) {
    if (files[index].status === 'Active') {
        files[index].status = 'Inactive';
    } else {
        files[index].status = 'Active';
    }
    renderFileList();
}
