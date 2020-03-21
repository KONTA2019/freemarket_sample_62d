$(document).on('turbolinks:load', function(){
  
  // 画像が選択された時プレビュー表示、inputの親要素のulをイベント元に指定
  $('#image-input').on('change', function(e){

    //ファイルオブジェクトを取得する
    let files = e.target.files;
    $.each(files, function(index, file) {
      let reader = new FileReader();

      //画像でない場合は処理終了
      if(file.type.indexOf("image") < 0){
        alert("画像ファイルを指定してください。");
        return false;
      }
      //アップロードした画像を設定する
      reader.onload = (function(file){
        return function(e){
          let imageLength = $('#output-box').children('li').length;
          // 表示されているプレビューの数を数える
          
          let labelLength = $("#image-input>label").eq(-1).data('label-id');
          // #image-inputの子要素labelの中から最後の要素のカスタムデータidを取得

          // プレビュー表示
          $('#image-input').before(`<li class="preview-image" id="upload-image${labelLength}" data-image-id="${labelLength}">
                                      <figure class="preview-image__figure">
                                        <img src='${e.target.result}' title='${file.name}' >
                                      </figure>
                                      <div class="preview-image__button">
                                        <a class="preview-image__button__edit" href="">編集</a>
                                        <a class="preview-image__button__delete" data-image-id="${labelLength}">削除</a>
                                      </div>
                                    </li>`);
          $("#image-input>label").eq(-1).css('display','none');
          // 入力されたlabelを見えなくする

          if (imageLength < 9) {
            // 表示されているプレビューが９以下なら、新たにinputを生成する
            $("#image-input").append(`<label for="item_images${labelLength+1}" class="sell-container__content__upload__items__box__label" data-label-id="${labelLength+1}">
                                        <input multiple="multiple" class="sell-container__content__upload__items__box__input" id="item_images${labelLength+1}" style="display: none;" type="file" name="item[images][]">
                                        <i class="fas fa-camera fa-lg"></i>
                                      </label>`);
          };
        };
      })(file);
      reader.readAsDataURL(file);
    });
  });

  //削除ボタンが押された時
  $(document).on('click', '.preview-image__button__delete', function(){
    let targetImageId = $(this).data('image-id');
    // イベント元のカスタムデータ属性の値を取得
    $(`#upload-image${targetImageId}`).remove();
    //プレビューを削除
    $(`[for=item_images${targetImageId}]`).remove();
    //削除したプレビューに関連したinputを削除

    let imageLength = $('#output-box').children('li').length;
    // 表示されているプレビューの数を数える
    if (imageLength ==9) {
      let labelLength = $("#image-input>label").eq(-1).data('label-id');
      // 表示されているプレビューが９なら,#image-inputの子要素labelの中から最後の要素のカスタムデータidを取得
      $("#image-input").append(`<label for="item_images${labelLength+1}" class="sell-container__content__upload__items__box__label" data-label-id="${labelLength+1}">
                                  <input multiple="multiple" class="sell-container__content__upload__items__box__input" id="item_images${labelLength+1}" style="display: none;" type="file" name="item[images][]">
                                  <i class="fas fa-camera fa-lg"></i>
                                </label>`);
    };
  });

  // f.text_areaの文字数カウント
  $("textarea").keyup(function(){
    let txtcount = $(this).val().length;
    $("#word-count").text(txtcount);
  });

  //販売価格入力時の手数料計算
  $('#item_price').keyup(function(){
    let price= $(this).val();
    if (price >= 300 && price <= 9999999){
      let fee = Math.floor(price * 0.1);
      // 小数点以下切り捨て
      let profit = (price - fee);
      $('.sell-container__content__commission__right').text('¥'+fee.toLocaleString());
      // 対象要素の文字列書き換える
      $('.sell-container__content__profit__right').text('¥'+profit.toLocaleString());
    } else{
      $('.sell-container__content__commission__right').html('ー');
      $('.sell-container__content__profit__right').html('ー');
    }
  });

  // 各フォームの入力チェック
  $(function(){
    //画像　作成中
    // $('.sell-container__content__upload__items__box__input').on('click',function(){
    //   let images = $(this).val();
    //   console.log(images)    
    //   $('#error-image').text('画像がありません').css('display','none');
     
    //   if[$('.sell-container__content__upload__items__box__input').on('change')]{
        
    //       $('#error-image').text('画像がありません').css('display','block');
    //     }else{
    //       $('#error-image').text('OK').css('display','block');
    //     }

    //   });
     
    // });





    //画像
    $('.sell-container__content__upload__items__box__label').on('change',function(){
      let images = $(this).val();
      console.log(images)
      if(images ==''){
        $('#error-image').text('画像がありません');
      }else{
        $('#error-image').text('OK');
      }
    });

    //商品名
    $('.sell-container__content__name').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-name').text('入力してください');
        $(this).css('border-color','red');
      }else{
        $('#error-name').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //商品説明
    $('.sell-container__content__description').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-text').text('入力してください');
        $(this).css('border-color','red');
      }else{
        $('#error-text').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //カテゴリー
    $('#category-select').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-category').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-category').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //状態
    $('#condition-select').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-condition').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-condition').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //送料負担
    $('#deliverycost-select').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-deliverycost').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-deliverycost').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //発送元
    $('#pref-select').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-pref').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-pref').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //発送までの日数
    $('#delivery_days-select').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-delivery_days').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-delivery_days').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //価格
    $('.sell-container__content__price__form__box').on('blur',function(){
      let value = $(this).val();
      if(value < 300 || value > 9999999){
        $('#error-price').text('300以上9999999以下で入力してください');
        $(this).css('border-color','red');
      }else{
        $('#error-price').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });
  });
});