
import { nextCsrf } from "next-csrf";

const { csrf, setup } = nextCsrf({
 secret: process.env.SECRET,
});

export { csrf, setup };