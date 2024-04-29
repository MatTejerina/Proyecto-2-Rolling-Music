    document.addEventListener('DOMContentLoaded', function() {
        let elements = document.querySelectorAll('.fade-in');
        elements.forEach(function(element) {
            element.classList.add('show');
        });
    });

    window.addEventListener('scroll', function() {
        let elements = document.querySelectorAll('.fade-in');
        elements.forEach(function(element) {
            let position = element.getBoundingClientRect();

            // Verificar si el elemento está dentro de la ventana visible
            if (position.top < window.innerHeight) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    });

