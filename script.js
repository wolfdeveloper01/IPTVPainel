document.getElementById('iptvForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values from the form inputs
    const iptvUrl = document.getElementById('iptvUrl').value;
    const githubDomain = document.getElementById('githubDomain').value;

    // Generate the retransmission URL
    const retransUrl = `https://${githubDomain}/retran=${iptvUrl}.m3u8`;

    // Display the result
    document.getElementById('retransUrl').textContent = retransUrl;
    document.getElementById('result').style.display = 'block';
});
