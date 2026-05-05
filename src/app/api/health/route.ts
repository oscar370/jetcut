export async function GET() {
  return Response.json({
    status: "Alive",
    time: new Date()
  })
}