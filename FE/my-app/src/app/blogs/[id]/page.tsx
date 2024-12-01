export default async function page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <div>My Blogs detail: {id}</div>
}