// renderInMenu() {
//     const thisProduct = this;
//     /*generate HTML based on template*/
//     const generatedHTML = templates.menuProduct(thisProduct.data);
//     //console.log(generatedHTML);
//     /* create element using utils.createElementFromHTML */
//     thisProduct.element = utils.createDOMFromHTML(generatedHTML);
//     /* find menu container */
//     const menuContainer = document.querySelector(select.containerOf.menu);
//     /* add element to menu */
//     menuContainer.appendChild(thisProduct.element);
//   }

'use strict';
{
  const select = {
    templateOf: {
      book: '#template-book'
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const bookList = document.querySelector('.books-list');
  console.log('booklist', bookList);


  const favoruiteBooks = [];

  const filters = [];


  function render() {

    for (const bookSingle of dataSource.books) {
      bookSingle.ratingBgc = determineRatingBgc (bookSingle.rating);
      console.log (bookSingle.ratingBgc);
      bookSingle.ratingWidth = bookSingle.rating * 10; 
      console.log(bookSingle.ratingWidth);
      const generatedHTML = templates.book(bookSingle);
      const element = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(element);
    }

  }
  render();



  function initActions() {
    // const bookImgs = bookList.querySelectorAll('.book__image');
    //console.log('bookimg', bookImgs);
    // for (const bookImg of bookImgs) {
    //   bookImg.addEventListener('dblclick', function (event) {
    //     event.preventDefault ();
    //     console.log('clicked');
    //     const bookId= bookImg.getAttribute('data-id');
    //     if (favoruiteBooks.includes(bookId)) {
    //       bookImg.classList.remove('favorite');
    //       const indexOfId = favoruiteBooks.indexOf(bookId); 

    //       favoruiteBooks.splice(indexOfId, 1);

    //     } else {
    //       bookImg.classList.add('favorite');
    //       favoruiteBooks.push(bookId);
    //         }
    //         //console.log('hey!!', favoruiteBooks);
    //       });
    //     }
    //   }

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      console.log('clicked');
      const bookId = event.target.offsetParent.getAttribute('data-id');
      console.log('bye', event.target.offsetParent);
      if (favoruiteBooks.includes(bookId)) {
        event.target.offsetParent.classList.remove('favorite');
        const indexOfId = favoruiteBooks.indexOf(bookId);

        favoruiteBooks.splice(indexOfId, 1);

      } else {
        console.log('last step');
        event.target.offsetParent.classList.add('favorite');
        favoruiteBooks.push(bookId);
      }

    });

    const formWrapper = document.querySelector('.filters');
    formWrapper.addEventListener('click', function (event) {
      if (event.target.hasAttribute('type')) {
        if (event.target.checked) {
          filters.push(event.target.value);
          filterBooks();
        } else {
          const indexOfValue = filters.indexOf(event.target.value);
          filters.splice(indexOfValue, 1);
          filterBooks();
        }

      }

    });
  }
  function filterBooks() {
    console.log('empty');
    for (const book of dataSource.books) {
    // console.log('step 1');
      book.shouldBeHidden = false;
      for (const filter of filters) {
      // console.log('step 2');
      //  console.log("filter", book.details[filter]);
        if (!book.details[filter]) {
          console.log('step 3');
          book.shouldBeHidden = true;
          break;
        }
      }
        
      if (book.shouldBeHidden) {
        //console.log('step 4');
        const bookId = book.id;
        //console.log('step 5', book.id);
        const bookImg = document.querySelector('.book__image[data-id="'+bookId+'"]');
        //console.log('bookImg', bookImg);
      
        bookImg.classList.add('hidden');
      } else if (!book.shouldBeHidden) { 
        const bookId = book.id;
        const bookImg = document.querySelector('.book__image[data-id="'+bookId+'"]');
        //console.log('step 6');
        
        bookImg.classList.remove('hidden');}
      
    
    
    }
    
  }

  function determineRatingBgc(rating) {
    if (rating < 6) {
     return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    

  } else if (rating > 6 && rating <= 8) {
    return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';}

    else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }

    else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  
  initActions();

}
}