a = {};
scrollHeight = 0;
toScroll = true;
togleScrollInfinite = true;
lastHasMore = true;
chrome.runtime.onMessage.addListener(function(request,sender, sendResponse) {
  if(request.action === 'colect') {
    debugger;

    //var b = '';




        var mainPage = $("._2nmDZ");
        //scrollHeight = mainPage[0].scrollHeight;
        var hasMore = mainPage[0].scrollHeight != scrollHeight;

        if (lastHasMore) {

          var scrolling = function() {
            mainPage.animate({ scrollTop: 0 }, function() {
                  scrollHeight = mainPage[0].scrollHeight;
            });
          }

          scrolling();

            var ptrn = /[+][\d]{1,3} [\d]+-[\d]+-[\d]+/
          //$.each($('.msg.msg-group.msg-system').find("div span[dir='rtl']"), function(key, value) {
          $.each($('.vW7d1._3rjxZ').find("div span[dir='rtl']"), function(key, value) {
              var curr = value.innerText
              var theMatch = curr.match(ptrn);
              while (theMatch) {
                  var val = theMatch[0].replace(' ','').replace('-','').replace('-','');
                  a[val] = true;

                  curr = curr.replace(theMatch[0], '')
                  var theMatch = curr.match(ptrn);
              }
            })


          // נראה אותו הדבר כמו קודם אבל זה שונה, עשיתי העתק הדבק מהכונסול דיבגינג
            ptrn = /[+][\d]{1,3} [\d]+-[\d]+-[\d]+/
            $(".O90ur")[0].innerText.split(', ').forEach((curr) => {

              var theMatch = curr.match(ptrn);
              if (theMatch) {
                var val = theMatch[0].replace(' ','').replace('-','').replace('-','').replace(' ','');
                a[val] = true;
              } else {
                a[curr] = true;
              }
            });
        }
        var stringToAdd = Object.keys(a).reduce((res, cur) => res+cur + '\n', '');

        lastHasMore = hasMore;
        sendResponse({ value: stringToAdd, hasMore: ((hasMore && toScroll) || togleScrollInfinite)});
         //sendResponse({ value: stringToAdd, hasMore: $('circle').length > 0) && toScroll});











  } else if ('delete_cash' == request.action) {
    a = {};
    scrollHeight = 0;
    toScroll = true;
  } else if ('togleScroll' == request.action) {
    toScroll = !toScroll;
    sendResponse({value:toScroll});
  }else if ('togleScrollInfinite' == request.action) {
    togleScrollInfinite = !togleScrollInfinite;
    sendResponse({value:togleScrollInfinite});
  }



});