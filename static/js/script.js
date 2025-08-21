// Efecto de escritura automática
const phrases = [
    "Aprende a crear el futuro con tus propias manos",
    "Convierte ideas en realidad digital",
    "Desarrolla soluciones que impacten al mundo"
];
updateShowMoreButton
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

function typeWriter() {
    const typedTextElement = document.getElementById('typedText');
    if (!typedTextElement) return;
    
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

if (sidebarToggle && sidebar) {
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
}

// Toggle grupos
function toggleGroups(courseId) {
    const container = document.getElementById(courseId);
    if (container) {
        container.classList.toggle('active');
    }
}

function navigateToGroup(groupId) {
    const groupUrls = {
        // Grupos de 4°E
        "4E-Grupo1": "https://ignacio-alfredo.github.io/Pagina_Informativa/",
        "4E-Grupo2": "https://danyhernandezvvh.github.io/TimeWise-Healt/",
        "4E-Grupo3": "https://asistiot.netlify.app/",
        
        // Grupos de 4°C
        "4C-Grupo1": "https://giarella0701.github.io/GreenMind/",
        "4C-Grupo2": "https://lisette1701.github.io/",
        "4C-Grupo3": "https://ostn0928.github.io/RecoTrashTeamThree/",
        "4C-Grupo4": "https://maxi160108.github.io/SitioWebInformativo/",
        "4C-Grupo5": "https://markvz3c.github.io/Screen-Balance/",
        
        // Grupos de 3°C
        "3C-Grupo1": "https://yoycerg.github.io/Feria-TP-3-c/",
        "3C-Grupo2": "https://github.com/3C-Grupo2",
        "3C-Grupo3": "https://araela28103.github.io/LaserLock-website/",
        "3C-Grupo4": "https://donovansaez2025.github.io/plataforma_Alerta_Silenciosa/",
        "3C-Grupo5": "https://jheimytolentino.github.io/GreenLink/",
        "3C-Grupo6": "https://github.com/3C-Grupo6"
    };

    if (groupUrls[groupId]) {
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

// Juego de lógica
let gameState = [false, false, false, false, false, false, false, false, false];

function initGame() {
    const cells = document.querySelectorAll('.game-cell');
    if (cells.length === 0) return;
    
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
        updateCell(cell, index);
    });
    
    resetGame();
}

function makeMove(index) {
    const adjacents = getAdjacents(index);
    
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
    
    if (row > 0) adjacents.push(index - 3);
    if (row < 2) adjacents.push(index + 3);
    if (col > 0) adjacents.push(index - 1);
    if (col < 2) adjacents.push(index + 1);
    
    return adjacents;
}

function updateCell(cell, index) {
    if (!cell) return;
    
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
    
    if (statusElement) {
        if (allLit) {
            statusElement.innerHTML = '🎉 ¡Felicidades! ¡Todas las luces están encendidas!';
            statusElement.style.color = '#10b981';
        } else {
            const litCount = gameState.filter(state => state).length;
            statusElement.innerHTML = `💡 Luces encendidas: ${litCount}/9`;
            statusElement.style.color = '#94a3b8';
        }
    }
}

function resetGame() {
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
    if (!slider) return;
    
    const cards = slider.children;
    const cardWidth = 370;
    
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

// Variables globales para filtros (CORREGIDO)
let showingAllProjects = false;
let currentCategoryFilter = 'all';
let currentCourseFilter = 'all';

// Filtro de proyectos por categoría (CORREGIDO)
function filterProjects(category) {
    currentCategoryFilter = category;
    
    const filterBtns = document.querySelectorAll('.filter-btn:not(.course-btn)');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    
    // Encontrar el botón correcto y marcarlo como activo
    const activeBtn = Array.from(filterBtns).find(btn => 
        btn.textContent.toLowerCase() === category || 
        (category === 'all' && btn.textContent === 'Todos')
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    applyFilters();
}

// Filtro de proyectos por curso (CORREGIDO)
function filterByCourse(course) {
    currentCourseFilter = course;
    
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(btn => btn.classList.remove('active'));
    
    // Encontrar el botón correcto y marcarlo como activo
    const activeBtn = Array.from(courseBtns).find(btn => {
        const btnText = btn.textContent.trim();
        if (course === 'all' && btnText === 'Todos') return true;
        if (course === '4E' && btnText === '4°E') return true;
        if (course === '4C' && btnText === '4°C') return true;
        if (course === '3C' && btnText === '3°C') return true;
        return false;
    });
    
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    applyFilters();
}

// Aplicar filtros combinados (CORREGIDO)
function applyFilters() {
    const projectCards = document.querySelectorAll('.project-card');
    let visibleCount = 0;
    
    projectCards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        const cardCourse = card.dataset.course;
        
        let showCard = true;
        
        // Filtro por categoría
        if (currentCategoryFilter !== 'all' && cardCategory !== currentCategoryFilter) {
            showCard = false;
        }
        
        // Filtro por curso
        if (currentCourseFilter !== 'all' && cardCourse !== currentCourseFilter) {
            showCard = false;
        }
        
        // Si no estamos mostrando todos los proyectos, solo mostrar los que tienen data-preview
        if (!showingAllProjects && !card.hasAttribute('data-preview')) {
            showCard = false;
        }
        
        // Mostrar/ocultar tarjeta con animación
        if (showCard) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateX(50px)'; // CAMBIADO: animación desde la derecha
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, index * 100); // Delay escalonado para mejor efecto
            
            visibleCount++;
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateX(50px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Actualizar el botón "Ver más/menos"
    updateShowMoreButton();
}

// Función para actualizar el texto del botón (CORREGIDA)
function updateShowMoreButton() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (!showMoreBtn) return;
    
    const totalProjects = document.querySelectorAll('.project-card').length();
    
    if (showingAllProjects) {
        showMoreBtn.textContent = 'Ver menos proyectos';
    } else {
        showMoreBtn.textContent = `Ver todos los proyectos (${totalProjects})`
    }
}

// Toggle mostrar todos los proyectos (CORREGIDO)
function toggleAllProjects() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (!showMoreBtn) return;
    
    showingAllProjects = !showingAllProjects;
    
    // Aplicar filtros con la nueva configuración
    applyFilters();
    
    // Actualizar texto del botón
    const totalProjects = document.querySelectorAll('.project-card').length;
    if (showingAllProjects) {
        showMoreBtn.textContent = 'Ver menos proyectos';
    } else {
        showMoreBtn.textContent = `Ver todos los proyectos (${totalProjects})`;
    }
    
    console.log('Toggle projects:', showingAllProjects ? 'Mostrando todos' : 'Mostrando preview');
}

// Función para detectar scroll en sidebar y aplicar efecto de escala
function handleSidebarScroll() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    const sidebarContent = sidebar.querySelector('.sidebar-content');
    const groupItems = sidebar.querySelectorAll('.group-item');
    const creditsHeight = 140;
    
    if (!sidebarContent) return;
    
    sidebarContent.addEventListener('scroll', () => {
        const scrollTop = sidebarContent.scrollTop;
        const sidebarHeight = sidebarContent.clientHeight;
        const bottomZone = sidebarHeight - creditsHeight;
        
        groupItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();
            
            const itemTop = itemRect.top - sidebarRect.top;
            const itemBottom = itemRect.bottom - sidebarRect.top;
            
            item.classList.remove('shrinking', 'very-shrinking');
            
            if (itemBottom > bottomZone) {
                const distanceFromBottom = Math.max(0, itemBottom - bottomZone);
                const shrinkRatio = Math.min(1, distanceFromBottom / 60);
                
                if (shrinkRatio > 0.7) {
                    item.classList.add('very-shrinking');
                } else if (shrinkRatio > 0.3) {
                    item.classList.add('shrinking');
                }
            }
        });
    });
}

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

