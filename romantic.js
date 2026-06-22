document.addEventListener('DOMContentLoaded', () => {
  // Determine if this is the final page to increase effect intensity
  const isPage6 = window.location.pathname.endsWith('page6.html');

  // Create background container
  const bgContainer = document.createElement('div');
  bgContainer.id = 'romantic-bg-container';
  document.body.appendChild(bgContainer);

  // Emojis for floating animation (hearts, flowers, sparkles)
  const floatingEmojis = ['❤️', '💖', '🌸', '🌹', '🌷', '🌺', '💕', '✨', '💝', '🌼', '🌻', '💗'];

  // function to spawn a floating item
  function spawnFloatingItem() {
    const item = document.createElement('span');
    item.classList.add('romantic-floating-item');
    item.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];

    const leftPct = Math.random() * 100;
    const duration = 6 + Math.random() * 6; // 6 to 12 seconds
    const size = 0.8 + Math.random() * 1.5;  // 0.8rem to 2.3rem
    const swayX = (Math.random() * 150) - 75; // -75px to 75px sway
    const rotateDeg = (Math.random() * 360) - 180; // rotation
    const scaleEnd = 0.6 + Math.random() * 0.8;

    item.style.left = `${leftPct}%`;
    item.style.fontSize = `${size}rem`;
    item.style.animationDuration = `${duration}s`;
    item.style.setProperty('--sway-x', `${swayX}px`);
    item.style.setProperty('--rotate-deg', `${rotateDeg}deg`);
    item.style.setProperty('--scale-end', scaleEnd);

    bgContainer.appendChild(item);

    // Remove item after animation completes to keep DOM clean
    setTimeout(() => {
      item.remove();
    }, duration * 1000 + 500);
  }

  // Interval configurations based on context
  const spawnInterval = isPage6 ? 250 : 550; // faster spawns on page 6 (250ms vs 550ms)
  
  // Continuously spawn floating items
  const floatIntervalId = setInterval(spawnFloatingItem, spawnInterval);

  // Initial burst of floating elements for immediate gratification
  const initialCount = isPage6 ? 18 : 8;
  for (let i = 0; i < initialCount; i++) {
    setTimeout(spawnFloatingItem, Math.random() * 2000);
  }

  // Stickers array: [emoji, CSS class, baseRotation]
  const stickers = [
    { emoji: '🌹', class: 'sticker-top-left', rot: '-12deg' },
    { emoji: '💕', class: 'sticker-top-right', rot: '15deg' },
    { emoji: '🌷', class: 'sticker-bottom-left', rot: '-8deg' },
    { emoji: '🧸', class: 'sticker-bottom-right', rot: '18deg' },
    { emoji: '🌸', class: 'sticker-mid-left', rot: '6deg' },
    { emoji: '💖', class: 'sticker-mid-right', rot: '-14deg' }
  ];

  // Spawn stickers (these are clickable with micro-interactions)
  stickers.forEach(stickerConfig => {
    const sticker = document.createElement('div');
    sticker.classList.add('romantic-sticker', stickerConfig.class);
    sticker.textContent = stickerConfig.emoji;
    sticker.style.setProperty('--base-rotation', stickerConfig.rot);

    // Click effect: spin and grow
    sticker.addEventListener('click', () => {
      sticker.style.transition = 'transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      sticker.style.transform = `scale(1.4) rotate(360deg)`;
      
      // Reset back after transition
      setTimeout(() => {
        sticker.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        sticker.style.transform = '';
      }, 700);
    });

    bgContainer.appendChild(sticker);
  });
});
