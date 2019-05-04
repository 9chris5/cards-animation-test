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
// window.onload = () => {

//   function createExpansionElement(node) {
//     const expansion = document.createElement('div');
//     expansion.className = 'khk-card__expansion';
//     const nodePosition = node.getBoundingClientRect();
    
//     document.body.appendChild(expansion);
//     expansion.appendChild(node.cloneNode(true));

//     expansion.firstChild.style.position = 'fixed';
//     expansion.firstChild.style.margin = 0;
//     expansion.firstChild.style.width = `${nodePosition.width}px`;
//     expansion.firstChild.style.height = `${nodePosition.height}px`;
//     expansion.firstChild.style.top = `${nodePosition.top}px`;
//     expansion.firstChild.style.left = `${nodePosition.left}px`;

//     return expansion;
//   };

//   function calculateElementsPosition(elements) {
//     let result = {};
//     elements.forEach(element => {
//       result[element.className.split('__')[1].replace(/ /, '')] = element.getBoundingClientRect();
//     });
//     return result;
//   }

//   function delay(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
//   }

// 	/* grab all the cards */
// 	const cards = document.querySelectorAll('.khk-card');

// 	if (cards) {

// 		cards.forEach(card => {

//       const trigger = card.querySelector('.khk-card__icon-expand');

// 			trigger.addEventListener('click', e => {

//         const existingExpansion = document.querySelector('.khk-card__expansion');

//         if (existingExpansion) {
//           existingExpansion.remove(existingExpansion.firstChild);
//         }

//         const exp = createExpansionElement(e.target.parentNode);
//         e.target.parentNode.style.visibility = 'hidden';

//         const image = exp.querySelector('.khk-card__image');
//         const tile = exp.querySelector('.khk-card__tile');
//         const hiddenTile = exp.querySelector('.khk-card__hidden-tile');
//         const text = exp.querySelector('.khk-card__text');

//         const first = calculateElementsPosition([image, tile, hiddenTile]);

//         image.classList.add('expanded');
//         tile.classList.add('expanded');
//         hiddenTile.classList.add('expanded');

//         const last = calculateElementsPosition([image, tile, hiddenTile]);

//         image.classList.remove('expanded');
//         tile.classList.remove('expanded');
//         hiddenTile.classList.remove('expanded');

//         image.style.transition = 'transform 300ms';
//         tile.style.transition = 'transform 300ms';
//         hiddenTile.style.transition = 'transform 300ms';

//         text.style.transition = 'all 300ms';
//         text.style.transform = 'translateY(-25px)';
//         text.style.pointerEvents = 'auto';
        
//         requestAnimationFrame(() => {
          
//           tile.style.transform = `
//           translateX(-${first.tile.left}px)
//           `;
          
//           hiddenTile.style.transform = `
//           scaleX(1.2)
//           `;
          
//           // text.style.transform = `
//           //   translateY(${})
//           // `;
          
//           delay(299).then(() => {
            
//             tile.style.transition = '';
//             tile.style.width = `${first.image.width / 2}px`;
//             tile.style.height = `${first.image.height}px`;
//             tile.style.top = `${first.image.top}px`;
//             tile.style.left = 0;
//             tile.classList.add('expanded');

//             tile.style.transform = '';
            
//             image.style.transform = `
//             translateY(${last.imageexpanded.top - first.image.top}px)
//             translateX(${last.imageexpanded.left - first.image.left}px)
//             scaleX(${(last.imageexpanded.width / first.image.width - 1) * 2 + 1})
//             `;
            
//             return delay(1)
            
//           }).then(() => {
            
//             requestAnimationFrame(() => {
              
//               tile.style.transition = 'transform 300ms';
//               tile.style.transform = `
//               translateY(${last.imageexpanded.bottom - first.tile.top}px)
//               `;
              
//               hiddenTile.style.transition = 'transform 300ms';
//               hiddenTile.style.transform = `
//               translateY(${last.imageexpanded.bottom - first.tile.top}px)
//               scaleX(1.2)
//               `;
              
//               return delay(300);
              
//             });

//           }).then(() => {
              
//             text.style.opacity = 1;
//             text.style.transform = '';

//           });

//         });

// 			});
	
// 		});

// 	}

// }
//# sourceMappingURL=main.js.map
