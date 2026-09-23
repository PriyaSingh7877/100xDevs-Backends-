export async function POST(request: Request) {
  try {
    const body = await request.json();

    return new Response(
      JSON.stringify({
        message: `Hello ${body.name}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}