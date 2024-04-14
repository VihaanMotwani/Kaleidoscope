document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    // Responsive sizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw(); // Redraw the canvas after resizing
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize

    let currentImageIndex = 0;
    let rotation = 0;
    let rotating = false;
    const images = ['HL1.png', 'HL2.jpeg', 'HL3.jpeg']; // Ensure these are correctly pathed
    const imageElements = images.map(src => {
        const img = new Image();
        img.onload = draw; // Redraw when each image is loaded
        img.src = src;
        return img;
    });

    function animateTransition() {
        if (!rotating) return;
        rotation += Math.PI / 180 * 2; // Adjust rotation speed

        if (rotation >= Math.PI * 2) {
            rotation = 0;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            rotating = false;
        }

        draw();
        requestAnimationFrame(animateTransition);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation);

        const img = imageElements[currentImageIndex];
        const sliceCount = 12;
        const sliceAngle = Math.PI * 2 / sliceCount;
        for (let i = 0; i < sliceCount; i++) {
            ctx.save();
            ctx.rotate(sliceAngle * i);
            ctx.drawImage(img, -img.width / 4, -img.height / 4, img.width / 2, img.height / 2);
            ctx.restore();
        }

        ctx.restore();
        drawInstructions();
    }

    function drawInstructions() {
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Tap to rotate', canvas.width / 2, canvas.height - 20);
    }

    canvas.addEventListener('click', function() {
        if (!rotating) {
            rotating = true;
            requestAnimationFrame(animateTransition);
        }
    });

    // Add touch support
    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent scrolling
        if (!rotating) {
            rotating = true;
            requestAnimationFrame(animateTransition);
        }
    });
});
