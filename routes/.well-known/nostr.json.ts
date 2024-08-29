import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req, ctx) {
    const name = ctx.params["name"];
    if (!name) {
      return new Response(
        JSON.stringify({
          message: "name is required",
        }),
        {
          status: 400,
        },
      );
    }

    return new Response(
      JSON.stringify({
        "names": {
          [name]:
            "1f60f02ded6e17bf5f5e419049bbc2907709047946a8fd4a29ca776ea539fddf",
        },
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": req.headers.get("Origin") || "*",
        },
      },
    );
  },
};
