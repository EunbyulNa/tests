$(document).ready(function () {

 $.ajax({

   url:'product.json',
   dataType:'json',

   success:function(data) {//파일 업로드 성공시
    var useData = data.product;
    console.log(useData);

    function dataPrint() {

      if(useData.length > 0) {
      var ul = $('<ul>');


      for(var i in useData){   //li 반복을 위한 for 문
      var li = $('<li>');
      var div = $('<div>');

      var $Name = useData[i].Name;
      var $Price = useData[i].Price;
      var $Descript = useData[i].Descript;
      var $Image = useData[i].Image;

      li.append($('<img>').attr({src:$Image, onerror:
        'javascript:this.src="img/error.png"'})
            );

            div.append(
              $('<h4>').text($Name),
              $('<h5>').text($Price),
              $('<h6>').text($Descript),
              $('<button>삭제 X</button>')
            );

          ul.append(li);
          li.append(div);

    }//for 끝

      $('#products h3').after(ul);

    } else{
      var img = $('<img>').attr({src:"img/error.png"});
      $('#products h3').after(img);
    }
  }//dataPrint 끝

    dataPrint(); //dataprint()실행

    $(document).on('click', '#products li button', function() {
      //console.log('클릭');

      var index = $(this).parents('li').index();
      //A.parents() finding A's parents elements(모든부모)
      //A.parent() finding A's parents elements(바로위)
      console.log(index + '번째 메뉴를 클릭했습니다');

      useData.splice(index, 1); //splice(a,b) a를 b의 개수만큼 없앤다.
                                 //내가 클릭한 index 의 1개만 없앤다.

      $('#products ul').remove(); //모두없앤다

      dataPrint(); //다시 화면에 뿌려준다

    });//삭제끝

     //추가하기
    $('form button').on('click', function (e) {
      e.preventDefault();
      var lastValue =
      {
        "Name" : $('#pName').val(),
        "Price" : $('#pPrice').val(),
        "Image" : $('#pImage').val(),
        "Descript" : $('#pDesc').val()

      }

      if( $('#pName').val() != '' &&  $('#pPrice').val() != '' &&
          $('#pImage').val() != '' &&  $('#pDesc').val() != '' )
          {

           useData.push(lastValue);

        //console.log(useData);

          $('#products ul').remove();

          dataPrint();


        
     }else {
       alert('칸을 추가하세요');
     }
    });//추가하기 끝

  },//success끝

   error:function() {//파일 업로드 실패했을
     var img = $('<img>').attr({src:"img/error.png"});

     $('#products h3').after(img);

   },//error끝




 });//$.ajax끝



});
