import { eventBus } from "../../../common/eventBus";

eventBus.on("user.created", (data: any) => {
    console.log("User Created:", data);
});
