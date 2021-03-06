'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const drawingField = document.querySelector('#drawing-field');
    const ctx = drawingField.getContext('2d');
    let isMouseDown = false;
    let nowDrawing = false;

    drawingField.width = 600;
    drawingField.height = 400;

    let drawingCords = drawingField.getBoundingClientRect();
    let cords = [];

    ctx.lineWidth = 10;

    const startDraw = () => {
        isMouseDown = true;
    };

    const endDraw = () => {
        isMouseDown = false;

        ctx.beginPath();

        cords.push('mouseup');
    };

    const draw = (event) => {
        if (!isMouseDown || nowDrawing) return;
        cords.push([event.clientX - drawingCords.x, event.clientY - drawingCords.y]);

        ctx.lineTo(event.clientX - drawingCords.x, event.clientY - drawingCords.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(event.clientX - drawingCords.x, event.clientY - drawingCords.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(event.clientX - drawingCords.x, event.clientY - drawingCords.y);
    };

    const drawCircle = () => {
        if (nowDrawing) return;

        cords.push([event.clientX - drawingCords.x, event.clientY - drawingCords.y]);
        cords.push('mouseup');

        ctx.arc(event.clientX - drawingCords.x, event.clientY - drawingCords.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
    };

    const clearField = (clearCords = true) => {
        ctx.fillStyle = '#0d5747';
        ctx.fillRect(0, 0, drawingField.width, drawingField.height);

        ctx.beginPath();
        ctx.fillStyle = 'black';

        if (clearCords) {
            cords = [];
        }
    };

    const saveDrawnPainting = () => {
        localStorage.setItem('cords', JSON.stringify(cords));
    };

    const drawSavedPainting = () => {
        const savedCords = cords.slice();
        nowDrawing = true;
        document.onkeydown = null;

        let timer = setInterval(() => {
            if (!savedCords.length) {
                clearInterval(timer);
                ctx.beginPath();
                nowDrawing = false;
                document.onkeydown = hotKeys;
                return;
            }

            const crd = savedCords.shift();

            const currentCords = {
                clientX: crd[0],
                clientY: crd[1]
            };

            ctx.lineTo(currentCords.clientX, currentCords.clientY);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(currentCords.clientX, currentCords.clientY, 5, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(currentCords.clientX, currentCords.clientY);
        }, 15);
    };

    const hotKeys = event => {
        if (event.keyCode === 67) {
            clearField();
        } else if (event.keyCode === 83) {
            saveDrawnPainting();
        } else if (event.keyCode === 82) {
            cords = JSON.parse( localStorage.getItem('cords') );
        
            clearField(false);
            drawSavedPainting();
        }
    };

    drawingField.addEventListener('mousedown', startDraw);
    drawingField.addEventListener('mouseup', endDraw);
    drawingField.addEventListener('click', drawCircle);
    drawingField.addEventListener('mousemove', draw);
    drawingField.addEventListener('mouseleave', endDraw);
    document.onkeydown = hotKeys;
});