import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";

io.on("connect", (socket) => {
  const connectionsServices = new ConnectionsService();
  const usersServices = new UsersService();

  socket.on("client_first_access", async (params) => {
    const socket_id = socket.id;
    const { text, email } = params;

    const userExists = await usersServices.findByEmail(email);

    if (!userExists) {
      const user = await usersServices.create(email);

      await connectionsServices.create({ socket_id, user_id: user.id });
    } else {
      const connection = await connectionsServices.findByUserId(userExists.id);

      if (!connection) {
        await connectionsServices.create({
          socket_id,
          user_id: userExists.id,
        });
      } else {
        connection.socket_id = socket_id;
        await connectionsServices.create(connection);
      }
    }
  });
});
