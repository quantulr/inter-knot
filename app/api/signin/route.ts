import { z } from "zod";
import { signIn } from "@/auth";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(req: Request) {
  const form = formSchema.safeParse(await req.json());
  if (!form.success) {
    return Response.json(
      {
        error: form.error,
      },
      {
        status: 400,
      },
    );
  }
  const { username, password } = form.data;
  try {
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    return Response.json({ success: true }, {});
  } catch (error) {
    // @ts-expect-error wcnm
    return Response.json({ error: error.message }, { status: 401 });
  }
}
