(()=>{"use strict";function e(e,t,n,r){var o=e.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__delete-button"),u=o.querySelector(".card__like-button"),a=o.querySelector(".card__like-counts");o.querySelector(".card__title").textContent=t.name;var i=o.querySelector(".card__image");return i.src=t.link,i.alt=t.name,a.textContent=t.likes.length,t.likes.some((function(e){return e._id===n}))&&u.classList.add("card__like-button_is-active"),t.owner._id!==n&&c.classList.add("card__delete-button-hidden"),c.addEventListener("click",(function(){r.openPopupDeleteCard(o,t._id)})),u.addEventListener("click",(function(){u.classList.contains("card__like-button_is-active")?r.deleteLike(t._id).then((function(e){a.textContent=e.likes.length,u.classList.toggle("card__like-button_is-active")})):r.setLike(t._id).then((function(e){a.textContent=e.likes.length,u.classList.toggle("card__like-button_is-active")}))})),i.addEventListener("click",(function(){return r.openPopupImage(t)})),o}function t(e){e.classList.add("popup_is-opened"),e.addEventListener("mousedown",r),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function r(e){e.target===e.currentTarget&&n(e.currentTarget)}function o(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}var c=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},u=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},a=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){c(e,n,t)})),u(n,r,t)},i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-16",headers:{authorization:"22e94ffa-70b1-463c-a53a-b5a623988f23","Content-Type":"application/json"}};function l(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var d=document.querySelector(".places__list"),p=document.querySelector("#card-template").content,f=document.querySelector(".popup_type_new-card"),_=f.querySelector(".popup__form"),m=f.querySelector(".popup__input_type_card-name"),y=f.querySelector(".popup__input_type_url"),v=document.querySelector(".profile__add-button"),h=f.querySelector(".popup__button"),S=document.querySelector(".popup_type_edit"),b=S.querySelector(".popup__form"),q=S.querySelector(".popup__button"),g=b.elements.name,k=b.elements.description,L=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),x=document.querySelector(".popup_type_new-avatar"),w=x.querySelector(".popup__form"),T=x.querySelector(".popup__input_type_url"),U=x.querySelector(".popup__button"),P=document.querySelector(".popup_type_delete-card"),j=P.querySelector(".popup__button"),O=document.querySelector(".popup_type_image"),D=O.querySelector(".popup__image"),B=O.querySelector(".popup__caption"),N=document.querySelectorAll(".popup__close"),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},M={setLike:function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))},deleteLike:function(e){return fetch("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))},openPopupImage:function(e){t(O),D.src=e.link,D.alt=e.name,B.textContent=e.name},openPopupDeleteCard:function(e,r){t(P),P.addEventListener("click",(function(){!function(e,t){G(!0,j),function(e){return fetch("".concat(i.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:i.headers}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))}(t).then((function(){e.remove(),n(P)})).finally((function(){return G(!1,j)}))}(e,r)}))}};function J(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function G(e,t){t.textContent=e?"Удаление...":"Да"}v.addEventListener("click",(function(){t(f),m.value="",y.value="",a(_,I)})),f.addEventListener("submit",(function(t){var r,o,c;t.preventDefault(),J(!0,h),(r={name:m.value,link:y.value},o=r.name,c=r.link,fetch("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify({name:o,link:c})}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))).then((function(t){var r=t.owner._id;d.prepend(e(p,t,r,M)),n(f)})).finally((function(){return J(!1,h)}))})),L.addEventListener("click",(function(){t(S),g.value=E.textContent,k.value=C.textContent,a(b,I)})),S.addEventListener("submit",(function(e){var t,r,o;e.preventDefault(),J(!0,q),(t={userName:g.value,userAbout:k.value},r=t.userName,o=t.userAbout,fetch("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify({name:r,about:o})}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))).then((function(){E.textContent=g.value,C.textContent=k.value,n(S)})).finally((function(){return J(!1,q)}))})),A.addEventListener("click",(function(){t(x),T.value="",a(w,I)})),x.addEventListener("submit",(function(e){var t,r;e.preventDefault(),J(!0,U),(t={avatarLink:T.value},r=t.avatarLink,fetch("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:r})}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))).then((function(){A.style="background-image:url(".concat(T.value,")"),n(x)})).finally((function(){return J(!1,U)}))})),document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")})),N.forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup"))}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),u(n,r,t)}))}))}(t,e)}))}(I),Promise.all([fetch("".concat(i.baseUrl,"/users/me"),{method:"GET",headers:i.headers}).then((function(e){return l(e)})).catch((function(e){console.log(e)})),fetch("".concat(i.baseUrl,"/cards"),{method:"GET",headers:i.headers}).then((function(e){return l(e)})).catch((function(e){console.log(e)}))]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];E.textContent=c.name,C.textContent=c.about,A.style="background-image:url(".concat(c.avatar,")");var a=c._id;u.forEach((function(t){return d.append(e(p,t,a,M))}))}))})();