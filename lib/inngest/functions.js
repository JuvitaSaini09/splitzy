import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" }, //func name on the server
  { event: "test/hello.world" }, //triggers
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
