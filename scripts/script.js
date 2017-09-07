(() => {
    const fieldDoc = document.querySelector("svg.js-calendar-graph-svg g");
    if (!fieldDoc) {
        return;
    }

    const colors = [
        "#ebedf0",
        "#c6e48b",
        "#7bc96f",
        "#239a3b",
        "#196127"
    ];

    const life = new LifeGame(7, 53);

    const elements = [];
    const initField = new Array(7 * 53);


    const gElements = fieldDoc.querySelectorAll("g");
    for (let y = 0; y < life.height; ++y) {
        const rect = gElements[y].getElementsByTagName("rect");
        // 右端の列の足りない部分を生成する処理
        while (rect.length < 7) {
            const r = document.createElementNS("http://www.w3.org/2000/svg","rect");
            r.setAttribute("class", "day");
            r.setAttribute("width", 10);
            r.setAttribute("height", 10);
            r.setAttribute("x", -39);
            r.setAttribute("y", 12 * rect.length);
            r.setAttribute("fill", colors[0]);
            rect[rect.length] = r;
        }
        for (let x = 0; x < life.width; ++x) {
            elements.push(rect[x]);
            const v = rect[x].getAttribute("fill") !== "#ebedf0" ? 1 : 0;
            initField[y * life.width + x] = v;
        }
    }
    life.setFieldData(initField);
    setTimeout(() => {
        setInterval(() => {
            life.update();
            for (let y = 0; y < life.height; ++y) {
                for (let x = 0; x < life.width; ++x) {
                    if (life.field[y * life.width + x] === 1) {
                        const rnd = Math.floor(Math.random() * (colors.length - 1)) + 1;
                        elements[y * life.width + x].setAttribute("fill", colors[rnd]);
                    } else {
                        elements[y * life.width + x].setAttribute("fill", colors[0]);
                    }
                }
            }
        }, 500);
    }, 2000);
})();