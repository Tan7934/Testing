/*jslint browser: true, devel: true */
"use strict";

// 1. 准备情书内容
var loveLetter = "你好，新年快乐，祝你妈妈生日快乐，希望她福如东海，寿比南山，心想事成，身体健康以及快快乐乐一辈子";

// 3. 设置打字速度 (毫秒)
var typingSpeed = 70;

// 4. 打字机函数
function typeWriter(text, i, element, speed) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        setTimeout(function () {
            typeWriter(text, i + 1, element, speed);
        }, speed);
    } else {
        // 全部结束后可以触发惊喜
        console.log("打字完成！");
    }
}

// 5. 确保页面加载完后再运行
window.onload = function () {
    // 关键：把获取元素的逻辑放进 onload，防止找不到 'letter-output'
    var outputElement = document.getElementById('letter-output');
    if (outputElement) {
        typeWriter(loveLetter, 0, outputElement, typingSpeed);
    }
};