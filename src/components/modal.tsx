import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { useStore } from "@/context/store";
import { ActionTypes } from "@/context/actionType";
import Image from "next/image";
import Link from "next/link";

export const Modal = (): JSX.Element => {
  const {
    state: { project },
    dispatch,
  } = useStore();

  const handleCloseModalProject = (): void =>
    dispatch({ type: ActionTypes.SHOWMODALPROJECT });

  return ReactDOM.createPortal(
    <motion.div
      initial={{ opacity: 0, top: -60 }}
      animate={{ opacity: 1, top: -40 }}
      exit={{ opacity: 0, top: -60 }}
      className="fixed inset-0 bg-transparent z-10"
      onClick={handleCloseModalProject}
      role={"button"}
      tabIndex={0}
    >
      <section
        className="w-10/12 md:w-9/12 lg:w-7/12 h-max bg-light shadow-lg mx-auto my-20 overflow-y-auto rounded-lg md:pt-10 flex flex-col justify-between"
        aria-label="project-container"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="w-12/12 md:w-max mx-auto">
          <Image
            src={project.avatar}
            className="rounded-md object-cover"
            alt="project-avatar"
            height={300}
            width={500}
          />
          <h1 className="text-2xl font-bold text-center mt-2">
            {project.title}
          </h1>
        </header>
        <section className="text-center my-5 px-3 md:px-12">
          <p className="dynamic-font text-dark">{project?.desc}</p>
        </section>
        <footer className="flex items-center bg-white w-full h-10 text-center">
          <Link href={project.link.github}>
            <a className="font-bold h-full border-r-2 w-4/12 py-2 hover:bg-gray-300 text-black no-underline text-sm">
              Github
            </a>
          </Link>
          <Link href={project.link.demo}>
            <a className="font-bold h-full border-r-2 w-4/12 py-2 hover:bg-gray-300 text-black no-underline text-sm">
              Demo
            </a>
          </Link>
          <a
            onClick={handleCloseModalProject}
            className="font-bold h-full w-4/12 py-2 hover:bg-gray-300 text-black no-underline text-sm"
          >
            Yes, I Got it
          </a>
        </footer>
      </section>
    </motion.div>,
    typeof window !== "undefined" && document.body
  );
};
