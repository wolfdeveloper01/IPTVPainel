let channels = []; // Lista de canais
let currentChannelIndex = 0;

// Função para buscar e carregar o arquivo .m3u da URL
function loadM3U(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            channels = parseM3U(data);
            if (channels.length > 0) {
                loadChannel(0);
                document.getElementById('status').textContent = "Playing first channel.";
            } else {
                document.getElementById('status').textContent = "No valid channels found in the file.";
            }
        })
        .catch(error => {
            document.getElementById('status').textContent = "Failed to load channels.";
            console.error("Error loading .m3u file:", error);
        });
}

// Função para extrair URLs dos canais do arquivo .m3u
function parseM3U(content) {
    const lines = content.split('\n');
    return lines.filter(line => line.trim().startsWith('http'));
}

// Carregar um canal
function loadChannel(index) {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = channels[index];
    currentChannelIndex = index;
    document.getElementById('status').textContent = `Playing channel ${index + 1}/${channels.length}`;
}

// Alternar entre canais
document.getElementById('prevChannel').addEventListener('click', function() {
    if (currentChannelIndex > 0) {
        loadChannel(currentChannelIndex - 1);
    } else {
        document.getElementById('status').textContent = "You're on the first channel.";
    }
});

document.getElementById('nextChannel').addEventListener('click', function() {
    if (currentChannelIndex < channels.length - 1) {
        loadChannel(currentChannelIndex + 1);
    } else {
        document.getElementById('status').textContent = "You're on the last channel.";
    }
});

// Carregar canais da URL do arquivo .m3u
loadM3U('https://lib.bz/br.m3u');
