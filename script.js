document.addEventListener("DOMContentLoaded", function() {
    // Array de páginas
    const pages = document.querySelectorAll(".page-content");
    let currentPageIndex = 0;
    let isPageMarked = false; // Variável para controlar se a página está marcada
    let markedIndicator; // Variável para armazenar a referência ao marcador da página

    // Seletor para os botões de controle
    const controlButtons = document.querySelector(".controls");

    // Seletor para o painel de configurações
    const settingsPanel = document.getElementById("settingsPanel");

    // Seletor para o botão de configurações
    const settingsBtn = document.getElementById("settingsBtn");

    // Função para mostrar os botões de forma sutil e lenta
    function showButtons() {
        controlButtons.style.opacity = "1";
        controlButtons.style.transition = "opacity 0.3s ease"; // Transição sutil e lenta
    }

    // Função para esconder os botões
    function hideButtons() {
        controlButtons.style.opacity = "0";
    }

    // Temporizador para esconder os botões após 3 segundos de inatividade do mouse
    let timeout;

    // Adicionar evento de movimento do mouse para mostrar os botões
    document.addEventListener("mousemove", function() {
        showButtons();

        // Reiniciar o temporizador para esconder os botões após 3 segundos
        clearTimeout(timeout);
        timeout = setTimeout(hideButtons, 3000);
    });

    // Ocultar os botões inicialmente
    hideButtons();

    // Botão de avançar página
    document.getElementById("nextBtn").addEventListener("click", function() {
        nextPage();
    });

    // Botão de voltar página
    document.getElementById("prevBtn").addEventListener("click", function() {
        prevPage();
    });

    // Botão de marcar página
    document.getElementById("bookmarkBtn").addEventListener("click", function() {
        toggleMarkPage(currentPageIndex);
    });

    // Função para mostrar a página atual
    function showPage(index) {
        pages.forEach(function(page, pageIndex) {
            page.style.display = pageIndex === index ? "block" : "none";
        });
        updateProgress();
    }

    // Função para avançar para a próxima página
    function nextPage() {
        if (currentPageIndex < pages.length - 1) {
            currentPageIndex++;
            showPage(currentPageIndex);
        }
    }

    // Função para voltar para a página anterior
    function prevPage() {
        if (currentPageIndex > 0) {
            currentPageIndex--;
            showPage(currentPageIndex);
        }
    }

    // Função para marcar ou desmarcar a página atual
    function toggleMarkPage(index) {
        const pageTitle = pages[index].querySelector("h2");

        if (!isPageMarked) {
            markedIndicator = document.createElement("span");
            markedIndicator.className = "marked-page-indicator";
            markedIndicator.textContent = "🔖"; // Ícone de marcador, pode ser substituído por qualquer outro ícone ou texto
            pageTitle.appendChild(markedIndicator);
            isPageMarked = true;
        } else {
            pageTitle.removeChild(markedIndicator);
            isPageMarked = false;
        }
    }

    // Função para mostrar ou ocultar o menu flutuante de configurações
    function toggleSettingsPanel() {
        settingsPanel.classList.toggle("hidden");
    }

    // Botão de abrir/fechar configurações
    settingsBtn.addEventListener("click", function() {
        toggleSettingsPanel();
    });

    // Configurações de tema, tamanho de fonte e espaçamento entre linhas
    document.getElementById("themeSelect").addEventListener("change", function() {
        document.body.classList.toggle("dark-theme", this.value === "dark");
    });

    document.getElementById("fontSizeInput").addEventListener("input", function() {
        document.body.style.fontSize = this.value + "px";
    });

    document.getElementById("lineHeightInput").addEventListener("input", function() {
        document.body.style.lineHeight = this.value;
    });

    // Recuperar marcador da página do localStorage
    const bookmark = localStorage.getItem("bookmark");
    if (bookmark !== null) {
        currentPageIndex = parseInt(bookmark);
        showPage(currentPageIndex);
    } else {
        showPage(currentPageIndex);
    }

    // Atualizar barra de progresso
    function updateProgress() {
        const progress = ((currentPageIndex + 1) / pages.length) * 100;
        document.getElementById("progress").style.width = progress + "%";
    }
});
