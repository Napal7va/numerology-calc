
function Matrix() {

    this.day = 0;
    this.month = 0;
    this.year = 0;

    this.normalizedDay = 0;
    this.normalizedMonth = 0;
    this.normalizedYear = 0;

    this.num1 = 0;
    this.num2 = 0;
    this.num3 = 0;
    this.num4 = 0;

    this.fate_num = '';
    this.temperament_num = '';
    this.aim_num = '';
    this.family_num = '';
    this.habbits_num = '';
    this.every_day_life_num = '';

    this.array = [];

    this.init = function(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;

        this.normalizedDay = this.normalize(this.day);
        this.normalizedMonth = this.normalize(this.month);
        this.normalizedYear = this.normalize(this.year);

        var sumOfDayAndMonth = this.getSum(this.normalizedDay + this.normalizedMonth);
        var sumOfYear = this.getSum(this.normalizedYear);

        this.num1 = sumOfDayAndMonth + sumOfYear;
        this.num2 = this.getSum('' + this.num1);
        this.num3 = Math.abs(this.num1 - parseInt(('' + this.day).charAt(0), 10) * 2);
        this.num4 = this.getSum('' + this.num3);

        this.array = [];

        var line1 = this.normalizedDay + this.normalizedMonth + this.normalizedYear;
        var line2 = this.normalize(this.num1) + this.normalize(this.num2) +
            this.normalize(this.num3) + this.normalize(this.num4);

        var str = line1 + line2;
        var array = [];

        this.array.push(this.getMatches(str, 1));
        this.array.push(this.getMatches(str, 2));
        this.array.push(this.getMatches(str, 3));
        this.array.push(this.getMatches(str, 4));
        this.array.push(this.getMatches(str, 5));
        this.array.push(this.getMatches(str, 6));
        this.array.push(this.getMatches(str, 7));
        this.array.push(this.getMatches(str, 8));
        this.array.push(this.getMatches(str, 9));

        this.temperament_num = this.getNumbersCount(2, 4, 6);
        this.aim_num = this.getNumbersCount(0, 3, 6);
        this.family_num = this.getNumbersCount(1, 4, 7);
        this.habbits_num = this.getNumbersCount(2, 5, 8);
        this.every_day_life_num = this.getNumbersCount(3, 4, 5);

        var fate = 0;

        for(fate = this.getSum('' + this.num1); fate > 9 && fate != 11; fate = this.getSum('' + fate));

        this.fate_num = '' + fate;
    }

    this.normalize = function(digit) {
        if (digit >= 0 && digit <= 9) {
            return '0' + digit
        }

        return '' + digit
    }

    this.getNumbersCount = function(i1, i2, i3) {
        return '' + (this.array[i1] + this.array[i2] + this.array[i3]).length;
    }

    this.getSum = function(str) {
        var sum = 0;

        str.split('').forEach(function(item) {
            sum += parseInt(item, 10);
        });

        return sum;
    }

    this.getMatches = function(str, digit) {
        var res = '';

        str.split('').forEach(function(item) {
            var intItem = parseInt(item, 10);
            if (intItem == digit) {
                res += item;
            }
        });

        return res;
    }

    this.getNormalizedDate = function() {
        return this.normalizedDay + '/' + this.normalizedMonth + '/' + this.normalizedYear;
    }

    this.getMainNumbers = function() {
        return '' + this.num1 + ', ' +
            '' + this.num2 + ', ' +
            '' + this.num3 + ', ' +
            '' + this.num4;
    }

    this.getMatrixString = function() {
        var str = '';

        this.array.forEach(function(item, i, arr) {
            str += item.length > 0 ? item : '-';
            if (i < arr.length -1) {
                str += '/';
            }
        });

        return str;
    }

    this.getString = function(isRussian, withDate) {
        if (typeof(isRussian)==='undefined') isRussian = true;
        if (typeof(withDate)==='undefined') withDate = true;

        var str = withDate ? (this.getNormalizedDate() + '; ') : '';

        str += this.getMatrixString() + ';';

        str += ' ' + (isRussian ? 'ЧС:' : 'DN:') + this.fate_num;
        str += ' ' + (isRussian ? 'Б:' : 'M:') + this.every_day_life_num;
        str += ' ' + (isRussian ? 'Т:' : 'T:') + this.temperament_num;
        str += ' ' + (isRussian ? 'Ц:' : 'P:') + this.aim_num;
        str += ' ' + (isRussian ? 'С:' : 'F:') + this.family_num;
        str += ' ' + (isRussian ? 'П:' : 'H:') + this.habbits_num;

        return str;
    }

    this.getShortString = function(isRussian) {
        if (typeof(isRussian)==='undefined') isRussian = true;

        var fateText = isRussian ? 'ЧС:' : 'DN:';
        return this.getMatrixString() + ';' + fateText + this.fate_num;
    }
};