msDelay = 3000;

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('colect').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
          var callFunc = function() {
              chrome.tabs.sendMessage(activeTabs[0].id, { action: 'colect' }, function(response) {
                  console.log('response.value', response.value);
                  document.getElementById("textarea").value = response.value;
                  if (response.hasMore) {
                       setTimeout(function()
                  {
                          callFunc();

                        }, msDelay);
                  }
              });
          }

          callFunc();

      });
  });

  document.getElementById('delete_cash').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
          chrome.tabs.sendMessage(activeTabs[0].id, { action: 'delete_cash' });
      });
  });

  document.getElementById('togleScroll').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
          chrome.tabs.sendMessage(activeTabs[0].id, { action: 'togleScroll' }, function(response) {
              document.getElementById("togleScroll").innerHTML = 'togle scroll - now:' + response.value;
          });

      });
  });

  document.getElementById('togleScrollInfinite').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true}, function(activeTabs) {
          chrome.tabs.sendMessage(activeTabs[0].id, { action: 'togleScrollInfinite' }, function(response) {
              document.getElementById("togleScrollInfinite").innerHTML = 'togle scroll infinite - now:' + response.value;
          });
      });
  });


  document.getElementById('fixSome').addEventListener('click', function() {
      a = {};
      document.getElementById("textarea").value.split('\n').forEach((curr) => {
        a[curr] = true;
      });
      document.getElementById("textarea").value = Object.keys(a).reduce((res, cur) => res+cur + '\n', '');
  });

  document.getElementById('btnSecDelay').addEventListener('click', function() {
      msDelay = parseInt(document.getElementById("SecDelay").value) * 1000;
  });

});
