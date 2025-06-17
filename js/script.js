document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('relatoForm');
    const container = document.getElementById('relatosContainer');

    function carregarRelatos() {
        const relatos = JSON.parse(localStorage.getItem('relatosPopulares') || '[]');
        container.innerHTML = '';

        relatos.forEach(relato => {
            const post = document.createElement('article');
            post.className = 'post';
            post.innerHTML = `
                <img src="${relato.imagem}" alt="Relato">
                <div class="post-content">
                    <h2>${relato.titulo}</h2>
                    <p>${relato.descricao}</p>
                </div>
            `;
            container.appendChild(post);
        });
    }

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const titulo = document.getElementById('titulo').value;
            const descricao = document.getElementById('descricao').value;
            const imagemInput = document.getElementById('image');
            const reader = new FileReader();

            reader.onload = function () {
                const novaImagem = reader.result;
                const novoRelato = { titulo, descricao, imagem: novaImagem };
                const relatos = JSON.parse(localStorage.getItem('relatosPopulares') || '[]');
                relatos.unshift(novoRelato);
                localStorage.setItem('relatosPopulares', JSON.stringify(relatos));
                form.reset();
                carregarRelatos();
            };

            if (imagemInput.files.length > 0) {
                reader.readAsDataURL(imagemInput.files[0]);
            }
        });
    }

    carregarRelatos();
});