// Scroll al inicio al cargar la página
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// También al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

// Inicialización principal (MODIFICADA COMO PEDISTE)
window.addEventListener('load', () => {
    console.log('Página cargada, inicializando...');
    
    // Asegurar que esté al principio de la página
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    
    // Iniciar efecto de escritura
    setTimeout(typeWriter, 1000);
    
    // Inicializar juego
    initGame();
    
    // Observar elementos para animaciones
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Iniciar slider de innovación
    const innovationSlider = document.getElementById('innovationSlider');
    if (innovationSlider) {
        setInterval(moveSlider, 4000);
    }
    
    // Animar barras de salario cuando sean visibles
    const salarySection = document.querySelector('.salary-section');
    if (salarySection) {
        const salaryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSalaryBars();
                    salaryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        salaryObserver.observe(salarySection);
    }
    
    // Configurar vista inicial de proyectos (solo preview)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (!card.hasAttribute('data-preview')) {
            card.style.display = 'none';
        }
    });
    
    // Configurar event listeners para filtros
    setupFilterEventListeners();
    
    // Añadir el handleSidebarScroll como pediste
    handleSidebarScroll();
    
    console.log('Inicialización completa');
});

// Configurar event listeners para los filtros (NUEVA FUNCIÓN)
function setupFilterEventListeners() {
    // Filtros de categoría
    const categoryBtns = document.querySelectorAll('.projects-filter .filter-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const btnText = btn.textContent.trim().toLowerCase();
            const category = btnText === 'todos' ? 'all' : 
                            btnText === 'web' ? 'web' :
                            btnText === 'apps' ? 'apps' : 
                            btnText === 'iot' ? 'iot' : 'all';
            filterProjects(category);
        });
    });
    
    // Filtros de curso
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const btnText = btn.textContent.trim();
            const course = btnText === '4°E' ? '4E' :
                            btnText === '4°C' ? '4C' :
                            btnText === '3°C' ? '3C' : 
                            btnText === 'Todos' ? 'all' : 'all';
            
            console.log('Botón curso clickeado:', btnText, '-> Filtro:', course);
            filterByCourse(course);
        });
    });
    
    // Botón "Ver más/menos proyectos"
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAllProjects();
        });
    }
}

