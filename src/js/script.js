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
    for (const eachType of dataSource.books) {
      let shouldBeHidden = false;

    }
  }
  initActions();



}