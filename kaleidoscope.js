document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let currentImageIndex = 0;
    let rotation = 0;
    let rotating = false;
    const images = ['HL1.png', 'HL2.jpeg', 'HL3.jpeg']; // Add your image paths here
    const imageElements = [];
    let mouseControl = false;
    let mouseX = 0, mouseY = 0;

    //canvas.style.background = 'url(frame.png)'; // Add a decorative frame background
    //canvas.style.borderRadius = '50%'; // Circular frame

    images.forEach(src => {
        const img = new Image();
        img.src = src;
        imageElements.push(img);
    });

    function animateTransition() {
        if (!rotating) return;
        const speed = mouseControl ? (mouseX - width / 2) / width * 0.05 : 0.01;
        rotation += speed; 

        if (rotation >= Math.PI * 2) { 
            rotation = 0;
            currentImageIndex = (currentImageIndex + 1) % images.length;
            rotating = false;
        }

        draw();
        requestAnimationFrame(animateTransition);
    }

    function drawInstructions() {
    // Instruction Text
    	ctx.fillStyle = 'white';
    	ctx.font = '18px Arial';
    	ctx.textAlign = 'center';
    	ctx.fillText('Click to rotate', width - 120, height / 2 - 20);

    // Instruction Arrow
    	ctx.beginPath();
    	ctx.moveTo(width - 150, height / 2 + 20); // Left point of arrow
    	ctx.lineTo(width - 90, height / 2 + 20);  // Right point of arrow
    	ctx.lineTo(width - 120, height / 2 + 50); // Bottom point of arrow
    	ctx.closePath();
    	ctx.fill();
    }

    function draw() {
    	ctx.clearRect(0, 0, width, height)

    	// Apply the color overlay across the entire viewport first
    	ctx.fillStyle = `hsla(${rotation * 180 / Math.PI}, 100%, 50%, 0.5)`;
    	ctx.fillRect(0, 0, width, height); // Fill the whole canvas with color overlay

    	ctx.save();
    	ctx.translate(width / 2, height / 2);
    	ctx.rotate(rotation + Math.PI / 5);

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



    canvas.addEventListener('click', function() {
        rotating = true;
        requestAnimationFrame(animateTransition);
    });

    canvas.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        mouseControl = true;
    });

    imageElements[imageElements.length - 1].onload = draw; 
});
