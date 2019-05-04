function createExpandableElement(node) {

  /* create expansion wrapper element */
  const element = document.createElement('div');
  element.className = 'card__expand-wrapper';

  /* get position of cloned element */
  const position = node.getBoundingClientRect();

  /* create and append overlay element */
  const overlay = document.createElement('div');
  overlay.className = 'card__expand-overlay';
  element.appendChild(overlay);

  /* append wrapper and clone clicked card */
  document.body.appendChild(element);
  element.appendChild(node.cloneNode(true));

  /* set cloned element position */
  element.lastChild.style.top = `${position.top}px`;

  /* hide cloned card */
  node.style.visibility = 'hidden';

  return element;

};

function clearExpandWrapper() {

  const elToClear = document.querySelector('.card__expand-wrapper');

  if (elToClear) {
    while (elToClear.lastChild) {
      elToClear.removeChild(elToClear.lastChild);
    }
  }

};

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
};

window.onload = () => {

  const cards = document.querySelectorAll('.card');

  if (cards) {

    cards.forEach(card => {

      card.addEventListener('click', e => {

        const target = e.currentTarget;

        clearExpandWrapper();
        const clone = createExpandableElement(target);

        const card = clone.querySelector('.card');
        const items = {
          tile: clone.querySelector('.card__tile'),
          hiddenTile: clone.querySelector('.card__hidden-tile'),
          image: clone.querySelector('.card__image'),
          description: clone.querySelector('.card__description')
        }
        const overlay = document.querySelector('.card__expand-overlay');

        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {

          overlay.classList.add('transition');
          overlay.style.opacity = 1;
  
          items.tile.classList.add('transition');
          items.tile.style.transform = 'translateX(0)';

        });

        items.tile.addEventListener('transitionend', function handler() {

          items.image.classList.add('transition');
          items.image.style.transform = `
            translateY(${0 - items.image.getBoundingClientRect().top}px)
          `;

          items.hiddenTile.classList.add('transition');

          items.hiddenTile.style.transform = `
            translateY(${items.image.getBoundingClientRect().height - items.hiddenTile.getBoundingClientRect().top}px)
          `;

          items.tile.style.transform = `
            translateY(${items.image.getBoundingClientRect().height - items.tile.getBoundingClientRect().top}px)
          `;

          items.description.style.top = `${items.image.getBoundingClientRect().height * 2}px`;
          items.description.style.height = `calc(100vh - ${items.image.getBoundingClientRect().height * 2}px)`;

          this.removeEventListener('transitionend', handler);

        });

        const wrapper = document.querySelector('.card__expand-wrapper');

        const exit = document.createElement('i');
        wrapper.appendChild(exit);
        exit.innerText = 'keyboard_backspace'
        exit.className = 'material-icons card__icon';
        exit.style.opacity = 0;

        items.image.addEventListener('transitionend', function handler() {

          items.description.classList.add('transition');
          items.description.style.opacity = 1;

          target.style.visibility = 'visible';


          exit.classList.add('transition');
          exit.style.opacity = 1;

          exit.addEventListener('click', () => {
            
            wrapper.classList.add('transition');
            wrapper.style.opacity = 0;

            wrapper.addEventListener('transitionend', () => {
              document.body.removeChild(wrapper);
              document.body.style.overflow = 'initial';
            });

          });

        });
        
      });

    });

  }

}