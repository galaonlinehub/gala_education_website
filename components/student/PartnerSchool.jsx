import Modal from "antd/es/modal/Modal";
import { useTranslations } from "next-intl";
import { LuCircleAlert, LuCircleCheckBig } from "react-icons/lu";

import { useUser } from "@/hooks/data/useUser";
import { usePartnerSchool } from "@/hooks/ui/usePartnerSchool";

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
    resetMutation,
    resetForm,
    clearErrors,
  } = usePartnerSchool();

  const stproft = useTranslations('student_profile');

  return (
    <Modal open={isOpen} footer={null} closable={false}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <div className="text-base">{stproft('belong_to_school')}</div>
          <div className="flex gap-3 text-sm">
            <button
              onClick={toggleAffiliate}
              disabled={isAffiliated}
              className="bg-[#001840] text-white rounded w-16 h-7 cursor-pointer hover:scale-110 disabled:scale-100 transition-transform ease-in-out duration-200 disabled:bg-[#001840]/60 disabled:cursor-not-allowed text-xs"
            >
              {stproft('yes')}
            </button>
            <button
              disabled={mutation.isPending}
              onClick={() => {
                resetForm();
                close();
              }}
              className="border border-[#001840] text-[#001840] rounded w-16 h-7 cursor-pointer hover:scale-110 transition-transform ease-in-out duration-200 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:scale-100 text-xs"
            >
              {stproft('no')}
            </button>
          </div>
        </div>
        <form
          onSubmit={onSchoolPartnered}
          data-isAffiliated={isAffiliated}
          className="data-[isAffiliated=false]:hidden flex flex-col gap-1"
        >
          <div>
            {stproft('please_enter_the_code')}
          </div>
          <div>
            <input
              className="bg-[#001840]/10 w-full rounded-md h-9 outline-none focus:border-2 p-2"
              placeholder="e.g, IL-QWERTY"
              autoComplete="off"
              autoCorrect="off"
              {...register("code", {
                required: stproft('provide_school_code'),
                onChange: () => {
                  resetMutation();
                  clearErrors("_success");
                },
              })}
            />
            {errors.code && (
              <p className="text-red-500 text-xs p-1  flex items-center gap-1 font-medium">
                <LuCircleAlert size={17} strokeWidth={2.5} />
                <span>{errors.code.message}</span>
              </p>
            )}

            {errors._success && (
              <p className="text-green-600 text-sm flex items-center gap-1 p-1">
                <LuCircleCheckBig size={17} />
                <span>
                  {errors._success.message}
                  <strong className="mx-1">{errors._success.schoolName}</strong>
                  .
                </span>
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
              <>{stproft('join')}</>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
};
