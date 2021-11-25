function onOpen() {
  SpreadsheetApp.getUi().createMenu("My Menu")
  .addItem('Launch Dialog','launchTheFormAsDialog')
  .addToUi();
}

function buildForm() {
  var searchColumnName='RefId';
  var ss=SpreadsheetApp.getActive();
  var sh=ss.getSheetByName('Sheet1');
  var tA=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  var hA=sh.getRange(2,1,1,sh.getLastColumn()).getValues()[0];
  tA.splice(1,5);
  var ftA=tA.slice();
  hA.splice(1,5);
  var fA=hA.slice();
  var dstr=Utilities.formatDate(new Date(),Session.getScriptTimeZone(), "yyyy-MM-dd");
  var html='<style>input{margin:2px 5px 2px 0;}</style><form id="myForm">';
  for(var i=0;i<fA.length;i++) {
    switch(ftA[i]){
      case 'date':
        html+=Utilities.formatString('<br /><input type="%s" value="%s" name="%s" />&nbsp;%s',ftA[i],dstr,fA[i],fA[i]);
        break;
      default:
        html+=Utilities.formatString('<br /><input type="%s" name="%s" />&nbsp;%s',ftA[i],fA[i],fA[i]);
        break;  
    }
  }
  html+='<br /><input type="button" value="Submit" onclick="submitForm(this.parentNode)" /></form>';
  return {html:html};
}

function testUpload() {
  upload({'Status':'none', 'Comment':'to long to fit', 'ClientName':'Don Trump', 'RefCode':'Tweeter', 'Final_Status':'impeachment', 'Product':'Bullshit', 'RefId':'id3', 'DaysPassed':'12', 'Final_Status_Date':'2019-12-23', 'Date':'2019-12-23', 'Notes':'none'})
}

function upload(theForm) {
  Logger.log(theForm);
  var kA=Object.keys(theForm);
  kA.splice(kA.indexOf('refId'),1);//remove refID
  Logger.log(kA);
  var ss=SpreadsheetApp.getActive();
  var sh=ss.getSheetByName('Sheet1');
  var hA=sh.getRange(2,1,1,sh.getLastColumn()).getValues()[0];
  var hObj={};
  hA.forEach(function(e,i){hObj[e]=i+1});
  Logger.log(hObj);
  var vA=sh.getRange(3,1,sh.getLastRow()-2,2).getValues();
  for(var i=0;i<vA.length;i++) {
    if(theForm.RefId==vA[i][0]) {
      kA.forEach(function(key){
        Logger.log(hObj[key]);
        Logger.log(theForm[key]);
        sh.getRange(i+3,hObj[key]).setValue(theForm[key]);
      });
    }
  }
  return buildForm();
}

function launchTheFormAsDialog() {
  var ui=HtmlService.createHtmlOutputFromFile('theform').setHeight(550);
  SpreadsheetApp.getUi().showModelessDialog(ui, "Form Data Entry");  
}