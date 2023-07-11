


{
  const select = {
    templateOf: {
      book: '#template-book'
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  class BookList {
    constructor() {
      const thisBookList = this;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.bookList = document.querySelector('.books-list');
      thisBookList.data = dataSource.books;
      thisBookList.render();
      thisBookList.initActions();
      thisBookList.filterBooks();
      thisBookList.determineRatingBgc();
    }

    render() {
      const thisBookList = this;
      for (const bookSingle of thisBookList.data) {
        bookSingle.ratingBgc = thisBookList.determineRatingBgc(bookSingle.rating);
        bookSingle.ratingWidth = bookSingle.rating * 10;
        const generatedHTML = templates.book(bookSingle);
        thisBookList.element = utils.createDOMFromHTML(generatedHTML);
        const bookList = document.querySelector('.books-list');
        bookList.appendChild(thisBookList.element);
      }
    }


    initActions() {
      const thisBookList = this;
      thisBookList.bookList.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const bookId = event.target.offsetParent.getAttribute('data-id');
        if (thisBookList.favoriteBooks.includes(bookId)) {
          event.target.offsetParent.classList.remove('favorite');
          const indexOfId = thisBookList.favoriteBooks.indexOf(bookId);
          thisBookList.favoriteBooks.splice(indexOfId, 1);

        } else {
          event.target.offsetParent.classList.add('favorite');
          thisBookList.favoriteBooks.push(bookId);
        }

      });

      const formWrapper = document.querySelector('.filters');
      formWrapper.addEventListener('click', function (event) {
        if (event.target.hasAttribute('type')) {
          if (event.target.checked) {
            thisBookList.filters.push(event.target.value);
            thisBookList.filterBooks();
          } else {
            const indexOfValue = thisBookList.filters.indexOf(event.target.value);
            thisBookList.filters.splice(indexOfValue, 1);
            thisBookList.filterBooks();
          }

        }

      });
    }

    filterBooks() {
      const thisBookList = this;
      for (const book of thisBookList.data) {
        book.shouldBeHidden = false;
        for (const filter of thisBookList.filters) {
          if (!book.details[filter]) {
            book.shouldBeHidden = true;
            break;
          }
        }

        if (book.shouldBeHidden) {
          const bookId = book.id;
          const bookImg = document.querySelector('.book__image[data-id="' + bookId + '"]');

          bookImg.classList.add('hidden');
        } else if (!book.shouldBeHidden) {
          const bookId = book.id;
          const bookImg = document.querySelector('.book__image[data-id="' + bookId + '"]');

          bookImg.classList.remove('hidden');
        }

      }
    }

    determineRatingBgc(rating) {
     
      if (rating < 6) {
        return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';


      } else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }

      else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }

      else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }

  new BookList();
}
