import Modal from "@/app/_components/Modal";

export default function Page() {
  return (
    <div className={"flex bg-[#2a2a2a]"}>
      <Modal
        title={<h2 className="text-2xl font-extrabold text-white">TODO</h2>}
      >
        <div className="flex h-[48vh] w-[90vw] items-center justify-center bg-[#4c4c4c] md:w-[48vw]">
          <h1 className="text-9xl font-extrabold text-white">TODO</h1>
        </div>
      </Modal>
    </div>
  );
}
