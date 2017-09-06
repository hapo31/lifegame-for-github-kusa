
class LifeGame {
    constructor(width, height) {
        this._width = width;
        this._height = height;

        this._field = new Array(width * height);
    }

    setFieldData(array) {
        this._field = Object.assign({}, array);
    }

    update() {
        const tempField = Object.assign({}, this._field);

        for (let y = 0; y < this._height; ++y) {
            for (let x = 0; x < this._width; ++x) {
                const livecount =
                    this.isLive(x + 1, y) +
                    this.isLive(x - 1, y) +
                    this.isLive(x, y + 1) +
                    this.isLive(x, y - 1) +
                    this.isLive(x + 1, y + 1) +
                    this.isLive(x - 1, y + 1) +
                    this.isLive(x + 1, y - 1) +
                    this.isLive(x - 1, y - 1);

                if ((livecount === 2 && this._field[y * this._width + x]) || livecount === 3) {
                    tempField[y * this._width + x] = 1;
                } else {
                    tempField[y * this._width + x] = 0;
                }
            }
        }
        this._field = tempField;
    }


    isLive(x, y) {
        if (x < 0) {
            x = this._width - 1;
        } else if (x >= this._width) {
            x = 0;
        }
        if (y < 0) {
            y = this._height - 1;
        } else if (y >= this.height) {
            y = 0;
        }
        return this._field[y * this._width + x] !== 0; // 値チェック
    }

    get height() { return this._height; }
    get width() { return this._width; }
    get field() { return this._field; }
}


