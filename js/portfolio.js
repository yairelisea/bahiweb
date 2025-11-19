document.addEventListener('DOMContentLoaded', () => {
    // Actualizar el año en el footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Lógica para la galería y el modal
    const filterBtns = document.querySelectorAll('#filters .filter-btn');
    const galleryItems = document.querySelectorAll('#gallery .gallery-item');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    if (!modal || !closeModalBtn) {
        console.error('El modal o su botón de cierre no se encontraron.');
        return;
    }

    // 1. Filtrado de la galería
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manejar la clase 'active'
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Mostrar u ocultar items de la galería
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            });
        });
    });

    // 2. Abrir el modal con la información del proyecto
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.dataset.imgSrc;
            const title = item.dataset.title;
            const description = item.dataset.description;

            const modalImg = document.getElementById('modal-img');
            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');

            if (modalImg && modalTitle && modalDescription) {
                modalImg.src = imgSrc;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modal.classList.add('open');
            } else {
                console.error('No se encontraron los elementos internos del modal.');
            }
        });
    });

    // 3. Cerrar el modal
    const closeModal = () => {
        modal.classList.remove('open');
    };

    closeModalBtn.addEventListener('click', closeModal);

    // Cerrar el modal si se hace clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar el modal con la tecla 'Escape'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
});
