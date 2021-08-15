    function rearrangeCards() {
      var month = parseInt(document.forms.id_form.id_selectMonth.value);
      var day = parseInt(document.forms.id_form.id_selectDay.value);
      var birthdayname = document.forms.id_form.id_textBoxName.value;
      
      document.getElementById("birthdayname").innerHTML = birthdayname;
      document.getElementById("memo").innerHTML = month + '月' + day + '日';

      /* console.log(month, day, month % 2 * 2 + day % 2); */


      putMonth(month, day);
      
      /* console.log(getHoroscope(month, day)); */
      putHoroscope(month, day);

      arr = getRandomDayArray(day);
      putDay(arr);
    }

    const horoSvg = ['yagi.svg', 'mizugame.svg', 'uo.svg', 'ohitsuji.svg', 
                      'oushi.svg', 'futago.svg', 'kani.svg', 'shishi.svg', 
                      'otome.svg', 'tenbin.svg', 'sasori.svg', 'ite.svg'];
    
    const horoscopeName = ['山羊座', '水瓶座', '魚座', '牡羊座', '牡牛座', '双子座',
                            '蟹座', 'しし座', '乙女座', 'てんびん座', '蠍座', '射手座'];

    const selectMonth = document.getElementById('id_selectMonth');
    const selectDay = document.getElementById('id_selectDay');

    const checkboxStar = document.getElementById('checkboxStar');

    const radioMonth = document.getElementById('radioMonth');
    const radioHoroscope = document.getElementById('radioHoroscope');
    
    putHTML();
    // drawTrimMark();
    

    function drawTrimMark() {
      var canvas = document.getElementById('trimMark');
      var context = canvas.getContext('2d');

      context.beginPath(); //パスのリセット
      context.lineWidth =  0.1; //線幅
      
      mx = 210;
      my = 0;
      lx = 210;
      ly = 297;
      context.moveTo(mx, my); //線の始点
      context.lineTo(lx, ly); //線の終点
      context.stroke(); //描画      
    }    

    function putHTML() {
      // var card_day_arr = [];
      for (let j = 1; j <= 8; j++) {
        for (let i = 1; i <= 6; i++) {
          var parentDiv = document.getElementById('card-month');
          var newElement = document.createElement('div');
          var newContent = document.createTextNode('13月');
          newElement.appendChild(newContent);
          newElement.setAttribute('id', 'card-month' + j + '-' + i);
          newElement.setAttribute('class', 'card-month');
 
          parentDiv.appendChild(newElement);
        }
      }
      for (let j = 1; j <= 8; j++) {
        for (let i = 1; i <= 6; i++) {
          var parentDiv = document.getElementById('card-horoscope');
          var newElement = document.createElement('img');
          newElement.src = '';
          newElement.setAttribute('id', 'card-horoscope' + j + '-' + i);
          newElement.setAttribute('class', 'card-horoscope');
 
          parentDiv.appendChild(newElement);
        }
      }
      for (let j = 1; j <= 8; j++) {
        for (let i = 1; i <= 2; i++) {
          var parentDiv = document.getElementById('card-day');
          var newElement = document.createElement('div');
          var newContent = document.createTextNode('1　2　3　4　10　11　12　13');
          newElement.appendChild(newContent);
          newElement.setAttribute('id', 'card-day' + j + '-' + i);
          newElement.setAttribute('class', 'card-day');
 
          parentDiv.appendChild(newElement);
        }
      }
    }

    function getRandom(without, min, max) {
      var random = Math.floor(Math.random() * (max + 1 - min)) + min;

      if (without < min || without > max) {
        return random;
      } else {
        while (random == without) {
          random = Math.floor(Math.random() * (max + 1 - min)) + min;
        }
      }

      console.log(random);
    }

    function getRandomDay(day, min, max) {
      var arr = Array(max - min + 1);
      for (let i = min; i <= max; i++) {
        arr[i - min] = i;
      }

      var b = arr.splice(day - min, 1);
      var a = arr.length;

      //シャッフルアルゴリズム
      while (a) {
        var j = Math.floor(Math.random() * a);
        var t = arr[--a];
        arr[a] = arr[j];
        arr[j] = t;
      }

      /* console.log(b); */
      /* console.log(arr); */
      return arr;
    }

    function getRandomDayArray(day) {
      var days = new Array(8);
      for (let i = 0; i < 8; i++) {
        var tmp = getRandomDay(day, 1, 31);
        days[i] = tmp.splice(0, 16);

        if (i < 4) {
          days[i][0] = day;
          days[i].sort(compareFunc);
        } else {
          days[i].sort(compareFunc);
        }
      }
      /* console.log(days); */

      return days;
    }

    function putDay(days) {
      var card_day_arr = [];
      for (let j = 1; j <= 8; j++) {
        for (let i = 1; i <= 2; i++) {
          card_day_arr.push(document.getElementById("card-day" + j + "-" + i));
        }
      }
      /* console.log(card_day_arr); */

      for (let j = 0; j < 8; j++) {
        var daysStr1 = '';
        var daysStr2 = '';
        let numStr1 = 8;
        let numStr2 = 8;

        for (let i = 0; i < numStr1; i++) {
          daysStr1 += '<li>' + days[j][i] + '</li>';
        }
        for (let i = numStr1; i < numStr1 + numStr2; i++) {
          daysStr2 += '<li>' + days[j][i] + '</li>';
        }
        card_day_arr[j * 2 + 0].innerHTML = '<ul>' + daysStr1 + '</ul>';
        card_day_arr[j * 2 + 1].innerHTML = '<ul>' + daysStr2 + '</ul>';
      }
    }

    // dm. dm.
    // 100 101
    // 110 111
    // 000 001
    // 010 011

    // .md
    // 001
    // 101
    // 011
    // 111
    // 000
    // 100
    // 010
    // 110

    function compareFunc(a, b) {
      return a - b;
    }


    function putHoroscope(month, day) {
      let arr = getRandomHoroscopeArray(month, day);
      
      let cardHoroscopeArr = [];
      for (let j = 1; j <= 8; j++) {
        for (let i = 1; i <= 6; i++) {
          cardHoroscopeArr.push(document.getElementById("card-horoscope" + j + "-" + i));
        }
      }
      /* console.log(cardHoroscopeArr); */

      for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 6; i++) {
          cardHoroscopeArr[j * 6 + i].src = './img/' + horoSvg[arr[j][i] - 1];
        }
      }
    }

    function getRandomHoroscopeArray(month, day) {
      var arr = new Array(8);
      for (let j = 0; j < 8; j++) {
        arr[j] = [];
      }

      var horo = getHoroscope(month, day);
      /* console.log(horo); */
      var num = 8 * 6;
      var horo1 = 0;
      var horo2 = 0;

      /* for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 6; i++) {
          arr[j][i] = (j % 2) + i * 2 + 1;
        }
      } */

      if (horo > 100) {
        horo1 = Math.floor(horo % 100);
        horo2 = Math.floor(horo / 100);
        /* console.log(horoscopeName[horo1 - 1], horoscopeName[horo2 - 1]); */
        arr[2][0] = horo1;
        arr[2][1] = horo2;
        arr[3][0] = horo1;
        arr[3][1] = horo2;
        arr[6][0] = horo1;
        arr[6][1] = horo2;
        arr[7][0] = horo1;
        arr[7][1] = horo2;
        num -= 8;
      } else {
        horo1 = horo;
        /* console.log(horoscopeName[horo1 - 1]); */
        arr[2][0] = horo1;
        arr[3][0] = horo1;
        arr[6][0] = horo1;
        arr[7][0] = horo1;
        num -= 4;
      }

      m = 1;
      for (let j = 0; j < 8; j++) {
        for (let i = arr[j].length; i < 6; i++) {
          while (m == horo1 || m == horo2) {
            m++;
            if (m > 12) m = 1;
          }
          arr[j][arr[j].length] = m;
          m++;
          if (m > 12) m = 1;
          num--;
        }
      }


      for (let m = 0; m < 200; m++) {
        var j = Math.floor(Math.random() * 8);
        var i = Math.floor(Math.random() * 6);
        while (arr[j][i] == horo1 || arr[j][i] == horo2) {
          j = Math.floor(Math.random() * 8);
          i = Math.floor(Math.random() * 6);
        }
        var l = Math.floor(Math.random() * 8);
        var k = Math.floor(Math.random() * 6);
        while (arr[l][k] == horo1 || arr[l][k] == horo2) {
          l = Math.floor(Math.random() * 8);
          k = Math.floor(Math.random() * 6);
        }
        if (arr[l].includes(arr[j][i]) || arr[j].includes(arr[l][k])) {
        } else {
          var t = arr[l][k];
          arr[l][k] = arr[j][i];
          arr[j][i] = t;
        }
      }


      for (let j = 0; j < 8; j++) {
        arr[j].sort(compareFunc);
      }
      /* console.log(arr); */

      return arr;
    }



    function getHoroscope(month, day) {
      month--; /* 0-11 */
      var flag_next = false;
      var border = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
      var horo1 = month;
      var horo2 = 0;
      
      /* border day 17-23 */
      if (day >= 18 && day <= 24) {
        horo2 = (horo1 + 1) % 12;
        horo1++;
        horo2++;
        /* console.log(horoscopeName[horo1 - 1], horoscopeName[horo2 - 1]); */
      } else {
        if (day >= border[month]) {
          horo1 = (horo1 + 1) % 12;
        }
        horo1++;
        /* console.log(horoscopeName[horo1 - 1]); */
      }
      
      return horo1 + horo2 * 100;
    }

    function getHoroscopeOld(month, day) {
      var flag_next = false;
      var border = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
      var index = month - 1;
      if (day >= border[index]) {
        index++;
        flag_next == true;
      }
      index %= 12;

      if (day >= 18 && day <= 24) {
        if (flag_next == true) {
          index += ((index + 1) % 12) * 100;
        } else {
          index += ((index + 11) % 12) * 100;
        }
      }
      /* border day 17-23 */

      return index;
    }

    function getRandomMonthArray(month) {
      /* 配列[8][6]のカードごとに偶数または奇数月を代入 */
      var arr = new Array(8);
      for (let j = 0; j < 8; j++) {
        arr[j] = new Array(6);
        for (let i = 0; i < 6; i++) {
          arr[j][i] = (j % 2) + i * 2 + 1;
        }
      }

      /* 200回入れ替える */
      for (let m = 0; m < 200; m++) {
        var i = Math.floor(Math.random() * 6);
        var j = Math.floor(Math.random() * 8);
        var k = Math.floor(Math.random() * 6);
        var l = Math.floor(Math.random() * 8);
        if (arr[l].includes(arr[j][i]) || arr[j].includes(arr[l][k])) {
        } else {
          var t = arr[l][k];
          arr[l][k] = arr[j][i];
          arr[j][i] = t;
        }
      }

      for (let j = 0; j < 8; j++) {
        arr[j].sort(compareFunc);
      }

      var tmp = new Array(8);
      var t = 0;
      var f = 0;
      for (let j = 0; j < 8; j++) {
        if (arr[j].includes(month)) {
          tmp[t + 2 + (t > 1) * 2] = arr[j];
          t++;
        } else {
          tmp[f + 0 + (f > 1) * 2] = arr[j];
          f++;
        } 
      }
      
      /* console.log(tmp); */
      return tmp;
    }

    function putMonth(month, day) {
      let arr = getRandomMonthArray(month);
      
      var cardMonthArr = [];
      for (let j = 1; j <= 8; j++) {
        for (let i = 1; i <= 6; i++) {
          cardMonthArr.push(document.getElementById("card-month" + j + "-" + i));
        }
      }
      /* console.log(cardMonthArr); */

      for (let j = 0; j < 8; j++) {
        for (let i = 0; i < 6; i++) {
          cardMonthArr[j * 6 + i].innerText = arr[j][i] + '月';
        }
      }
    }

    function setSelectMonth() {
      // 月を生成(12)
      for (let i = 1; i <= 12; i++) {
        let op = document.createElement('option');
        op.value = i;
        op.text = i;
        selectMonth.appendChild(op);
      }
    }

    function setSelectDay() {
      let children = selectDay.children
      while (children.length) {
        children[0].remove()
      }
      if (selectMonth.value !== '') {
        /* console.log(selectMonth.value); */
        const last_day = new Date(2020, selectMonth.value, 0).getDate();

        for (let i = 1; i <= last_day; i++) {
          let option = document.createElement('option');
          option.value = i;
          option.text = i;
          selectDay.appendChild(option);
        }
      }
    }

    function setVersion() {
      var modified = new Date(document.lastModified);
      var year  = modified.getFullYear();
      var month = ('0' + (modified.getMonth() + 1)).slice(-2);
      var date  = ('0' + modified.getDate()).slice(-2);

      document.getElementById("version").innerHTML = 'ver. ' + year + month + date;
    }

    function showStar() {
      var star = document.getElementsByClassName('star');
      if (checkboxStar.checked) {
        for (var i = 0; i < star.length; i++) {
            star[i].style.display = "block";
        }
      } else {
        for (var i = 0; i < star.length; i++) {
          star[i].style.display = "none";
        }
      }
    }

    function showHoro() {
      var horo = document.getElementsByClassName('card-horoscope');
      var month = document.getElementsByClassName('card-month');
      if (radioHoroscope.checked) {
        for (var i = 0; i < horo.length; i++) {
            horo[i].style.display = "block";
        }
        for (var i = 0; i < month.length; i++) {
            month[i].style.display = "none";
        }
      } else {
        for (var i = 0; i < horo.length; i++) {
          horo[i].style.display = "none";
        }
        for (var i = 0; i < month.length; i++) {
            month[i].style.display = "block";
        }
      }
    }

    window.onload = function() {
      setVersion();
      setSelectMonth();
      setSelectDay();
      showHoro();

      rearrangeCards();
      selectMonth.addEventListener('change', setSelectDay, false);
      selectMonth.addEventListener('change', rearrangeCards, false);
      selectDay.addEventListener('change', rearrangeCards, false);
      checkboxStar.addEventListener('change', showStar, false);
      radioMonth.addEventListener('change', showHoro, false);
      radioHoroscope.addEventListener('change', showHoro, false);
      document.forms.id_form.id_textBoxName.addEventListener('change', rearrangeCards, false);
    };
