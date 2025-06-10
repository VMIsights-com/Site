// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Pre-declare navLinks for broader scope, as it's used in multiple sections
    const navLinks = document.querySelectorAll('nav ul li a');

    // =================================================================
    // 1. Funcionalidade de Slideshow de Fundo (Apenas para index.html)
    // =================================================================
    const slideshowContainer = document.querySelector('.background-slideshow');
    if (slideshowContainer) { // Só executa se o container do slideshow existir na página
        const images = slideshowContainer.querySelectorAll('img');
        let currentImageIndex = 0;

        function showNextImage() {
            // Remove a classe 'active' da imagem atual
            if (images.length > 0) {
                images[currentImageIndex].classList.remove('active');

                // Calcula o índice da próxima imagem
                currentImageIndex = (currentImageIndex + 1) % images.length;

                // Adiciona a classe 'active' à próxima imagem
                images[currentImageIndex].classList.add('active');
            }
        }

        // Exibe a primeira imagem imediatamente
        if (images.length > 0) {
            images[currentImageIndex].classList.add('active');
        }

        // Inicia o slideshow (muda a cada 5 segundos)
        // Só inicia o slideshow se houver mais de uma imagem para evitar erros e ciclos desnecessários
        if (images.length > 1) {
            setInterval(showNextImage, 5000);
        }
    }

    // =================================================================
    // 2. Navegação Suave (Smooth Scrolling) para âncoras internas
    // =================================================================
    navLinks.forEach(anchor => { // Using the globally declared navLinks
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Verifica se é um link interno para uma âncora (começa com #)
            // E se o hash não é vazio (ex: href="#")
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault(); // Previne o comportamento padrão do link para rolagem suave

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Opcional: Atualiza a URL sem recarregar a página para o histórico de navegação
                    history.pushState(null, '', targetId);

                    // Lógica para marcar o link ativo APENAS se for um link interno na mesma página
                    // Remove 'active' de todos os links de navegação e adiciona ao clicado
                    navLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
            // Se não for um link interno (#), o comportamento padrão de navegação para outras páginas é mantido
        });
    });

    // =================================================================
    // 3. Funcionalidade de Scroll Reveal
    // =================================================================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    if (scrollRevealElements.length > 0) {
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // O elemento se torna visível quando 10% dele está na viewport
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Para a animação ocorrer apenas uma vez
                }
            });
        }, observerOptions);

        scrollRevealElements.forEach(element => {
            observer.observe(element);
        });
    }

    // =================================================================
    // 4. Feedback Visual no Formulário de Contato
    // =================================================================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) { // Só executa se o formulário de contato existir
        const formInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');

        formInputs.forEach(input => {
            // Adiciona classe 'focused' quando o campo está em foco
            input.addEventListener('focus', function() {
                this.classList.add('focused');
            });

            // Remove a classe 'focused' quando o campo perde o foco
            input.addEventListener('blur', function() {
                this.classList.remove('focused');
                // Adiciona/remove 'filled' com base no conteúdo
                if (this.value.trim() !== '') {
                    this.classList.add('filled');
                } else {
                    this.classList.remove('filled');
                }
            });

            // Adiciona a classe 'filled' se o campo já tiver conteúdo ao carregar a página
            if (input.value.trim() !== '') {
                input.classList.add('filled');
            }
        });

        // Opcional: Adicionar validação básica no submit
        contactForm.addEventListener('submit', function(event) {
            let isValid = true;
            formInputs.forEach(input => {
                // Para campos obrigatórios (adicione o atributo 'required' no HTML)
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = 'red'; // Feedback visual de erro
                } else {
                    input.style.borderColor = ''; // Reseta a borda
                }
            });

            if (!isValid) {
                event.preventDefault(); // Impede o envio do formulário se houver campos obrigatórios vazios
                alert('Por favor, preencha todos os campos obrigatórios.');
            } else {
                // Aqui você pode adicionar lógica para enviar o formulário via AJAX,
                // ou simplesmente permitir o envio normal
                alert('Mensagem enviada com sucesso!');
                // event.preventDefault(); // Opcional: se for enviar via AJAX e não quiser recarregar
            }
        });
    }

    // =================================================================
    // 5. Botão "Voltar ao Topo"
    // =================================================================
    let backToTopButton = document.getElementById('backToTopBtn');

    // Se o botão não existir no HTML, crie-o
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.id = 'backToTopBtn';
        backToTopButton.innerHTML = '&#9650;'; // Seta para cima
        document.body.appendChild(backToTopButton);

        // Estilos básicos para o botão (garanta que o CSS também tenha isso)
        // O CSS deve ter uma regra para #backToTopBtn e #backToTopBtn.show (ou .visible)
        backToTopButton.style.display = 'block'; // Block initially to allow opacity transition
        backToTopButton.style.position = 'fixed';
        backToTopButton.style.bottom = '100px'; // Acima do WhatsApp float
        backToTopButton.style.right = '40px';
        backToTopButton.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        backToTopButton.style.color = 'white';
        backToTopButton.style.border = 'none';
        backToTopButton.style.borderRadius = '50%';
        backToTopButton.style.width = '50px';
        backToTopButton.style.height = '50px';
        backToTopButton.style.fontSize = '24px';
        backToTopButton.style.cursor = 'pointer';
        backToTopButton.style.zIndex = '999';
        backToTopButton.style.transition = 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out';
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden'; // Hidden by default
    }


    // Mostra/esconde o botão ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) { // Mostra o botão após rolar 300px
            backToTopButton.style.visibility = 'visible';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden'; // Esconde após a transição
        }
    });

    // Ao clicar no botão, rola para o topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Rolagem suave
        });
    });

    // =================================================================
    // 6. Efeito de Destaque (Highlight) na Imagem de Perfil da Home
    // =================================================================
    const heroImageContainer = document.querySelector('.image-content');
    if (heroImageContainer) { // Só adiciona o efeito se o elemento existir
        heroImageContainer.addEventListener('mouseover', function() {
            this.classList.add('highlighted');
        });

        heroImageContainer.addEventListener('mouseout', function() {
            this.classList.remove('highlighted');
        });
    }

    // =================================================================
    // 7. Marcar Link de Navegação Ativo (entre páginas)
    // =================================================================
    // navLinks is already declared at the top of DOMContentLoaded
    // Pega o nome do arquivo da URL (ex: "index.html", "projetos.html")
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Remove a classe 'active' de todos os links inicialmente
        link.classList.remove('active');

        // Pega o nome do arquivo do atributo href do link
        const linkPath = link.getAttribute('href').split('/').pop();

        // Adiciona a classe 'active' ao link que corresponde à página atual
        // Lida com o caso de 'index.html' quando a URL é apenas '/' ou vazia
        if (currentPath === linkPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

}); // Fim do DOMContentLoaded