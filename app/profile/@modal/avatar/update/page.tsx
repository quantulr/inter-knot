import Modal from "@/app/_components/Modal";

export default function Page() {
  return (
    <Modal
      prevPath="/profile"
      title={<h2 className="text-2xl font-bold text-white">修改头像</h2>}
    >
      <div className="h-72 w-96"></div>
    </Modal>
  );
}
