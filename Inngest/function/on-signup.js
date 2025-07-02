import { inngest } from "../client.js";
import User from "../../models/user.model.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    try {
      const { email } = event.data;

      const user = await step.run("get-user-email", async () => {
        const userObject = await User.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("User no longer exists in the database");
        }
        return userObject;
      });
      await step.run("send-welcome-email", async () =>{

        const subject = `welcome to the app`
        const message = `hi,
        \n\n 
        Thanks for signing up. we are glad to have you onboards&`

        await sendMail(user.email, subject, message)
      }
        
      )

      // Optional: you can log, trigger other events, or return something useful here
    //   console.log(`✅ User found: ${user.email}`);

      return {success: true};

    } catch (error) {
      console.error("❌ Error handling user signup event:", error.message);
      return {sucess: false}
       // make sure to propagate the error if needed
    }
  }
);
