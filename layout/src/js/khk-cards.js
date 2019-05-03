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