document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('pageTransitionOverlay');
    const bars = document.querySelectorAll('.bar');
    const transitionLinks = document.querySelectorAll('.transition-link');
    const pageContent = document.querySelector('.container-anim'); 
    
    gsap.set(overlay, { autoAlpha: 1, display: 'flex', pointerEvents: 'auto' });
    gsap.set(bars, { y: "0%" });
    
    gsap.set(pageContent, { autoAlpha: 0 });

    document.body.style.overflow = 'hidden'; 
    
    gsap.to({}, {
        duration: 2, // Espera 2 segundos
        onComplete: () => {
            // Animación de Fade-Out de barras (de abajo hacia arriba, DE DERECHA A IZQUIERDA)
            gsap.to(Array.from(bars).reverse(), {
                y: "-100%", // Las barras se mueven hacia arriba
                stagger: 0.1, // Retraso de 0.1s entre cada barra
                ease: "power2.in", // Tipo de easing para el movimiento de salida
                duration: 0.8,
                // No necesitamos un onComplete aquí si el contenido aparece con delay aparte
            });
            
            gsap.to(pageContent, {
                autoAlpha: 1, // Hace que el contenido aparezca (opacity 1, visibility visible)
                duration: 0.2, // Duración de 0.2 segundos para la aparición del contenido
                delay: 1, // <<-- ¡Aparece 1 segundo después de que las barras comiencen a moverse!
                ease: "power1.out",
                onComplete: () => {
 
                    gsap.set(overlay, { autoAlpha: 0, display: 'none', pointerEvents: 'none' });
                    document.body.style.overflow = 'auto';
                }
            });

        }
    });

    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = link.href;

            gsap.set(overlay, { autoAlpha: 1, display: 'flex', pointerEvents: 'auto' });
            gsap.set(pageContent, { autoAlpha: 0 }); // Oculta el contenido antes de la transición para la vuelta
            document.body.style.overflow = 'hidden';

            gsap.to(bars, { // Aquí mantenemos la animación de izquierda a derecha (o la que prefieras para la salida)
                y: "0%",
                stagger: 0.1,
                ease: "power2.out",
                duration: 0.8,
                onComplete: () => {
                    setTimeout(() => {
                        window.location.href = destination;
                    }, 300);
                }
            });
        });
    });
});