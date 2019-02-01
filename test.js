'use strict';

// Скрипты работают после загрузки документа
function documentReady() {
    var tree = document.getElementById('tree');
    var nodes = tree.querySelectorAll('li');

    // Создаём инпуты и вешаем на них обработчик
    nodes.forEach(function (elem) {
        var input = document.createElement('input');
        elem.insertBefore(input, elem.childNodes[1]);

        if (elem.getElementsByTagName('ul')[0]) elem.classList.add('open');

        input.onkeypress = function (event) {
            if (event.ctrlKey || event.altKey || event.metaKey) return;

            var chr = getChar(event);

            if (chr == null) return;
            if (chr < '0' || chr > '9') return false;
        };
    });

    var curElem = null;

    // Выделение/снятие выделения конкретного узла дерева
    tree.onmouseover = function(event) {
        if (curElem) return;

        var target = event.target;

        while (target != this) {
            if (target.tagName == 'LI') break;
            target = target.parentNode;
        }
        if (target == this) return;

        var div = document.createElement('div');
        div.classList.add('bg');
        target.appendChild(div);
        curElem = target;
    };

    tree.onmouseout = function(event) {
        if (!curElem) return;
        var target = event.target;

        var relatedTarget = event.relatedTarget;
        if (relatedTarget) {
            while (relatedTarget) {
                // идём по цепочке родителей и проверяем,
                if (relatedTarget == this) break;
                relatedTarget = relatedTarget.parentNode;
            }
        }

        curElem.removeChild(curElem.getElementsByTagName('DIV')[0]);
        curElem = null;
    };

    // Сворачивание/разворачивание узлов дерева
    tree.onclick = function(event) {
        var target = event.target;

        if (target.tagName != 'SPAN') return;

        target = target.parentNode;
        var node = target.getElementsByTagName('ul')[0];
        if (!node) return;

        if (node.style.display) {
            node.style.display = '';
            target.classList.add('open');
            target.classList.remove('close');
        } else {
            node.style.display = 'none';
            target.classList.add('close');
            target.classList.remove('open');
        }
    };
}

document.addEventListener('DOMContentLoaded', documentReady);

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode)
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which)
    }

    return null;
}


