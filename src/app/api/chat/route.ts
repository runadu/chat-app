export async function POST() {
  return Response.json(
    {
      error: "Chat API is not implemented yet.",
    },
    {
      status: 501,
    }
  );
}
