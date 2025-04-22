import Modal from "@/app/_components/Modal";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Modal>
      <h3 className="text-lg font-bold">Hello! {id}</h3>
    </Modal>
  );
}
