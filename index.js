// ==UserScript==
// @name         Show PW Everywhere
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  show password value everywhere
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+{}|:"<>?,./;'[]\=-\`"`
    let has_started_typing = false
    const pw = document.querySelector('input[type="password"]')
    if(!pw){
        return false
    }
    const pw_show = document.createElement('div')
    pw_show.innerText = 'hide'
    //pw.insertAdjacentElement('afterend', pw_show)
    document.body.insertAdjacentElement('beforeend', pw_show)
    const position = pw.getBoundingClientRect();
    const styles = {
                 position: 'absolute',
                'z-index': 1000,
                 background: 'rgb(234, 234, 234)',
                 padding: '2px 10px',
                 color: '#828282',
                 cursor: 'pointer',
                 left: `${position.left}px`,
                 top: `${position.bottom}px`
               }
    Object.assign(pw_show.style, styles)

    pw.addEventListener("keyup", (e) => {
        if(e instanceof KeyboardEvent && pw_show.dataset.show !== "false" && pw.value !== ''){
            if(chars.includes(e.key)){
                has_started_typing = true
            }
            if(has_started_typing){
                pw_show.innerText = pw.value
            }
        }
    }, true)
    pw_show.onclick = (e) => {
        pw_show.style.display = 'none'
        pw_show.dataset.show = false
    }
})();
