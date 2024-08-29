import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET(req) {
    return new Response(
      JSON.stringify({
        "names": {
          "_":
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
