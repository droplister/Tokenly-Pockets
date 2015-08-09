var bitcore = require('bitcore');

$( document ).ready(function() {   
    
    setInitialAddressCount();
    
    setPinBackground();
    
    $('#alltransactions').hide();
    
    $('#yourtxid').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
    
    $('#alltransactions').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
    
    
     $('#newsStories').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
    
    $('#FundDevBody').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });
    

    

  
    
    $('#shapeshiftButton').click(function(){
        
        var selectedaddress = $("#getbtcAddress").val();
        
        chrome.tabs.create({url: "https://shapeshift.io/shifty.html?destination="+selectedaddress+"&amp;apiKey=da63a102dd3dbbf683d7123c90ce66dad4b7b9c5636bb5c842b6bf207be84195b2a8199dc933aeb7e83ca3a234551673753b0e9c6e53f529e37abc919d108691&amp;amount="});
        
   });
    
    $("#pinsplash").hide();
    $('#alltransactions').hide();

    getStorage();
    //setEncryptedTest();
    
    //on open
    var manifest = chrome.runtime.getManifest();
    
    var infobutton = "<div style='display: inline-block; padding-left: 5px;'><a id='infoButton' href='#infoPage' data-toggle='tab'><img src='info-icon.png' height='16' width='16'></a></div>";
    
    $("#nameversion").html("Tokenly Pockets v" + manifest.version + infobutton);
  
    
       var JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            return cipherParams;
        }
        };
    
    $("form").submit(function (e) {
      e.preventDefault();
    //};

   // $("#pinButton").click(function () {
        
        var pin = $("#inputPin").val();
        
        $("#inputPin").val("");
        
        chrome.storage.local.get(["passphrase"], function (data)
        {         
            var decrypted = CryptoJS.AES.decrypt(data.passphrase, pin, { format: JsonFormatter });          
            var decrypted_passphrase = decrypted.toString(CryptoJS.enc.Utf8);
            
            console.log(decrypted_passphrase.length);
            
            if (decrypted_passphrase.length > 0) {
                
                $("#pinsplash").hide();
                $(".hideEncrypted").hide();
                
                $("#priceBox").show();
            
                existingPassphrase(decrypted.toString(CryptoJS.enc.Utf8));
                
            } 
        });
    });
    
    $('#myTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });
    
    $( "#walletaddresses" ).change(function () {
        
        
        
        $( "#btcbalance" ).html("<div style='font-size: 12px;'>Thinking...</div>");
    
        var addr = $(this).val();
        
        $( ".addressselect" ).attr("title", addr)
        
        if (addr == "add") {
        
//            chrome.storage.local.get(function(data) {
//
//                var addresslabels = data["addressinfo"];
                
                //dynamicAddressDropdown(addresslabels);
                
                addTotalAddress(dynamicAddressDropdown);

//            }); 
            
        } else {
        
            console.log(addr);

    //    chrome.storage.local.set(
    //                    {
    //                        'lastAddress': addr
    //                    }, function () {

            $("#xcpaddress").html(addr);

            getPrimaryBalance(addr);
                    
//                    });
        }
    
    });
    
    
    
    
    $('#yesEncryptButton').click(function (){
        
        $('#encryptquestion').hide();  
        $('#encryptyes').show();  
    
    });
    
    $('#setpinatsplash').click(function (){
         
        
                        
        chrome.storage.local.get(["passphrase"], function (data)
            {       
            
                var password = $("#inputSplashPass").val();
                
                var encrypted = CryptoJS.AES.encrypt(data.passphrase, password, { format: JsonFormatter });
               
                chrome.storage.local.set(
                {
                        
                    'passphrase': encrypted,
                    'encrypted': true
                        
                }, function () {
                
                    $("#welcomesplash").hide();
                    $(".hideEncrypted").hide();
                    $(".bg").css("min-height", "200px");
                
                });
        
            });
                                          
                  
    });
    
    $('#setupWalletButton').click(function (){
        $('#walletquestion').show();  
        $('#initialsplash').hide();  
    });
    
    $('#yesExistingWallet').click(function (){
        $('#walletquestion').hide();  
        $('#walletyes').show();  
    });
    
    $('#noExistingWallet').click(function (){
         newPassphrase();
        
        $('#walletquestion').hide();  
        $('#walletno').show();  
    });
    
    $('#writeDownButton').click(function (){
        $('#walletno').hide();  
        $('#encryptquestion').show();  
    });
    
   
    
    $('#copyButton').click(function (){
        
        var address = $("#xcpaddress").html();
        
        copyToClipboard(address);
        
        $('#xcpaddressTitle').hide(); 
        $('#addresscopied').show();
        setTimeout(function(){ 
            $('#addresscopied').hide(); 
            $('#xcpaddressTitle').show();
        }, 1500);
        
    });
    
   
    
    $('#setpassphraseatsplash').click(function (){
        $('#walletyes').hide();  
        $('#encryptquestion').show();  
        
        var passphrase = $('#inputSplashPassphrase').val();
        
        manualPassphrase(passphrase);
    });
    
    $('#noEncryptButton').click(function (){
       
            chrome.storage.local.set(
                    {
                        
                        'firstopen': false
                        
                    }, function () {
                    
                        getStorage();
                        $("#welcomesplash").hide();
                                          
                    });
        
    
    });
    
    $('#assettransactiontoggle').click(function ()
        { 
            if ($('#assettransactiontoggle').html() == "View Tokens") {
                $('#assettransactiontoggle').html("View Token Transaction History");
                $('#alltransactions').hide();
                $('#allassets').show();
            } else {
                $('#assettransactiontoggle').html("View Tokens");
                $('#alltransactions').show();
                $('#allassets').hide();
            }
        });
    
    $('.resetAddress').click(function ()
        {
            newPassphrase();
        });
    
    $('.resetFive').click(function ()
        {
            resetFive();
        });
    
    $('#revealPassphrase').click( function ()
        {
            if($("#newpassphrase").is(":visible")) {
                $("#passphrasebox").hide();
                $("#revealPassphrase").html("Reveal Passphrase");
            } else {
                $("#passphrasebox").show(); 
                $("#revealPassphrase").html("Hide Passphrase");
            }
        });
    
    $('#manualPassphrase').click( function ()
        {
            if($("#manualPassBox").is(":visible")) {
                $("#manualPassBox").hide();
                //$("#revealPassphrase").html("Reveal Passphrase");
            } else {
                $("#manualPassBox").show(); 
                //$("#newpassphrase").hide();
                //$("#revealPassphrase").html("Hide Passphrase");
            }    
        });
    
     $('#encryptPassphrase').click( function ()
        {
            if($("#encryptPassphraseBox").is(":visible")) {
                $("#encryptPassphraseBox").hide();
                //$("#revealPassphrase").html("Reveal Passphrase");
            } else {
                $("#encryptPassphraseBox").show(); 
                //$("#newpassphrase").hide();
                //$("#revealPassphrase").html("Hide Passphrase");
            }    
        });
    
    $('#sendAssetButton').click( function () {
        
        
        
        $("#btcsendbox").toggle();
        
        
        
        if($("#moreBTCinfo").is(":visible")) {
            $("#moreBTCinfo").hide();
        }
            
            
    });
    
    $('#manualAddressButton').click( function ()
        {
            var passphrase = $('#manualMnemonic').val();
            $('#manualMnemonic').val("");
            manualPassphrase(passphrase);
        });
 
      $(document).on("click", '#depositBTC', function (event)
  {
            if($("#btcsendbox").is(":visible")) {
                $("#btcsendbox").hide();
            }
      
      
        if ($("#moreBTCinfo").length){
          
            $("#moreBTCinfo").toggle();
            
            
          
        } else {
      
            var currentaddr = $("#xcpaddress").html();
            $("#btcbalance").append("<div id='moreBTCinfo'><div style='margin: 20px 0 10px 0; font-size: 10px; font-weight: bold;'>"+currentaddr+"</div><div id='btcqr' style='margin: 10px auto 20px auto; height: 100px; width: 100px;'></div><div>Cost per transaction is 0.0001547 BTC</div></div>");  
            var qrcode = new QRCode(document.getElementById("btcqr"), {
    			text: currentaddr,
    			width: 100,
    			height: 100,
    			colorDark : "#000000",
    			colorLight : "#ffffff",
    			correctLevel : QRCode.CorrectLevel.H
				});
        }
        });

    
    $(document).on("click", '#saveLabelButton', function (event)
      {
          
          var newlabel = $("#newPocketLabel").val();
          
          var labelfixed = newlabel.replace(/'/g, '');

          insertAddressLabel(labelfixed, dynamicAddressDropdown); 
          
      });
 
     $(document).on("click", '#newLabelButton', function (event)
      {
          
          var currentlabel = $('select option:selected').attr('label');
          $("#newPocketLabel").val(currentlabel); //.slice(0, -18)
          $("#addresslabeledit").toggle();
          $("#pocketdropdown").toggle();
          
      });
    

    
    
    
    
    $(document).on("click", '.tokenlistingheader', function (event)
  {
      
            $( ".tokenlistingbody" ).remove(); 
  });
    
$(document).on("click", '.tokenlisting', function (event)
  {
        
      var currenttoken = $(this).data("token"); 
      
      if ($( "div:contains('"+currenttoken+" Swapbots')" ).length) {
      
          $( ".tokenlistingbody" ).remove(); 
      
      } else {
      
          if ($('.tokenlistingbody').length) {

                $( ".tokenlistingbody" ).remove(); 

          } 

          var row = $(this).closest('tr');

         // $("<tr class='tokenlistingbody'><td colspan='3'><button class='btn btn-warning btn-block' type='button' disabled>Exchange  "+currenttoken+"</button><button class='btn btn-info btn-block' type='button' disabled>Shop with "+currenttoken+"</button></td></tr>").insertAfter(row);
          
          $("<tr class='tokenlistingbody'><td colspan='3'><div><div class='lead' style='text-align: center; width: 100%; font-weight: bold; background-color: #fff; color: #000; margin: 5px 0 0 0; padding: 3px;'>"+currenttoken+" Swapbots</div><div style='padding: 20px 0 25px 0; text-align: center;'>Coming Soon...</div><div style='margin: 15px 0 10px 0; display: none;'><table class='table table-hover'><thead><th>Owner</th><th>Available Tokens</th></thead><tbody><tr class='swapbotselect'><td><div style='width: 80px;'>loon3</div></td><td>BTC, SJCX, LTBCOIN</td></tr><tr class='swapbotselect'><td>Adam</td><td>BTC, TOKENLY, LTBCOIN, TATIANACOIN</td></tr></tbody></table></div></div>").insertAfter(row);
      
      
      }
      
  });
    
  $(document).on("click", '#refreshWallet', function (event)
  {
      $("#currenttoken-pending").html("");

      $("#ltbDirectorySearchResults").html("");
      $("#ltbUserSearch").val("");
      //$("#searchLTBuser").text("Search");

      $("#freezeUnconfirmed").css("display", "none");
      $("#mainDisplay").css("display", "block");
      
      //$("#sendtokenbutton").html("Send Token");
      $("#sendtokenbutton").prop('disabled', false);
      $("#sendtoaddress").prop('disabled', false);
      $("#sendtoamount").prop('disabled', false);
      
      $("#sendtoaddress").val("");
      $("#sendtoamount").val("");
      
      var assetbalance = $("#xcpbalance").html();
      var array = assetbalance.split(" ");
      
      
      var pubkey = $("#xcpaddress").html();
      var currenttoken = $(".currenttoken").html();
      
      $("#sendtokenbutton").html("Send "+currenttoken);
      
      getRate(array[0], pubkey, currenttoken);
      
      getPrimaryBalance(pubkey);
      
      currenttokenpending(currenttoken);
  });
    
  $('#switchtoxcp').click(function ()
  {
      $("#currenttoken-pending").html("");
      $(".currenttoken").html("BTC"); 
      $("#sendtokenbutton").html("Send BTC");
      var pubkey = $("#xcpaddress").html();
      getPrimaryBalance(pubkey);
      $('#allTabs a:first').tab('show');
  });


//  $('#txHistory').click(function ()
//  {
//    var address = $("#xcpaddress").html();
//    chrome.tabs.create(
//    {
//      url: "http://blockscan.com/address/" + address
//    });
//  });

  $('#contact').click(function ()
  {
    chrome.tabs.create({ url: "mailto:support@letstalkbitcoin.com" });
  });

    
  $('#refresharrow').click(function ()
  {
    var pubkey = $("#xcpaddress").html();
    getPrimaryBalance(pubkey);
  });
    
  
   $(document).on("click", '.movetowallet', function (event)
  {  
      $("#currenttoken-pending").html("");
      
      var $assetdiv = $( this ).prev();
      var currentasset = $assetdiv.html();
      $(".currenttoken").html(currentasset);
      
      var qtypending = $("."+currentasset+"-pending").html();
      
      $("#currenttoken-pending").html(qtypending);
      
      //$(".currenttoken").html("WORKS");
      
      $("#sendtokenbutton").html("Send "+currentasset);
      
      var pubkey = $("#xcpaddress").html();
      
      
      getPrimaryBalance(pubkey);
      
      
      
      
      $('#allTabs a:first').tab('show');
      
  });
    
    
    
    
     $(document).on("click", '.movetosend', function (event)
  {  
  
      var sendaddress = $( this ).text();
      
      var username = $( this ).data("user");
      
      $("#sendtoaddress").val(sendaddress);
      
      $(".sendlabel").html(username);
      
      $("#btcsendbox").show();
      $("#moreBTCinfo").hide();

      $('#allTabs a:first').tab('show');
      
  });
    
     $(document).on("click", '.movetosendFundDev', function (event)
  {    
      
      $("#currenttoken-pending").html("");
      
      var currentasset = $( this ).data("token");
      var title = $( this ).data("title");
      $(".currenttoken").html(currentasset);
      
      var qtypending = $("."+currentasset+"-pending").html();
      
      $("#currenttoken-pending").html(qtypending);
      
      //$(".currenttoken").html("WORKS");
      
      $("#sendtokenbutton").html("Send "+currentasset);
      
      var pubkey = $("#xcpaddress").html();
      
      //var pubkey = FindAsset(currentasset);
      
      $(".sendlabel").html(title);
      
      getPrimaryBalance(pubkey);
      
      var sendaddress = $( this ).data("address");
      
      $("#sendtoaddress").val(sendaddress);
      
      $("#btcsendbox").show();
      $("#moreBTCinfo").hide();
      
      
      
      $('#allTabs a:first').tab('show');
      
  });



  $('#inventoryTab').click(function ()
  {
    
    var address = $("#xcpaddress").html();
      
    //$("#alltransactions").hide();
      
    loadAssets(address);
    
      
  });  
    
    $("#ltbUserSearch").keyup(function(event){
    if(event.keyCode == 13){
        var search_input = $("#ltbUserSearch").val();
        
        searchLTBuser(search_input);
    }
    });
    
    $('#searchLTBuser').click(function (){
        
        var search_input = $("#ltbUserSearch").val();
        
        searchLTBuser(search_input);
        
    });
    
    
    $('#newsApp').click(function (){
        
        getNews();
        
    });
    
    
    
$(document).on('click', '#toolsTab', function () {
    var $link = $('li.active a[data-toggle="tab"]');
    $link.parent().removeClass('active');
    var tabLink = $link.attr('href');
    $('#allTabs a[href="' + tabLink + '"]').tab('show');
    
    loadAddresslist();
});
    
    
   $(document).on("click", '#encryptPasswordButton', function (event) 
    {
        chrome.storage.local.get(["passphrase"], function (data)
        {       
            
            var password = $("#encryptPassword").val();
            $("#encryptPassword").val("");
            var encrypted = CryptoJS.AES.encrypt(data.passphrase, password, { format: JsonFormatter });
               
            chrome.storage.local.set(
                    {
                        
                        'passphrase': encrypted,
                        'encrypted': true
                        
                    }, function () {
                    
                        $(".hideEncrypted").hide();
                    
                    });
        
        });
    });

    $('.signMessageButton').click(function ()
        {
            var inputaddr = $("#signPubAddress").val();
            var inputpassphrase = $("#newpassphrase").html();
            var message = $("#messagetosign").val();
            
            var privkey = getprivkey(inputaddr, inputpassphrase);
            var signed = signwith(privkey, inputaddr, message);
            
            
            if($(this).hasClass("copy")){
                copyToClipboard(signed);
            }
            
            $("#postSign").html(signed);
            
            $("#postSign").show();
            $("#resetsignbox").show();
            
            $("#preSign").hide();
             
        });
    
    $('#resetSignButton').click(function ()
        {
            $("#messagetosign").val("");
            $("#resetsignbox").hide();
            $("#postSign").hide();
            
            $("#preSign").show();            
        });   
    
    $('#sendtokenbutton').click(function ()
        {
            sendtokenaction();      
        });
    
    $(document).on("keyup", '#sendtoaddress', function (event)
    { 
        
        $(".sendlabel").html("");
    });
    
    
    $(document).on("keyup", '#sendtoamount', function (event)
    { 
        
        var sendamount = parseFloat($("#sendtoamount").val());
        var currenttoken = $(".currenttoken").html();
        
        if (currenttoken == "BTC") {
            var currentbalance = parseFloat($("#btcbalhide").html());
        } else {
            var currentbalance = parseFloat($("#assetbalhide").html());
        }
        
        //console.log(sendamount);
        //console.log(currentbalance);
        
        if (sendamount > currentbalance) {
            $('#sendtokenbutton').prop('disabled', true);
       	} else {
            $("#sendtokenbutton").removeAttr("disabled");
        }
        
        
        if (currenttoken == "BTC") {
            
            if (isNaN(sendamount) == false && $("#sendtoamount").filter(function() { return $(this).val(); }).length > 0){
            
                var ltbtousd = $("#ltbPrice").data("btc").price;
                var sendinusd = sendamount / parseFloat(ltbtousd);
            
                $("#sendUSD").html("($"+sendinusd.toFixed(2)+")");
 
            } else {
            
                $("#sendUSD").html("");
            }
            
        } else {
            
            $("#sendUSD").html("");
            
        }
        
    });
    
//    $(document).on("click", '.primarytokenoption', function (event) {  
//        
//        var clickedtoken = $(this).html();
//        
//        $(".currentprimarytoken").html(clickedtoken);
//        
//        $("#currenttoken").html(clickedtoken);
//        
//    });
//    
    $('#ExchangeRateApp').click(function(){
        
        getExchangeRatesList();
        
   });
    
    
    $('#FundDevApp').click(function(){
        
        loadFeatureRequests();

        
   });
    
    
    
                
    
    
       $('#chainsobutton').click( function ()
        {
            var state = $('#turnoffchainso').html();
            

            
            if (state == "Disable Chain.so Token Detection") {
                
                var detect = "no";

                chrome.storage.local.set(
                        {
                            'chainso_detect': detect
                        }, function () {
                            
                            $('#turnoffchainso').html("Enable Chain.so Token Detection");
                        
                        });
                
                
            } else {
                
                var detect = "yes";

                chrome.storage.local.set(
                        {
                            'chainso_detect': detect
                        }, function () {
                            
                            $('#turnoffchainso').html("Disable Chain.so Token Detection");
                        
                        });
                
            }
        });
    
//loadSwapbots();
    
//loadFeatureRequests();
       
});