// class FAQ {
//   constructor() {
//     this.activeIndex = null;
//     this.init();
//   }

//   init() {
//     // Знаходимо всі кнопки FAQ
//     const buttons = document.querySelectorAll('.faq-button');
    
//     // Додаємо обробник кліку для кожної кнопки
//     buttons.forEach((button, index) => {
//       button.addEventListener('click', () => this.toggleAnswer(index));
//     });
//   }

//   toggleAnswer(index) {
//     const items = document.querySelectorAll('.faq-item');
//     const currentItem = items[index];
    
//     // Якщо клікнули на активний елемент - закриваємо його
//     if (this.activeIndex === index) {
//       this.closeAnswer(currentItem);
//       this.activeIndex = null;
//       return;
//     }

//     // Закриваємо попередній активний елемент, якщо такий є
//     if (this.activeIndex !== null) {
//       this.closeAnswer(items[this.activeIndex]);
//     }

//     // Відкриваємо новий елемент
//     this.openAnswer(currentItem);
//     this.activeIndex = index;
//   }

//   openAnswer(item) {
//     const answer = item.querySelector('.faq-answer');
//     const plusIcon = item.querySelector('.icon-plus');
//     const minusIcon = item.querySelector('.icon-minus');

//     answer.classList.add('show');
//     if (plusIcon && minusIcon) {
//       plusIcon.classList.add('hidden');
//       minusIcon.classList.remove('hidden');
//     }
//   }

//   closeAnswer(item) {
//     const answer = item.querySelector('.faq-answer');
//     const plusIcon = item.querySelector('.icon-plus');
//     const minusIcon = item.querySelector('.icon-minus');

//     answer.classList.remove('show');
//     if (plusIcon && minusIcon) {
//       plusIcon.classList.remove('hidden');
//       minusIcon.classList.add('hidden');
//     }
//   }
// }

// // Ініціалізуємо FAQ після завантаження DOM
// document.addEventListener('DOMContentLoaded', () => {
//   new FAQ();
// });

class FAQ {
  constructor() {
    this.activeIndex = null;
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll('.faq-button');
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => this.toggleAnswer(index));
    });
  }

  toggleAnswer(index) {
    const items = document.querySelectorAll('.faq-item');
    const currentItem = items[index];
    
    // Якщо клікнули на активний елемент - закриваємо його
    if (this.activeIndex === index) {
      this.closeAnswer(currentItem);
      this.activeIndex = null;
      return;
    }

    // Закриваємо попередній активний елемент, якщо такий є
    if (this.activeIndex !== null) {
      this.closeAnswer(items[this.activeIndex]);
    }

    // Відкриваємо новий елемент
    this.openAnswer(currentItem);
    this.activeIndex = index;
  }

  openAnswer(item) {
    const faqAnswer = item.querySelector('.faq-answer');
    const answers = item.querySelectorAll('.answer');
    const plusIcon = item.querySelector('.icon-plus');
    const minusIcon = item.querySelector('.icon-minus');

    // Показуємо основний контейнер відповіді
    faqAnswer.classList.add('show');
    
    // Показуємо всі параграфи відповіді
    answers.forEach(answer => {
      answer.classList.add('show');
    });

    // Перемикаємо іконки
    if (plusIcon && minusIcon) {
      plusIcon.classList.add('hidden');
      minusIcon.classList.remove('hidden');
    }
  }

  closeAnswer(item) {
    const faqAnswer = item.querySelector('.faq-answer');
    const answers = item.querySelectorAll('.answer');
    const plusIcon = item.querySelector('.icon-plus');
    const minusIcon = item.querySelector('.icon-minus');

    // Ховаємо основний контейнер відповіді
    faqAnswer.classList.remove('show');
    
    // Ховаємо всі параграфи відповіді
    answers.forEach(answer => {
      answer.classList.remove('show');
    });

    // Перемикаємо іконки
    if (plusIcon && minusIcon) {
      plusIcon.classList.remove('hidden');
      minusIcon.classList.add('hidden');
    }
  }
}

// Ініціалізуємо FAQ після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  new FAQ();
});