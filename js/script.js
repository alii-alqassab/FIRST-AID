// The form uses functions, strings, loops, conditions, and DOM methods from Unit 4.
function removeEdgeSpaces(text) {
  var start = 0;
  var end = text.length - 1;
  var result = "";
  while (start <= end && (text.charAt(start) == " " || text.charAt(start) == "\t" || text.charAt(start) == "\n" || text.charAt(start) == "\r")) {
    start++;
  }
  while (end >= start && (text.charAt(end) == " " || text.charAt(end) == "\t" || text.charAt(end) == "\n" || text.charAt(end) == "\r")) {
    end--;
  }
  for (var i = start; i <= end; i++) {
    result += text.charAt(i);
  }
  return result;
}

function isValidEmail(email) {
  var at = email.indexOf("@");
  var atCount = 0;
  var localCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.!#$%&'*+-/=?^_`{|}~";
  var domainCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
  if (email.length > 254 || at < 1 || at > 64 || at >= email.length - 1) {
    return false;
  }
  for (var i = 0; i < email.length; i++) {
    if (email.charAt(i) == "@") {
      atCount++;
    }
  }
  if (atCount != 1 || email.charAt(0) == "." || email.charAt(at - 1) == "." || email.indexOf("..") >= 0) {
    return false;
  }
  for (var j = 0; j < at; j++) {
    if (localCharacters.indexOf(email.charAt(j)) < 0) {
      return false;
    }
  }
  var labelLength = 0;
  var dots = 0;
  for (var k = at + 1; k < email.length; k++) {
    var character = email.charAt(k);
    if (character == ".") {
      if (labelLength == 0 || email.charAt(k - 1) == "-") {
        return false;
      }
      dots++;
      labelLength = 0;
    } else {
      if (domainCharacters.indexOf(character) < 0 || (labelLength == 0 && character == "-")) {
        return false;
      }
      labelLength++;
      if (labelLength > 63) {
        return false;
      }
    }
  }
  if (dots == 0 || labelLength == 0 || email.charAt(email.length - 1) == "-") {
    return false;
  }
  return true;
}

function validateRegistration() {
  var first = removeEdgeSpaces(document.getElementById("firstName").value);
  var last = removeEdgeSpaces(document.getElementById("lastName").value);
  var mobile = removeEdgeSpaces(document.getElementById("mobile").value);
  var email = removeEdgeSpaces(document.getElementById("email").value);
  var message = document.getElementById("formMessage");
  var errors = "";
  if (first.length < 3) {
    errors += "First name must have at least 3 characters.<br>";
  }
  if (last.length < 3) {
    errors += "Last name must have at least 3 characters.<br>";
  }
  if (mobile.length != 8) {
    errors += "Mobile number must contain exactly 8 digits.<br>";
  } else {
    var digitsOnly = true;
    for (var i = 0; i < mobile.length; i++) {
      if (mobile.charAt(i) < "0" || mobile.charAt(i) > "9") {
        digitsOnly = false;
      }
    }
    if (digitsOnly == false) {
      errors += "Mobile number must contain only digits.<br>";
    }
  }
  if (isValidEmail(email) == false) {
    errors += "Enter a valid email address.<br>";
  }
  if (errors.length > 0) {
    message.innerHTML = '<div class="error">' + errors + '</div>';
    return false;
  }
  // A fixed message avoids inserting user input into HTML.
  message.innerHTML = '<div class="success">Your details passed validation. This demonstration does not save or send a registration.</div>';
  return false;
}
function showGuide(kind){
 var result=document.getElementById('guideResult');
 if(kind=='check'){
  result.innerHTML='<strong>Start with Check · Call · Care.</strong><p>Check the scene for danger. Call local emergency services when there is a life-threatening condition. Give care within your training.</p><a href="subtopic1.html">Read the first steps →</a>';
 }else if(kind=='bleeding'){
  result.innerHTML='<strong>For severe bleeding: call and apply pressure.</strong><p>Call local emergency services. Press firmly on the wound with a clean dressing or cloth while help is coming.</p><a href="subtopic2.html">Read bleeding basics →</a>';
 }else if(kind=='burn'){
  result.innerHTML='<strong>Stop the burning and cool the burn.</strong><p>Cool a thermal burn under cool or lukewarm running water for 20 minutes. Seek advice for serious burns.</p><a href="subtopic3.html">Read burn basics →</a>';
 }
}

function checkLearning(question, correct) {
 var feedback=document.getElementById(question);
 var start='Try again. ';
 if(correct){start='Correct. ';}
 if(question=='burnQuiz'){feedback.innerHTML=start+'Cool a thermal burn with cool or lukewarm running water for 20 minutes. Do not use ice. <a href="subtopic3.html#thermal-burns">Read the burn guide.</a>';}
 else if(question=='bleedQuiz'){feedback.innerHTML=start+'Firm direct pressure helps control severe bleeding while emergency help is on the way. <a href="subtopic2.html">Read the bleeding guide.</a>';}
 else {feedback.innerHTML=start+'Check scene safety first. Keep away from electrical danger and call emergency services. <a href="subtopic1.html">Read the first steps guide.</a>';}
}