// Agregar interactividad a las tarjetas de testimonios
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'rotateY(5deg) translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0deg) translateY(0px) scale(1)';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    // --- VARIABLES GLOBALES PARA CONTROLAR EL ESTADO ---
    let showingAllProjects = false;      // ¿Estamos mostrando todos los proyectos o solo la vista previa?
    let currentCategoryFilter = 'all'; // Filtro de categoría actual
    let currentCourseFilter = 'all';   // Filtro de curso actual

    // --- ELEMENTOS DEL DOM ---
    const projectCards = document.querySelectorAll('.project-card');
    const totalProjects = projectCards.length;
    const categoryBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const courseBtns = document.querySelectorAll('.course-filter .course-btn');
    const showMoreBtn = document.getElementById('showMoreBtn');

    // --- FUNCIONES PRINCIPALES ---

    /**
     * Aplica los filtros actuales (categoría y curso) a todos los proyectos.
     * Esta es la función central que decide qué proyecto se muestra y cuál se oculta.
     */
    function applyFilters() {
        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardCourse = card.dataset.course;
            const isPreview = card.hasAttribute('data-preview');

            // Condiciones para mostrar una tarjeta
            const categoryMatch = currentCategoryFilter === 'all' || cardCategory === currentCategoryFilter;
            const courseMatch = currentCourseFilter === 'all' || cardCourse === currentCourseFilter;
            
            // Decidir si la tarjeta debe mostrarse
            let showCard = false;
            if (categoryMatch && courseMatch) {
                if (showingAllProjects) {
                    showCard = true; // Si se muestran todos, solo importa que coincida el filtro
                } else {
                    showCard = isPreview; // Si no, debe coincidir Y ser de vista previa
                }
            }

            // Aplicar estilos para mostrar u ocultar la tarjeta
            if (showCard) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        updateShowMoreButton(); // Actualizar el texto del botón después de filtrar
    }

    /**
     * Actualiza el texto del botón "Ver más/menos"
     */
    function updateShowMoreButton() {
        if (!showMoreBtn) return;
        
        if (showingAllProjects) {
            showMoreBtn.textContent = 'Ver menos proyectos';
        } else {
            showMoreBtn.textContent = `Ver todos los proyectos (${totalProjects})`;
        }
    }

    // --- CONFIGURACIÓN DE EVENT LISTENERS ---

    // Añadir listeners a los botones de categoría
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar el filtro actual
            currentCategoryFilter = btn.dataset.category;

            // Actualizar el estilo del botón activo
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Aplicar los filtros
            applyFilters();
        });
    });

    // Añadir listeners a los botones de curso
    courseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar el filtro actual
            currentCourseFilter = btn.dataset.course;

            // Actualizar el estilo del botón activo
            courseBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Aplicar los filtros
            applyFilters();
        });
    });

    // Añadir listener al botón "Ver todos los proyectos"
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            showingAllProjects = !showingAllProjects; // Invierte el estado (true a false, false a true)
            applyFilters(); // Vuelve a aplicar los filtros con el nuevo estado
        });
    }

    // --- INICIALIZACIÓN ---
    // Al cargar la página, aplicamos los filtros iniciales para mostrar solo la vista previa.
    applyFilters();
});