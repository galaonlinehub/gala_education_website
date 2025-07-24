import clsx from "clsx";
import Modal from "antd/es/modal/Modal";
import { motion, AnimatePresence } from "framer-motion";
import { usePartnerSchool } from "@/src/hooks/ui/usePartnerSchool";
import SlickSpinner from "../ui/loading/template/SlickSpinner";

export const PartnerSchool = () => {
  const {
    isAffiliated,
    toggleAffiliate,
    toggleOpen,
    isOpen,
    close,
    register,
    mutation,
    onSchoolPartnered,
    errors,
    errMessage,
    resetMutation,
  } = usePartnerSchool();

  return (
    <Modal open={isOpen} footer={null} closable={false}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="font-medium text-lg">Do you belong to a school?</div>
          <div className="flex gap-3 text-sm">
            <button
              onClick={toggleAffiliate}
              disabled={isAffiliated}
              className="bg-[#001840] text-white rounded w-16 h-7 cursor-pointer hover:scale-110 disabled:scale-100 transition-transform ease-in-out duration-200 disabled:bg-[#001840]/60 disabled:cursor-not-allowed"
            >
              Yes
            </button>
            <button
              disabled={mutation.isPending}
              onClick={() => {
                toggleAffiliate();
                close();
              }}
              className="border border-[#001840] text-[#001840] rounded w-16 h-7 cursor-pointer hover:scale-110 transition-transform ease-in-out duration-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:scale-100"
            >
              No
            </button>
          </div>
        </div>
        <form
          onSubmit={onSchoolPartnered}
          data-isAffiliated={isAffiliated}
          className="data-[isAffiliated=false]:hidden flex flex-col gap-1"
        >
          <div className="min-h-[45px]">
            <AnimatePresence>
              {(mutation.isError || mutation.isSuccess) && errMessage && (
                <motion.div
                  layout
                  initial={{
                    opacity: 0,
                    scaleY: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scaleY: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scaleY: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={clsx(
                    "text-xs border-[0.5px] w-full rounded text-center overflow-hidden",
                    "my-2 py-1.5",
                    mutation.isError
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-green-500 text-green-500 bg-green-50"
                  )}
                >
                  {errMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            Please enter the code provided in school or with your teacher
          </div>
          <div>
            <input
              className="bg-[#001840]/10 w-full rounded-md h-9 outline-none focus:border-2 p-2"
              placeholder="e.g, IL-QWERTY"
              {...register("code", {
                required: "Please provide school code",
                onChange: (e) => {
                  resetMutation();
                },
              })}
            />
            {errors.code && (
              <p className="text-red-500 text-xs px-2 py-0.5">
                {errors.code.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={mutation.isPending || mutation.isError}
            className="bg-[#001840] text-sm mt-4 text-white rounded-md w-20 h-8 self-end cursor-pointer hover:scale-110 transition-transform ease-in-out duration-200 disabled:bg-[#001840]/60 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {mutation.isPending ? (
              <SlickSpinner color="white" size={16} />
            ) : (
              <>Submit</>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};
