// Efecto de escritura automática
const phrases = [
    "Aprende a crear el futuro con tus propias manos",
    "Convierte ideas en realidad digital",
    "Desarrolla soluciones que impacten al mundo"
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeWriter() {
    const typedTextElement = document.getElementById('typedText');
    const currentText = phrases[currentPhrase];
    
    if (!isDeleting) {
        typedTextElement.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;
        
        if (currentChar === currentText.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;
        
        if (currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

// Toggle sidebar
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarToggle.classList.toggle('active');
});

// Cerrar sidebar al hacer click fuera
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        sidebarToggle.classList.remove('active');
    }
});

// Toggle grupos
function toggleGroups(courseId) {
    const container = document.getElementById(courseId);
    container.classList.toggle('active');
}

function navigateToGroup(groupId) {
    const groupUrls = {
        // ▼ Ejemplo: Grupos de 4°E
        "4E-Grupo1": "https://github.com/liceo-programacion/4E-Grupo1",
        "4E-Grupo2": "https://github.com/liceo-programacion/4E-Grupo2",
        "4E-Grupo3": "https://github.com/liceo-programacion/4E-Grupo3",
        
        // ▼ Ejemplo: Grupos de 4°C
        "4C-Grupo1": "https://giarella0701.github.io/GreenMind/",
        "4C-Grupo2": "https://lisette1701.github.io/",
        "4C-Grupo3": "https://ostn0928.github.io/RecoTrashTeamThree/",
        "4C-Grupo4": "https://maxi160108.github.io/SitioWebInformativo/",
        "4C-Grupo5": "https://markvz3c.github.io/Screen-Balance/",
        
        // ▼ Ejemplo: Grupos de 3°C
        "3C-Grupo1": "https://github.com/3C-Grupo1",
        "3C-Grupo2": "https://github.com/3C-Grupo2",
        "3C-Grupo3": "https://github.com/3C-Grupo3",
        "3C-Grupo4": "https://github.com/3C-Grupo4",
        "3C-Grupo5": "https://github.com/3C-Grupo5",
        "3C-Grupo6": "https://github.com/3C-Grupo6"
    };

    // Verificar si el grupo tiene URL asignada
    if (groupUrls[groupId]) {
        // Abre en nueva pestaña (recomendado para enlaces externos)
        window.open(groupUrls[groupId], '_blank');
    } else {
        alert(`⚠️ El grupo "${groupId}" no tiene una URL asignada.\n\nPor favor, actualiza el script.js con la URL correcta.`);
    }
}

        // Animaciones de scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Filtro de proyectos
        function filterProjects(category) {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');
            
            filterBtns.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            projectCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Juego de lógica
        let gameState = [false, false, false, false, false, false, false, false, false];
        
        function initGame() {
            const cells = document.querySelectorAll('.game-cell');
            cells.forEach((cell, index) => {
                cell.addEventListener('click', () => makeMove(index));
                updateCell(cell, index);
            });
            
            // Generar estado inicial aleatorio pero solucionable
            resetGame();
        }
        
        function makeMove(index) {
            const adjacents = getAdjacents(index);
            
            // Toggle la celda clickeada y sus adyacentes
            [index, ...adjacents].forEach(i => {
                if (i >= 0 && i < 9) {
                    gameState[i] = !gameState[i];
                    const cell = document.querySelector(`[data-index="${i}"]`);
                    updateCell(cell, i);
                }
            });
            
            checkWin();
        }
        
        function getAdjacents(index) {
            const adjacents = [];
            const row = Math.floor(index / 3);
            const col = index % 3;
            
            // Arriba, abajo, izquierda, derecha
            if (row > 0) adjacents.push(index - 3);
            if (row < 2) adjacents.push(index + 3);
            if (col > 0) adjacents.push(index - 1);
            if (col < 2) adjacents.push(index + 1);
            
            return adjacents;
        }
        
        function updateCell(cell, index) {
            if (gameState[index]) {
                cell.classList.add('active');
                cell.innerHTML = '💡';
            } else {
                cell.classList.remove('active');
                cell.innerHTML = '';
            }
        }
        
        function checkWin() {
            const allLit = gameState.every(state => state === true);
            const statusElement = document.getElementById('gameStatus');
            
            if (allLit) {
                statusElement.innerHTML = '🎉 ¡Felicidades! ¡Todas las luces están encendidas!';
                statusElement.style.color = '#10b981';
            } else {
                const litCount = gameState.filter(state => state).length;
                statusElement.innerHTML = `💡 Luces encendidas: ${litCount}/9`;
                statusElement.style.color = '#94a3b8';
            }
        }
        
        function resetGame() {
            // Generar un patrón inicial solucionable
            gameState = [false, true, false, true, false, true, false, true, false];
            
            const cells = document.querySelectorAll('.game-cell');
            cells.forEach((cell, index) => {
                updateCell(cell, index);
            });
            
            checkWin();
        }

        // Slider de innovación
        let currentSlide = 0;
        function moveSlider() {
            const slider = document.getElementById('innovationSlider');
            const cards = slider.children;
            const cardWidth = 370; // 350px width + 20px margin
            
            currentSlide = (currentSlide + 1) % cards.length;
            slider.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
        }

        // Animación de barras de salario
        function animateSalaryBars() {
            const salaryFills = document.querySelectorAll('.salary-fill');
            salaryFills.forEach((fill, index) => {
                setTimeout(() => {
                    const width = fill.getAttribute('data-width') || fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                }, index * 300);
            });
        }

        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Inicialización
        window.addEventListener('load', () => {
            // Iniciar efecto de escritura
            setTimeout(typeWriter, 1000);
            
            // Inicializar juego
            initGame();
            
            // Observar elementos para animaciones
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
                observer.observe(el);
            });
            
            // Iniciar slider de innovación
            setInterval(moveSlider, 4000);
            
            // Animar barras de salario cuando sean visibles
            const salarySection = document.querySelector('.salary-section');
            const salaryObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSalaryBars();
                        salaryObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            
            if (salarySection) {
                salaryObserver.observe(salarySection);
            }
        });

        // Efecto parallax sutil
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            
            if (heroContent) {
                const speed = scrolled * 0.2;
                heroContent.style.transform = `translateY(${speed}px)`;
            }
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Agregar interactividad a las tarjetas de testimonios
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'rotateY(5deg) translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateY(0deg) translateY(0px) scale(1)';
            });
        });

        // Contador animado para estadísticas (si decides agregarlo más adelante)
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                element.textContent = Math.floor(start);
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        }

        // Mensaje motivacional aleatorio
        const motivationalMessages = [
            "💡 Cada línea de código que escribas es un paso hacia el futuro",
            "🚀 Los mejores programadores empezaron exactamente donde estás tú ahora",
            "🎯 La única manera de hacer un gran trabajo es amar lo que haces",
            "💪 Los errores en programación no son fracasos, son oportunidades de aprender",
            "⭐ Tu creatividad + lógica = soluciones que cambiarán el mundo"
        ];

        function showMotivationalMessage() {
            const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
            // Se puede implementar como notificación toast si se desea
            console.log(message);
        }

        // Mostrar mensaje motivacional cada 30 segundos
        setInterval(showMotivationalMessage, 30000);