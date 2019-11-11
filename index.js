// ==UserScript==
// @name         Show PW Everywhere
// @namespace    https://github.com/djru/show_pw
// @version      0.1
// @description  show password value everywhere
// @author       djru
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pw = document.querySelector('input[type="password"]')
    if(!pw){
        return false
    }
    const pw_show = document.createElement('div') // div to hold our shown password
    pw_show.innerText = 'hide'
    pw.insertAdjacentElement('afterend', pw_show)
    pw_show.classList.add('pw_show')
    // set the position of the div to be directly below the pw elemebt
    var position = pw.getBoundingClientRect()
    
    pw.onkeyup = (e) => {
        // don't want to fire on browser autofill, which is why we only want KeyboardEvent
        if (e instanceof KeyboardEvent){
            pw_show.innerText = e.target.value;
            if(e.target.value === '' || pw_show.dataset.show === "false"){
                pw_show.style.display = 'none'
            }else{
                pw_show.style.display = 'block'
            }
        }
    }
    // can click to banish
    pw_show.onclick = (e) => {
        pw_show.style.display = 'none'
        pw_show.dataset.show = false
    }
    pw_show.style.left = `${position.left}`
    pw_show.style.top = `${position.bottom}`

    // inject some styles
    const css = `.pw_show {
position: absolute;
z-index: 1000;
background: rgb(234, 234, 234);
padding: 2px 10px;
color: white;
cursor: pointer
}`
    const css_el = document.createElement('style');
    css_el.type = 'text/css';
    css_el.innerText = css
    document.getElementsByTagName("head")[0].appendChild(css_el);
})();
