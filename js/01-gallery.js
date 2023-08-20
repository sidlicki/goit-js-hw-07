import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

//+ Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

//+ Реалізація делегування на ul.gallery і отримання url великого зображення.

//+ Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.

//+ Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.

//+ Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

//+ Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

// <li class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </li>

//+ Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.

//+ Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно.
const list = document.querySelector(".gallery");

const items = galleryItems.map(createLi).join("");
list.insertAdjacentHTML("beforeend", items);

function createLi({ preview, original, description }) {
  const item = `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  return item;
}

//
let instance;
list.addEventListener("click", onClick);

function onClick(evt) {
  evt.preventDefault();
  const { target } = evt;
  if (!target.classList.contains("gallery__image")) {
    return;
  }
  const imgSource = target.dataset.source;
  const descr = target.alt;

  instance = basicLightbox.create(`
  <div class="modal">
  <img src="${imgSource}"  style="max-width: 1000px; width: 100%" alt="${descr}">
  </div>
`);

  instance.show();

  window.addEventListener("keydown", escPress);
}

function escPress(evt) {
  if (evt.code === "Escape" && instance) {
    instance.close();
  }
}
