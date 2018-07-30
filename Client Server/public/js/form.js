//document.body.onload = addElement;
//const id = JSON.stringify(feedbackFormClientID);
 //document.body.onload = getClientID(id);

function getClientID(clientID){
  console.log(typeof clientID)
  addElement(clientID);
}

function addElement (clientID) {

        // creation of feedback form container div
        feedback_container_div = document.createElement("div")
        document.body.appendChild(feedback_container_div);
        feedback_container_div.style.width = "600px";
        feedback_container_div.style.height = "500px";
        feedback_container_div.style.zIndex = 9999;
        feedback_container_div.style.position = "fixed";
        feedback_container_div.style.right = "0px";
        feedback_container_div.style.top ="100px";
        feedback_container_div.style.margin = 0;
        feedback_container_div.style.padding = 0;

        // creation of feedback main div
        const feedback_main_div = document.createElement("div");
        feedback_container_div.appendChild(feedback_main_div);
        feedback_main_div.setAttribute("id", "feedback_main_div");
        feedback_main_div.setAttribute("class", "hide");
        feedback_main_div.setAttribute("style", "opacity: 0;height: 0;overflow: hidden;transition-timing-function: linear, step-end;display: none;");


        // iframe creation
        //const srcAddr = "http://localhost:9000/"+clientID+"/"+"clientFeedbackForm";
        const srcAddr = "http://localhost:3000/clientForm/11";
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", srcAddr);
        ifrm.setAttribute("scrolling", "auto")
        ifrm.setAttribute("class","frame-area")
        ifrm.style.width = "100%";
        ifrm.style.height = "100%";
        feedback_main_div.appendChild(ifrm);

        // button creation
        const button = document.createElement("button");
        button.setAttribute("id", "feedback")
        button.setAttribute("style", "margin-top: 200px;font-weight: bold;padding: 0 20px;background: #4CAF50;border: none;float: right; vertical-align:top; margin-right: -45px;width:120px;height:30px;transform:rotate(7deg);-ms-transform:rotate(270deg);-moz-transform:rotate(270deg);-webkit-transform:rotate(270deg);-o-transform:rotate(270deg); ");
        button.innerHTML = "Feedback";
        feedback_container_div.appendChild(button);

        // event listiner for button
        button.addEventListener ("click", function() {
          toggleDiv();
        });
}

function toggleDiv() {
  var form = document.getElementById("feedback_main_div");
  if(form.className === "show"){
    form.className = "hide";
    form.setAttribute("style", "opacity: 0;height: 0;overflow: hidden;transition-timing-function: linear, step-end;display: none;");
  } else {
    form.className = "show";
    form.setAttribute("style", "width : 400px;height : 480px;float : right;")
  }
}
