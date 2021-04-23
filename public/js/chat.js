document.querySelector("#start_chat").addEventListener("click", (event) => {
  const socket = io();

  const chat_help = document.getElementById("chat_help");
  chat_help.style.display = "none";

  const chat_in_support = document.getElementById("chat_in_support");
  chat_in_support.style.display = "block";

  const email = document.getElementById("email").value;
  const text = document.getElementById("txt_help").value;

  socket.on("connect", () => {
    const params = {
      email,
      text,
    };

    socket.emit("client_first_access", params, (call, error) => {
      if (error) {
        console.err(error);
      } else {
        console.log(call);
      }
    });
  });

  socket.on("client_list_all_messages", (messages) => {
    var template_client = document.getElementById("message-user-template")
      .innerHTML;

    var template_admin = document.getElementById("admin-template").innerHTML;

    messages.forEach((message) => {
      const isClient = message.admin_id === null;
      if (isClient) {
        const renderedClient = Mustache.render(template_client, {
          message: message.text,
          email,
        });

        document.getElementById("messages").innerHTML += renderedClient;
      } else {
        const renderedAdmin = Musatache.render(template_admin, {
          message_admin: message.text,
        });

        document.getElementById("messages").innerHTML += renderedAdmin;
      }
    });
  });
});
