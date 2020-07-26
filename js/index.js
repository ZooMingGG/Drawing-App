'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const drawingField = document.querySelector('#drawing-field');
    const ctx = drawingField.getContext('2d');
    let isMouseDown = false;

    drawingField.width = 600;
    drawingField.height = 400;

    let drawingCords = drawingField.getBoundingClientRect();

    ctx.lineWidth = 10;

    const startDraw = () => {
        isMouseDown = true;
    };

    const endDraw = () => {
        isMouseDown = false;

        ctx.beginPath();
    };

    const draw = (event) => {
        if (!isMouseDown) return;

        ctx.lineTo(event.clientX - drawingCords.x, event.clientY - drawingCords.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(event.clientX - drawingCords.x, event.clientY - drawingCords.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(event.clientX - drawingCords.x, event.clientY - drawingCords.y);
    };

    const drawCircle = () => {
        ctx.arc(event.clientX - drawingCords.x, event.clientY - drawingCords.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
    };

    drawingField.addEventListener('mousedown', startDraw);
    drawingField.addEventListener('mouseup', endDraw);
    drawingField.addEventListener('click', drawCircle);
    drawingField.addEventListener('mousemove', draw);
    drawingField.addEventListener('mouseleave', endDraw);
});