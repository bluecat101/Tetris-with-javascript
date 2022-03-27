
    var i;
    var bgy = 0;
    const width = 350;
    const height = 600;
    const mycanvas= document.getElementById("myCanvas");
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    mycanvas.append(canvas);
    canvas.width = width;
    canvas.height = height;


    var mino_place = [];
    var terrain_data = Array(288);
    terrain_data_length = terrain_data.length - 12;
    terrain_data.fill(0);
    for (i = 0; i < 288; i++) {//create terrain
      if ( i % 12 == 0 || i % 12 == 11 || i > 276) {
        terrain_data[i] = 8;
      }
    }
    function start(){
      document.getElementById("start").style.display = "none";
      make_mino();
      loop();
    }



    //main function
    function loop() {
      context.clearRect(0, 0, width, height);
      background();
      for (const mp of mino_place) {
        terrain_data[mp.position] = mp.kinds;
      }
      display();
      bgy += 1;//decreased drawing speed
      if (bgy > 33) {
        bgy = 0;
        if (check_flag_down() == 0) {//shift 1 row
          for (const mp of mino_place) {
            terrain_data[mp.position] = 0
            mp.position += 12;
          }
        } else {
          if (terrain_data[17] != 0) {
            gameover();
            return 0;
          }
          check_row();
          make_mino();
        }
      }
      window.requestAnimationFrame(loop);//loop
    }


    document.addEventListener('keydown', function (e) {
      if (e.code == 'ArrowLeft' && check_flag_left() == 0) {
        for (const mp of mino_place) {
          terrain_data[mp.position] = 0
          mp.position -= 1;
        }
      } else if (e.code == 'ArrowRight' && check_flag_right() == 0) {
        for (const mp of mino_place) {
          terrain_data[mp.position] = 0
          mp.position += 1;
        }
      } else if (e.code == 'KeyA') {
        if (mino_place[0].kinds == 1) {
          rotate_right("form_I", "left");
        } else if (mino_place[0].kinds != 2) {
          rotate_right("no_I", "left");
        }
      } else if (e.code == 'KeyD') {
        if (mino_place[0].kinds == 1) {
          rotate_right("form_I", "right");
        } else if (mino_place[0].kinds != 2) {
          rotate_right("no_I", "right");
        }
      }
      else if (e.code == 'ArrowDown') {
        bgy += 30
      }
      else if (e.code == 'Space') {
        while (check_flag_down() == 0) {
          for (var mp of mino_place) {
            terrain_data[mp.position] = 0
            mp.position += 12;
          }
        }
      }
    })




    function check_flag_down() {
      for (var mp of mino_place) {
        if (terrain_data[mp.position + 12] != 0 && mp.position + 12 != mino_place[0].position && mp.position + 12 != mino_place[1].position && mp.position + 12 != mino_place[2].position && mp.position + 12 != mino_place[3].position) {
          return 1;
        }
      }
      return 0;
    }
    function check_flag_right() {
      for (var mp of mino_place) {
        if (mp.position % 12 == 10 || (terrain_data[mp.position + 1] != 0 && mp.position + 1 != mino_place[0].position && mp.position + 1 != mino_place[1].position && mp.position + 1 != mino_place[2].position && mp.position + 1 != mino_place[3].position)) {
          return 1;
        }
      }
      return 0;
    }
    function check_flag_left() {
      for (var mp of mino_place) {
        if (mp.position % 12 == 1 || (terrain_data[mp.position - 1] != 0 && mp.position - 1 != mino_place[0].position && mp.position - 1 != mino_place[1].position && mp.position - 1 != mino_place[2].position && mp.position - 1 != mino_place[3].position)) {
          return 1;
        }
      }
      return 0;
    }

    function make_mino() {
      mino_place.splice(0);
      var rand = Math.floor(Math.random() * 7) + 1
      // var rand = Math.floor(Math.random() * 2) + 5
      // var rand =6
      switch (rand) {
        case 1:
          mino_place.push({ kinds: 1, position: 17 });
          mino_place.push({ kinds: 1, position: 16 });
          mino_place.push({ kinds: 1, position: 18 });
          mino_place.push({ kinds: 1, position: 19 });
          break; d
        case 2:
          mino_place.push({ kinds: 2, position: 17 });
          mino_place.push({ kinds: 2, position: 5 });
          mino_place.push({ kinds: 2, position: 6 });
          mino_place.push({ kinds: 2, position: 18 });
          break;
        case 3:
          mino_place.push({ kinds: 3, position: 17 });
          mino_place.push({ kinds: 3, position: 6 });
          mino_place.push({ kinds: 3, position: 16 });
          mino_place.push({ kinds: 3, position: 18 });
          break;
        case 4:
          mino_place.push({ kinds: 4, position: 17 });
          mino_place.push({ kinds: 4, position: 4 });
          mino_place.push({ kinds: 4, position: 16 });
          mino_place.push({ kinds: 4, position: 18 });
          break;
        case 5:
          mino_place.push({ kinds: 5, position: 17 });
          mino_place.push({ kinds: 5, position: 5 });
          mino_place.push({ kinds: 5, position: 6 });
          mino_place.push({ kinds: 5, position: 16 });
          break;

        case 6:
          mino_place.push({ kinds: 6, position: 17 });
          mino_place.push({ kinds: 6, position: 4 });
          mino_place.push({ kinds: 6, position: 5 });
          mino_place.push({ kinds: 6, position: 18 });
          break;
        case 7:
          mino_place.push({ kinds: 7, position: 17 });
          mino_place.push({ kinds: 7, position: 5 });
          mino_place.push({ kinds: 7, position: 16 });
          mino_place.push({ kinds: 7, position: 18 });
          break;
      }
    }

    function rotate_right(condition, dilection) {
      var shift_flag = 0;
      var deplucate_mino_place = [];
      for (i = 0; i < 4; i++) {
        deplucate_mino_place[i] = mino_place[i].position;
      }
      if (condition == "no_I") {
        deplucate_mino_place.forEach(function (dmp, index) {
          if (dilection == "left") {
            switch (Math.abs(dmp - deplucate_mino_place[0])) {
              case 13:
                deplucate_mino_place[index] += 13 / (dmp - deplucate_mino_place[0]) * (-24);
                break;
              case 12:
                deplucate_mino_place[index] += 12 / (dmp - deplucate_mino_place[0]) * (-11);
                break;
              case 11:
                deplucate_mino_place[index] += 11 / (dmp - deplucate_mino_place[0]) * 2;
                break;
              case 1:
                deplucate_mino_place[index] += 1 / (dmp - deplucate_mino_place[0]) * (-13);
                break;
            }
          } else if (dilection == "right") {
            switch (Math.abs(dmp - deplucate_mino_place[0])) {
              case 13:
                deplucate_mino_place[index] += 13 / (dmp - deplucate_mino_place[0]) * (-2);
                break;
              case 12:
                deplucate_mino_place[index] += 12 / (dmp - deplucate_mino_place[0]) * (-13);
                break;
              case 11:
                deplucate_mino_place[index] += 11 / (dmp - deplucate_mino_place[0]) * (-24);
                break;
              case 1:
                deplucate_mino_place[index] += 1 / (dmp - deplucate_mino_place[0]) * 11;
                break;
            }

          }

        });

      } else if (condition == "form_I") {
        var rotation_number = get_number_rotation();
        if (dilection == "left") {
          switch (rotation_number) {
            case 0:
              deplucate_mino_place[0] += 12;
              break;
            case 1:
              deplucate_mino_place[0] += -1;
              break;
            case 2:
              deplucate_mino_place[0] += -12;
              break;
            case 3:
              deplucate_mino_place[0] += 1;
              break;
          }
          rotation_number -= 1;
        } else if (dilection == "right") {
          switch (rotation_number) {
            case 0:
              deplucate_mino_place[0] += 1;
              break;
            case 1:
              deplucate_mino_place[0] += 12;
              break;
            case 2:
              deplucate_mino_place[0] -= 1;
              break;
            case 3:
              deplucate_mino_place[0] -= 12;
              break;

          }
          rotation_number += 1;
        }
        if (rotation_number == -1) {
          rotation_number = 3;
        } else if (rotation_number == 4) {
          rotation_number = 0;
        }
        // 生成する
        switch (rotation_number) {
          case 0:
            deplucate_mino_place[1] = deplucate_mino_place[0] - 1;
            deplucate_mino_place[2] = deplucate_mino_place[0] + 1;
            deplucate_mino_place[3] = deplucate_mino_place[0] + 2;
            break;
          case 1:
            deplucate_mino_place[1] = deplucate_mino_place[0] - 12;
            deplucate_mino_place[2] = deplucate_mino_place[0] + 12;
            deplucate_mino_place[3] = deplucate_mino_place[0] + 24;
            break;
          case 2:
            deplucate_mino_place[1] = deplucate_mino_place[0] + 1;
            deplucate_mino_place[2] = deplucate_mino_place[0] - 1;
            deplucate_mino_place[3] = deplucate_mino_place[0] - 2;
            break;
          case 3:
            deplucate_mino_place[1] = deplucate_mino_place[0] + 12;
            deplucate_mino_place[2] = deplucate_mino_place[0] - 12;
            deplucate_mino_place[3] = deplucate_mino_place[0] - 24;
            break;
        }
        if (rotation_number == 0) {
          switch (deplucate_mino_place[0] % 12) {
            case 0:
              shift_flag = 2;
              break;
            case 10:
              shift_flag = -2;
              break;
          }
        } else if (rotation_number == 2) {
          switch (deplucate_mino_place[0] % 12) {
            case 1:
              shift_flag = 2;
              break;
            case 11:
              shift_flag = -2;
              break;
          }
        }
      }
      //ずれの考慮
      if (shift_flag == 0) {
        for (i = 0; i < 4; i++) {
          if (deplucate_mino_place[i] % 12 == 0) {
            shift_flag = 1;
          } else if (deplucate_mino_place[i] % 12 == 11) {
            shift_flag = -1;
          }
        }
      }


      for (i = 0; i < 4; i++) {
        deplucate_mino_place[i] += shift_flag;

      };


      //^^^複製上で移動を行う

      var undo = 0;//検証
      deplucate_mino_place.forEach(function (dmp) {
        if (terrain_data[dmp] != 0 && (dmp != mino_place[0].position && dmp != mino_place[1].position && dmp != mino_place[2].position && dmp != mino_place[3].position)) {
          //元に戻す
          undo = 1;
        }
      });
      if (undo == 0) {
        for (i = 0; i < 4; i++) {
          terrain_data[mino_place[i].position] = 0
          mino_place[i].position = deplucate_mino_place[i];
        }
      } else {
      }
    }

    function get_number_rotation() {
      switch (mino_place[3].position - mino_place[0].position) {
        case 2:
          return 0;
          break;
        case 24:
          return 1;
          break;
        case -2:
          return 2;
          break;
        case -24:
          return 3;
          break;
      }
    }

    function check_row() {
      var check_row_number = 0;
      for (var i = 1; i < terrain_data_length / 12; i++) {
        for (var j = 0; j < 12; j++) {
          if (terrain_data[i * 12 + j] != 0) {
            check_row_number += 1;
          }
        }
        if (check_row_number == 12) {
          for (var j = 0; j < 12; j++) {
            terrain_data[i * 12 + j] = 0;
          }
          shift(i);
        }
      }
    }

    function shift(shift_row) {
      for (var j = shift_row * 12 - 1; j >= 0; j--) {
        terrain_data[j + 12] = terrain_data[j];
      }

    }

    function gameover() {
      document.getElementById("gameover").style.visibility = "visible";
    }


    function display() {
      for (i = 0; i < terrain_data_length; i++) {
        x = Math.floor(i % 12) * 20 + 80 - 20;
        y = Math.floor(i / 12) * 20 + 100 - 20;
        switch (terrain_data[i]) {
          case 0:
            context.fillStyle = 'rgba(0, 0, 0, 0)';
            break;
          case 1:
            context.fillStyle = 'rgba(0, 255, 255,1)';
            break;
          case 2:
            context.fillStyle = 'rgba(255, 255, 0,1)';
            break;
          case 3:
            context.fillStyle = 'rgba(255, 165, 0,1)';

            break;
          case 4:

            context.fillStyle = 'rgba(0, 0, 255,1)';
            break;
          case 5:
            context.fillStyle = 'rgba(0, 255, 0,1)';
            break;
          case 6:
            context.fillStyle = 'rgba(255, 0, 0,1)';
            break;
          case 7:
            context.fillStyle = 'rgba(128, 0, 128,1)';
            break;
          case 8:
            context.fillStyle = 'rgba(0, 0, 0, 0)';

            break;
        }
        context.fillRect(x, y, 20, 20);
      }
    }


    function background() {
      let i;
      for (i = 0; i <= 10; i++) {
        context.moveTo(80 + i * 20, 100);
        context.lineTo(80 + i * 20, 540);
      }
      for (i = 0; i < 22; i++) {
        context.moveTo(80, 100 + i * 20);
        context.lineTo(280, 100 + i * 20);
      }
      context.strokeStyle = "rgba(0,0,0,0.3)";
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      context.rect(80, 100, 200, 440)
      context.strokeStyle = "rgba(0,0,0,1)";
      context.lineWidth = 2;
      context.stroke();
    }
