var margin = 40;
var divMargin = 0;

$(document).ready(function () {
    $.each(msgs, function ()
    {
        divMargin = 0;
        AddNewElement(this);
    })
    
});

AddNewElement = function(msg)
{
    divMargin = (msg.order) * (margin);

    var divMessage = document.getElementById("divMessages");

    var innerDiv = document.createElement("div");
    
    //Creating a new row for Name
    var elementTableRow_Name = document.createElement("tr");
    var elementTableData_Name = document.createElement("td");

    var newDiv_Name = document.createElement("div");
    newDiv_Name.innerText = msg.Name;
    newDiv_Name.style.color = 'Blue';
    newDiv_Name.style.fontWeight = 'Bold';
    newDiv_Name.style.marginLeft = divMargin + 'px';

    elementTableData_Name.appendChild(newDiv_Name);
    elementTableRow_Name.appendChild(elementTableData_Name);
    innerDiv.appendChild(elementTableRow_Name);


    //Creating a new row for Message
    var elementTableRow_Message = document.createElement("tr");
    var elementTableData_Message = document.createElement("td");

    var newDiv_Message = document.createElement("div");
    newDiv_Message.innerText = msg.MessageText;
    newDiv_Message.style.height += 100;
    newDiv_Message.style.marginLeft = divMargin + 'px';

    elementTableData_Message.appendChild(newDiv_Message);
    elementTableRow_Message.appendChild(elementTableData_Message);
    innerDiv.appendChild(elementTableRow_Message);


    //Adding a Reply box for the messages posted
    var elementTableRow_Reply = document.createElement("tr");
    var elementTableData_Reply = document.createElement("td");

    var newDiv_Reply = document.createElement("div");
    newDiv_Reply.style.marginLeft = divMargin + 'px';
    newDiv_Reply.id = msg.Id;

    var newReplyLink = document.createElement("a");
    newReplyLink.innerText = "Reply";
    newReplyLink.id = 'Reply' + msg.id;

    //Function to post the reply for a comment
    newReplyLink.onclick = function () {
        var ReplyLinkDiv = document.getElementById(newDiv_Reply.id);

        var ReplyLinkId = document.getElementById(newReplyLink.id);
        ReplyLinkId.style.visibility = "hidden";

        //Name textbox for a reply
        var newReplyNameTextBox = document.createElement("input");
        newReplyNameTextBox.type = 'text';

        //Textbox for reply message
        var newReplyTextBox = document.createElement("input");
        newReplyTextBox.type = 'text';
        newReplyTextBox.style.height = '50px';
        newReplyTextBox.style.width = '150px';

        var breakLine = document.createElement("br");

        //Button to post the reply message 
        var SendMessage = document.createElement("input");
        SendMessage.type = 'button';
        SendMessage.value = 'Send';
        SendMessage.onclick = function ()
        {
            $.ajax({
                url: '/Home/SaveReply',
                data: { messageText: newReplyTextBox.value, parentId: newDiv_Reply.id, Name: newReplyNameTextBox.value },
                type: 'POST',
                success: function (data) {
                    window.location.href = '/Home/Feedback';
                }
            });
        }

        //appending the Name, Message and the button to post the message.
        ReplyLinkDiv.appendChild(newReplyNameTextBox);
        ReplyLinkDiv.appendChild(breakLine);
        ReplyLinkDiv.appendChild(newReplyTextBox);
        ReplyLinkDiv.appendChild(breakLine);
        ReplyLinkDiv.appendChild(SendMessage);

    }

    newDiv_Reply.appendChild(newReplyLink);
    elementTableData_Reply.appendChild(newDiv_Reply);
    elementTableRow_Reply.appendChild(elementTableData_Reply);
    innerDiv.appendChild(elementTableRow_Reply);

    //Empty Row
    var elementTableRow_EmptyRow = document.createElement("tr");
    elementTableRow_EmptyRow.style.height = "10px";
    innerDiv.appendChild(elementTableRow_EmptyRow);

    divMessage.appendChild(innerDiv);

 
    $.each(msg.messageReplies, function ()
    {
        AddNewElement(this);
    })
}

AddReplyTextBox = function (replyId) {
    var ReplyLinkId = document.getElementById(replyId);

    var newReplyTextBox = document.createElement("input");
    newReplyTextBox.type = 'text';

    ReplyLinkId.appendChild(newReplyTextBox);
}

//Function to post a new feedback comment
//This function is called when a customer tries to post a new feedback
function AddNewComment()
{
    var newComment = document.getElementById("txtNewComment");
    var newCommentName = document.getElementById("txtNewCommentName");

    $.ajax({
        url: '/Home/SaveReply',
        data: { messageText: newComment.value, parentId: "0", Name: newCommentName.value },
        type: 'POST',
        success: function (data) {
            window.location.href = '/Home/Feedback';
        }
    });
}

