import { eventBus } from "../../../common/eventBus";

export const emitUserCreated = (user: any) => {
    eventBus.emit("user.created", user);
};
