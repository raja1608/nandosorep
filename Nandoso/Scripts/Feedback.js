var margin = 40;
var divMargin = 0;
$(document).ready(function () {
    //alert(txt);
    //alert(Messages)
    //alert(msgs[0].MessageText);
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
    //divMessage.style.width = '500px';
    //if (margin == 10)
    //    divMessage.style.border = "solid";

    var innerDiv = document.createElement("div");
    
    //New row for Name
    var elementTableRow_Name = document.createElement("tr");

    var elementTableData_Name = document.createElement("td");

    var newDiv_Name = document.createElement("div");
    newDiv_Name.innerText = msg.Name;//+ msg.order;
    newDiv_Name.style.color = 'Blue';
    newDiv_Name.style.fontWeight = 'Bold';
    newDiv_Name.style.marginLeft = divMargin + 'px';

    elementTableData_Name.appendChild(newDiv_Name);

    elementTableRow_Name.appendChild(elementTableData_Name);

    innerDiv.appendChild(elementTableRow_Name);

    //New row for Message
    var elementTableRow_Message = document.createElement("tr");

    var elementTableData_Message = document.createElement("td");

    var newDiv_Message = document.createElement("div");
    newDiv_Message.innerText = msg.MessageText;
    newDiv_Message.style.height += 100;
    newDiv_Message.style.marginLeft = divMargin + 'px';

    elementTableData_Message.appendChild(newDiv_Message);

    elementTableRow_Message.appendChild(elementTableData_Message);

    innerDiv.appendChild(elementTableRow_Message);

    //Add Reply box

    var elementTableRow_Reply = document.createElement("tr");

    var elementTableData_Reply = document.createElement("td");

    var newDiv_Reply = document.createElement("div");
    newDiv_Reply.style.marginLeft = divMargin + 'px';
    newDiv_Reply.id = msg.Id;

    var newReplyLink = document.createElement("a");
    newReplyLink.innerText = "Reply";
    newReplyLink.id = 'Reply' + msg.id;

    newReplyLink.onclick = function () {
        var ReplyLinkDiv = document.getElementById(newDiv_Reply.id);

        var ReplyLinkId = document.getElementById(newReplyLink.id);
        ReplyLinkId.style.visibility = "hidden";

        var newReplyNameTextBox = document.createElement("input");
        newReplyNameTextBox.type = 'text';

        var newReplyTextBox = document.createElement("input");
        newReplyTextBox.type = 'text';
        newReplyTextBox.style.height = '50px';
        newReplyTextBox.style.width = '150px';

        var breakLine = document.createElement("br");

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

    

    //if (msg.messageReplies.length > 0)
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

